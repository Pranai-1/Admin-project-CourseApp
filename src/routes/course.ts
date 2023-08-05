import express from "express";
import jwt from 'jsonwebtoken';
import { adminSecretKey } from "../middleware/auth";
import { AuthenticateJWTforAdmin } from "../middleware/auth";
import { Course, Admin } from "../db"; // Assuming these are separate modules

const router = express.Router();

interface course {
  title: string;
  description: string;
  price: number;
  image: string;
  published: boolean;
}

interface admin extends Document {
  _id?: string;
  email: string;
  password: string;
}


router.post('/create',AuthenticateJWTforAdmin,async (req, res) => {
    const body:course = req.body;
    if(body.title.length<3 ||body.description.length<6){
      return res.status(404).json({message:"failed"})
    }else{
   
     const admin:admin | null=await Admin.findOne({ _id:req.headers["adminId"]})
    
     if(admin){
     
       const name=admin.email.split('@')[0]
       let obj={...body,adminId:req.headers["adminId"],name:name}
      const course=new Course(obj)
      course.save()
      return res.status(200).json({message:"success"})
     }else {
      res.status(404).json({ message: 'failed' });
    }
     
    }
  })
    

 router.get("/",async (req,res)=>{
    const data = await Course.find({});
    if(data){
    
     return res.json({ data:data,message:"success" });
    }else {
      res.status(404).json({ message: 'Course not found' });
    }
    })

 router.get("/individual",AuthenticateJWTforAdmin,async (req,res)=>{
   const data=await Course.find({adminId:req.headers["adminId"]})
   if(data){
    
     return res.json({ courses:data,message:"success" });
    }else {
      res.status(404).json({ message: 'Course not found' });
    }
 })


router.get("/:id",AuthenticateJWTforAdmin,async(req,res)=>{
    const id = req.params.id; 
    const course = await Course.findById(id);
    if(course){
      res.json({ course:course,message:"success" });
    }else {
      res.status(404).json({ message: 'Course not found' });
    }
   
  })
   
    
router.post("/:id",AuthenticateJWTforAdmin,async(req,res)=>{

    
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (course) {
      return res.status(200).json({message:"success"})
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  });

router.delete("/delete/:id",AuthenticateJWTforAdmin,(req,res)=>{
    try {
       Course.findByIdAndDelete(req.params.id).then(()=>{return res.status(200).json({ message: "success" })})
      
    } catch (error) {
      return res.status(500).json({ message: "Server error" });
    }
    
  })

  export default router
   
   