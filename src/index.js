const express=require("express")
const fs=require("fs")
const app=express()
const cors=require("cors")
const jwt=require('jsonwebtoken')
app.use(cors())
app.use(express.json())
const mongoose=require('mongoose')
const port=3000




mongoose.connect('mongodb://127.0.0.1:27017/courses', { useNewUrlParser: true, useUnifiedTopology: true, dbName: "courses" });
const adminSchema=new mongoose.Schema({
  email: String,
  password: String
})

const courseSchema=new mongoose.Schema({
  title: String,
    description: String,
    price: Number,
    image: String,
    published: Boolean
})

const Admin=new mongoose.model('Admin',adminSchema)
const Course=new mongoose.model('Course',courseSchema)
const adminSecretKey="admin"

let generateJWTForAdmin=(admindetails)=>{
 let adminToken=jwt.sign(admindetails,adminSecretKey,{expiresIn:'1h'})
 return adminToken
}

let AuthenticateJWTforAdmin=(req,res,next)=>{
  let authHeader=req.headers.authorization
 
  if(authHeader){
    const token=authHeader.split(' ')[1]
  jwt.verify(token,adminSecretKey,(err,admin)=>{
    if(err){
      return res.status(403).json({message:"Invalid"})
    }else{
      req.admin=admin
      next()
    }
  })
}else{
  return res.status(401).json({message:"Invalid"})
}
}

app.get("/admin/me",AuthenticateJWTforAdmin,async(req,res)=>{
  const admin = await Admin.findOne({ email: req.admin.email });
  if (!admin) {
    res.status(403).json({msg: "Admin doesnt exist"})
    return
  }
  res.json({message:"success",
      email: admin.email
  })
})

app.post("/admin/signup",async (req, res) => {
    const{email,password}=req.body
    if(email.length<5 || password.length<5){
      return res.status(404).json({message:"Invalid"})
    }
    const admin=await Admin.findOne({ email })
    if(admin){
      res.status(403).json({ message: 'Admin already exists' });
    }else{
      const obj = { email: email, password: password };
      const newAdmin = new Admin(obj);
      newAdmin.save();
      let adminToken=generateJWTForAdmin(obj)
      return  res.status(201).json({message:"success",token:adminToken})
    }
     })

   app.post("/admin/login",async(req,res)=>{
    const{email,password}=req.body
    if(email.length<5 || password.length<5){
      return res.status(404).json({message:"Invalid"})
    }
    const admin=await Admin.findOne({ email,password })
    if(admin){
      const obj = { email: admin.email, password: admin.password };
      let adminToken=generateJWTForAdmin(obj)
      res.status(200).json({message:"success",token:adminToken})
    }else{
      res.status(404).json({message:"failed"})
  }
     })

   app.post('/admin/create',AuthenticateJWTforAdmin,(req, res) => {
    const body = req.body;
    if(body.title.length<3 ||body.description.length<6){
      return res.status(404).json({message:"failed"})
    }else{
      const course=new Course(req.body)
      course.save()
      return res.status(200).json({message:"success"})
    }
  })
    

  app.get("/admin/courses",async (req,res)=>{
    const data = await Course.find({});
    if(data){
    
     return res.json({ data:data,message:"success" });
    }
    })


  app.get("/admin/courses/:id",AuthenticateJWTforAdmin,async(req,res)=>{
    const id = req.params.id; 
    const course = await Course.findById(id);
    if(course){
      res.json({ course:course,message:"success" });
    }else {
      res.status(404).json({ message: 'Course not found' });
    }
   
  })
   
    
  app.post("/admin/courses/:id",AuthenticateJWTforAdmin,async(req,res)=>{

    
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (course) {
      return res.status(200).json({message:"success"})
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  });

  app.delete("/admin/courses/delete/:id",AuthenticateJWTforAdmin,(req,res)=>{
    try {
       Course.findByIdAndDelete(req.params.id).then(()=>{return res.status(200).json({ message: "success" })})
      
    } catch (error) {
      return res.status(500).json({ message: "Server error" });
    }
    
  })
    


app.listen(port,()=>{console.log(`server running on port ${port}`)})