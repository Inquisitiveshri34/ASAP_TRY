import express from "express"
import dotenv from "dotenv"


dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.get("/ping",(req,res)=>{
    res.send("Root is working")
})

app.listen(PORT,()=>{
    console.log(`Server is running on the port ${PORT}`)
})