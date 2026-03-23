
import {env} from "./env";
import {app} from "./app";



app.listen({
    
    port: parseInt(env.PORT),
}).then(()=>{
    console.log(`Http server running on localhost://${env.PORT} `)
})
