
import express, { Router } from "express";
import jwt from 'jsonwebtoken';
import { adminSecretKey } from "../middleware/auth";
import { AuthenticateJWTforAdmin } from "../middleware/auth";
import {z} from "zod"
import { PrismaClient } from "@prisma/client";

const router:Router=express.Router()
const prisma=new PrismaClient()

const adminInput=z.object({
  email:z.string().min(10).max(40).email(),
  password:z.string().min(5).max(40)
})
   
   router.get("/me",AuthenticateJWTforAdmin,async(req,res)=>{
    const adminId=Number(req.headers["adminId"])
    try{
     const admin= await prisma.admin.findFirst({ where:{id:adminId} });
     if (!admin) {
       res.status(404).json({msg: "Admin doesnt exist"})
       return
     }else{
     res.json({message:"success",
         email: admin.email
     
     })
    }
  }catch{
    res.status(404).json({msg: "Admin doesnt exist"})
    }finally{
      prisma.$disconnect()
    }
   })
   
   router.post("/signup",async (req, res) => {
    const parsedInput=adminInput.safeParse(req.body)
    if(!parsedInput.success){
      return res.status(404).json({message:parsedInput.error.message})
    }
       const email=parsedInput.data.email
       const password=parsedInput.data.password
       try{
       const present=await prisma.admin.findFirst({
        where:{
          email
        }
       })
       if(present){
        res.status(403).json({ message: 'Admin already exists' });
       }else{
        const admin=await prisma.admin.create({
          data:{
            email,
            password
          }
        })
        if(admin){
          let adminToken=jwt.sign({id:admin.id},adminSecretKey,{expiresIn:'1h'})
          return  res.status(201).json({message:"success",token:adminToken})
        }else{
          res.status(404).json({ message: 'Failed' });
        }
      }
        
       }catch(error){
        console.log(error)
        res.status(404).json({ message: 'Failed' });
       }finally{
        prisma.$disconnect()
       }
        })
   
 router.post("/login",async(req,res)=>{
  const parsedInput=adminInput.safeParse(req.body)
  if(!parsedInput.success){
    return res.status(404).json({message:parsedInput.error.message})
  }
     const email=parsedInput.data.email
     const password=parsedInput.data.password
       try{
       const admin=await prisma.admin.findFirst({where:{email,password} })
       if(admin){
         let adminToken=jwt.sign({id:admin.id},adminSecretKey,{expiresIn:'1h'})
         res.status(200).json({message:"success",token:adminToken,email:email})
       }else{
         res.status(404).json({message:"failed"})
     }
    }catch(error){
      console.log(error)
      res.status(404).json({message:"failed"})
    }finally{
      prisma.$disconnect()
    }
        })
   
   
       
   export default router