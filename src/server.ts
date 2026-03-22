// @ts-ignore
import fastify from "fastify";
import {knex} from "./database";
import crypto from "node:crypto";
import {env} from "./env";
import {transactionsRoutes} from "./routes/transactions";



const app = fastify();


app.register(transactionsRoutes,{
    prefix: 'transactions',
});

app.listen({
    port: parseInt(env.PORT),
}).then(()=>{
    console.log(`Http server running `)
})
