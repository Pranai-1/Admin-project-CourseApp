import mongoose, { Model } from "mongoose";
import express, { Router } from "express";
import { Course, Admin } from "../db"; // Assuming these are separate modules
import jwt from 'jsonwebtoken';
import { adminSecretKey } from "../middleware/auth";
import { AuthenticateJWTforAdmin } from "../middleware/auth";
import {z} from "zod"

interface admin extends Document {
  _id?: string;
  email: string;
  password: string;
}



const router:Router=express.Router()

const adminInput=z.object({
  email:z.string().min(10).max(40).email(),
  password:z.string().min(5).max(40)
})
   
   router.get("/me",AuthenticateJWTforAdmin,async(req,res)=>{
    const adminId:string=req.headers["adminId"] as string
     const admin:admin | null= await Admin.findOne({ _id:adminId });
     if (!admin) {
       res.status(403).json({msg: "Admin doesnt exist"})
       return
     }
     res.json({message:"success",
         email: admin.email
     })
   })
   
   router.post("/signup",async (req, res) => {
    const parsedInput=adminInput.safeParse(req.body)
    if(!parsedInput.success){
      return res.status(404).json({message:parsedInput.error.message})
    }
       const email=parsedInput.data.email
       const password=parsedInput.data.password
       const admin:admin | null=await Admin.findOne({ email })
       if(admin){
         res.status(403).json({ message: 'Admin already exists' });
       }else{
       
        const newAdmin = new Admin({ email, password });
         newAdmin.save();
         let adminToken=jwt.sign({id:newAdmin._id},adminSecretKey,{expiresIn:'1h'})
         return  res.status(201).json({message:"success",token:adminToken})
       }
        })
   
 router.post("/login",async(req,res)=>{
  const parsedInput=adminInput.safeParse(req.body)
  if(!parsedInput.success){
    return res.status(404).json({message:parsedInput.error.message})
  }
     const email=parsedInput.data.email
     const password=parsedInput.data.password
       
       const admin:admin | null=await Admin.findOne({ email,password })
       if(admin){
         let adminToken=jwt.sign({id:admin._id},adminSecretKey,{expiresIn:'1h'})
         res.status(200).json({message:"success",token:adminToken})
       }else{
         res.status(404).json({message:"failed"})
     }
        })
   
   
       
   export default router