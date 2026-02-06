import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
const app=express()
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
// aaj kal we can direcly configure express ke sath json ki json ko allow kardo isme and we can also set the limit ki kitna allow karna hai
app.use(express.json({limit:"16kb"}))
// url ka encode karne ka apna hi tarika hota hai, kuch use + se karte hai and kuch use %20(generally for space) se karte hai
// extended se ham objects ke andar bhi objects de paate hai
app.use(express.urlencoded({extended:true,limit:"16kb"}))
// jo bhi chheze publically avail kar sakte hai , vo isme aa jaegi, ye uski configuration hai. jaise isme ham fevicon rakh sakte hai
app.use(express.static("public"))

// cookie parser ka sirf itna sa kaam hai ki main apne server se kisi ke browser ki cookies access kar pau and uski cokies se crud operation perform kar pau cuz ckuch tarike hote hai jinse secure cookies read and access kar sakte hai and vo kaam sirf server hi kar sakta hai
app.use(cookieParser());

// routes ko hamesh neeche import kiya jata hai
import userRoutes from "./routes/user.routes.js"

// routes declaration
// ab routes ke liye app.get se seedha se use nhi kar sakte. isme hame middleware use karna padega.
// so here, we will be using the middleware "use"
app.use("/api/v1/users",userRoutes)
// ye work aese karega ki jab bhi koi likhega users , to us person ko userRoutes ka accesss mil jaega

export default app;

