import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import adminRouter from "./routes/admin";
import courseRouter from "./routes/course"
const app = express();



app.use(cors())
app.use(express.json())
app.use("/admin",adminRouter)
app.use("/admin/courses",courseRouter)
const port:number=3000




mongoose.connect('mongodb://127.0.0.1:27017/courses',{dbName: "courses" });



app.listen(port,()=>{console.log(`server running on port ${port}`)})