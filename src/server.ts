
import {env} from "./env";
import {app} from "./app";



app.listen({
    
    port: (env.PORT),
}).then(()=>{
    console.log(`Http server running on localhost://${env.PORT} `)
})
