// @ts-ignore
import fastify from "fastify";
import {knex} from "./database";

const port = 3333;
const app = fastify();


app.get('/hello',async ()=>{
    return knex("sqlite_schema").select("*");
});

app.listen({
    port: port,
}).then(()=>{
    console.log(`Http server listening on port ${port} `)
})
