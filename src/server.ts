// @ts-ignore
import fastify from "fastify";
import {env} from "./env";
import {transactionsRoutes} from "./routes/transactions";
import cookie from '@fastify/cookie';
import fastifySwaggerUi from "@fastify/swagger-ui";

const app = fastify();



app.register(cookie);





app.register(fastifySwaggerUi,{
    routePrefix: '/docs'
});


app.register(transactionsRoutes,{
    prefix: '/transactions',
});

app.listen({
    
    port: parseInt(env.PORT),
}).then(()=>{
    console.log(`Http server running `)
})
