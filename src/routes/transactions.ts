import {knex} from "../database";
import {FastifyInstance} from "fastify";
import {z} from "zod";
import {randomUUID} from "node:crypto";
import {checkSessionIdExists} from "../middlewares/check-session-id-exists";

//Cookies <--> Formas da gente manter contexto entre requisições


export async function transactionsRoutes(app: FastifyInstance) {
    
    //#region middleware global-> funciona somente nas rotas desse arquivo (porque está dentro do plugin transactions)
    app.addHook('preHandler',async(request,reply)=>{
        console.log(`[${request.method}]`)
    })
    //endregion
    
    
    //#region Rotas da aplicação
    
    //#region -> Pega todas as transações
    app.get('/',
        { preHandler:[checkSessionIdExists] },
        async (request) => {
        
      const { sessionId } = request.cookies;
      const transactions = await knex("transactions")
          .where("session_id", sessionId).select();
      return { transactions };
    });
    //endregion
    
    //#region -> Pega uma transação passando o id como parâmetro 
    app.get(
        '/:id',
        { preHandler:[checkSessionIdExists]}, 
        async (request
        )=>{
    const getTransactionsParamsSchema = z.object({
        id: z.string().uuid(),
    });
    
    // @ts-ignore
    const { id } = getTransactionsParamsSchema.parse(request.params);
        const { sessionId } = request.cookies;
   
            const transaction = await knex('transactions')// @ts-ignore
        .where({
            session_id: sessionId,
            id,
        }).first();
    return { transaction };
    
});

    //endregion
    
    
    //#region -> Pega o resumo das transações -> endpoint (transaction/summary)
    app.get('/summary', { preHandler:[checkSessionIdExists]},async (request) => {
        
        const { sessionId } = request.cookies;
        const summary = await knex('transactions')
            
            .where("session_id", sessionId)
            .sum('amount', { as: 'amount' })
            .first()

        return { summary }
    });
    
    //endregion
    
    
    //#region -> Adiciona uma transação no banco de dados -> endpoint(/transactions)
    app.post('/',async (request, reply)=>{
        const createTransactionBodySchema = z.object({
            title: z.string(),
            amount: z.number(),
            type: z.enum(['credit','debit']),
        });
        
        //#region cookies -> registrando o session id com o cookie
        let sessionId = request.cookies.sessionId;
        if (!sessionId) {
            sessionId = randomUUID();
            reply.setCookie('sessionId', sessionId),{
                path :'/',
                maxAge : 1000 * 60 * 60 * 24 * 7,//7 dias
            }
        }
        //endregion
        
        const { title, amount, type } = createTransactionBodySchema.parse(request.body);
        
        await knex('transactions').insert({
            id : randomUUID(),
            title: title,
            amount: type === 'credit' ? amount: amount * -1,
            session_id:sessionId
        });
        
        return reply.status(201).send('Dado criado');
        
    });
    
    //endregion
    
    //endregion
    
}