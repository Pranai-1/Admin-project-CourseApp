const express=require("express")
const fs=require("fs")
const app=express()
const cors=require("cors")
const mongoose=require('mongoose')
const adminRouter=require("./routes/admin")



app.use(cors())
app.use(express.json())
app.use("/admin",adminRouter)

const port=3000




mongoose.connect('mongodb://127.0.0.1:27017/courses', { useNewUrlParser: true, useUnifiedTopology: true, dbName: "courses" });



app.listen(port,()=>{console.log(`server running on port ${port}`)})