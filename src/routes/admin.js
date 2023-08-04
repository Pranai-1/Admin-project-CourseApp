const mongoose=require("mongoose")
const express=require("express")
const{Course,Admin}=require("../db")
const jwt=require('jsonwebtoken')
const {adminSecretKey}=require("../middleware/auth")
const {AuthenticateJWTforAdmin}=require("../middleware/auth")
const router=express.Router()


   
  
   
   router.get("/me",AuthenticateJWTforAdmin,async(req,res)=>{
     const admin = await Admin.findOne({ _id:req.adminId });
     if (!admin) {
       res.status(403).json({msg: "Admin doesnt exist"})
       return
     }
     res.json({message:"success",
         email: admin.email
     })
   })
   
   router.post("/signup",async (req, res) => {
       const{email,password}=req.body
       if(email.length<5 || password.length<5){
         return res.status(404).json({message:"Invalid"})
       }
       const admin=await Admin.findOne({ email })
       if(admin){
         res.status(403).json({ message: 'Admin already exists' });
       }else{
        let obj={email,password}
         const newAdmin = new Admin(obj);
         newAdmin.save();
         let adminToken=jwt.sign({id:newAdmin._id},adminSecretKey,{expiresIn:'1h'})
         return  res.status(201).json({message:"success",token:adminToken})
       }
        })
   
 router.post("/login",async(req,res)=>{
       const{email,password}=req.body
       if(email.length<5 || password.length<5){
         return res.status(404).json({message:"Invalid"})
       }
       const admin=await Admin.findOne({ email,password })
       if(admin){
         let adminToken=jwt.sign({id:admin._id},adminSecretKey,{expiresIn:'1h'})
         res.status(200).json({message:"success",token:adminToken})
       }else{
         res.status(404).json({message:"failed"})
     }
        })
   
    router.post('/create',AuthenticateJWTforAdmin,(req, res) => {
       const body = req.body;
       if(body.title.length<3 ||body.description.length<6){
         return res.status(404).json({message:"failed"})
       }else{
        let obj={...req.body,adminId:req.adminId}
         const course=new Course(obj)
         course.save()
         return res.status(200).json({message:"success"})
       }
     })
       
   
    router.get("/courses",async (req,res)=>{
       const data = await Course.find({});
       if(data){
       
        return res.json({ data:data,message:"success" });
       }
       })

    router.get("/courses/individual",AuthenticateJWTforAdmin,async (req,res)=>{
      const data=await Course.find({adminId:req.adminId})
      if(data){
       
        return res.json({ data:data,message:"success" });
       }
    })
   
   
 router.get("/courses/:id",AuthenticateJWTforAdmin,async(req,res)=>{
       const id = req.params.id; 
       const course = await Course.findById(id);
       if(course){
         res.json({ course:course,message:"success" });
       }else {
         res.status(404).json({ message: 'Course not found' });
       }
      
     })
      
       
router.post("/courses/:id",AuthenticateJWTforAdmin,async(req,res)=>{
   
       
       const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
       if (course) {
         return res.status(200).json({message:"success"})
       } else {
         res.status(404).json({ message: 'Course not found' });
       }
     });
   
router.delete("/courses/delete/:id",AuthenticateJWTforAdmin,(req,res)=>{
       try {
          Course.findByIdAndDelete(req.params.id).then(()=>{return res.status(200).json({ message: "success" })})
         
       } catch (error) {
         return res.status(500).json({ message: "Server error" });
       }
       
     })
       
   
   module.exports=router