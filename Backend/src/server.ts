import express  from "express"
import dotenv from 'dotenv'
import { connectDB } from "./config/mongodb"
import cors from 'cors'
import userRouter from "./router/userRouter"
import cookieParser from 'cookie-parser';
import { createServer } from "http"
import { initSocket } from "./socket"   


dotenv.config()
const app = express()
const httpServer = createServer(app)
connectDB()

const PORT = process.env.PORT

app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({extended:true}))

initSocket(httpServer)

app.use(cors({
    origin: process.env.BASE_URL,
    credentials: true,
    methods:  ['GET', 'POST', 'PUT', 'DELETE']
}))



app.use('/',userRouter)



httpServer.listen(3000,() => {
    console.log(`server runnig on http://localhost:${PORT}`);
})