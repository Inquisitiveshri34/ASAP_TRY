import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js"
import cookieParser from "cookie-parser"
import userRouter from "./routes/user.route.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())



app.use("/users",userRouter)

app.get("/ping",(req,res)=>{
    res.send("Root is working")
})

app.listen(PORT,()=>{
    connectDB()
    console.log(`Server is running on the port ${PORT}`)
})