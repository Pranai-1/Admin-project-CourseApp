import express from "express";
import cors from "cors";
import adminRouter from "./routes/admin";
import courseRouter from "./routes/course"
const app = express();

app.use(cors())
app.use(express.json())
app.use("/admin",adminRouter)
app.use("/admin/courses",courseRouter)
const port:number=3000



app.listen(port,()=>{console.log(`server running on port ${port}`)})