
import {env} from "./env";
import {app} from "./app";



app.listen({
    
    port: (env.PORT || 3333),
}).then(()=>{
    console.log(`Http server running on localhost://${env.PORT} `)
})
