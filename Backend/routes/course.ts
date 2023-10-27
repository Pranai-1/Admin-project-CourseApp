import express from "express";
import jwt from 'jsonwebtoken';
import { adminSecretKey } from "../middleware/auth";
import { AuthenticateJWTforAdmin } from "../middleware/auth";
import {z} from "zod"
import { PrismaClient } from "@prisma/client";
const router = express.Router();

const prisma=new PrismaClient()
const courseInput=z.object({
  title:z.string().min(5).max(40),
  description: z.string().min(5).max(40),
  price: z.number().max(10000),
  image: z.string(),
  published: z.boolean()
})

router.post('/create',AuthenticateJWTforAdmin,async (req, res) => {

  const parsedInput=courseInput.safeParse(req.body)

  
  if(!parsedInput.success){
    return res.status(404).json({message:parsedInput.error.message})
  }
     let{title,description,price,image,published}=parsedInput.data
    price=Number(price)
    try{
     const admin=await prisma.admin.findFirst({ where:{id:Number(req.headers["adminId"])}})
    
     if(admin){
       const name=admin.email.split('@')[0]
      const course=await prisma.courses.create({
        data:{        
          title ,       
          description,  
          price ,     
          image ,      
          published,    
          adminId:admin.id,   
          name         
        }
      })
     if(course){
      return res.status(200).json({message:"success"})
     }else {
      res.status(404).json({ message: 'failed' });
    }
  }else{
    res.status(404).json({ message: 'failed' });
  }
}
    catch(error){
 console.log(error)
 res.status(404).json({ message: 'failed' });
  }finally{
    prisma.$disconnect()
  }
     
    
  })
    

 router.get("/",async (req,res)=>{
  try{
    const data = await prisma.courses.findMany({});
    if(data){
     return res.json({ data:data,message:"success" });
    }else {
      res.status(404).json({ message: 'Course not found' });
    }
  }catch(error){
  console.log(error)
  res.status(404).json({ message: 'Course not found' });
  }finally{
    prisma.$disconnect()
  }
    })


 router.get("/individual",AuthenticateJWTforAdmin,async (req,res)=>{
  try{
   const data=await prisma.courses.findMany({
    where:
    {
    adminId:Number(req.headers["adminId"])
  }
  })
   if(data){
    
     return res.json({ courses:data,message:"success" });
    }else {
      res.status(404).json({ message: 'Course not found' });
    }
  }catch(error){
    console.log(error)
    res.status(404).json({ message: 'Course not found' });
    }finally{
      prisma.$disconnect()
    }
 })


router.get("/:id",AuthenticateJWTforAdmin,async(req,res)=>{
    const id = Number(req.params.id); 
    try{
    const course = await prisma.courses.findFirst({
      where:{
            id
      }
     });
    if(course){
      res.json({ course:course,message:"success" });
    }else {
      res.status(404).json({ message: 'Course not found' });
    }
  }catch(error){
    console.log(error)
    res.status(404).json({ message: 'Course not found' });
    }finally{
      prisma.$disconnect()
    }
   
  })
   
    
  router.post("/:id", AuthenticateJWTforAdmin, async (req, res) => {
    const parsedInput = courseInput.safeParse(req.body);
    if (!parsedInput.success) {
      return res.status(400).json({ message: parsedInput.error.message });
    }
    const { title, description, price, image, published } = parsedInput.data;
    const courseId = Number(req.params.id);
  
    try {
      const existingCourse = await prisma.courses.findFirst({
        where: {
          id: courseId,
        },
      });
  
      if (existingCourse) {
        const updatedCourse = await prisma.courses.update({
          where: {
            id: courseId,
          },
          data: {
            title,
            description,
            price,
            image,
            published,
          },
        });
  
        return res.status(200).json({ message: "Course updated successfully" });
      } else {
        // Course not found
        res.status(404).json({ message: 'Course not found' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    } finally {
      await prisma.$disconnect();
    }
  });
  

  router.delete("/delete/:id", AuthenticateJWTforAdmin, async (req, res) => {
    const courseId = Number(req.params.id);
  
    try {
      const existingCourse = await prisma.courses.findFirst({
        where: {
          id: courseId,
        },
      });
  
      if (existingCourse) {
       
        await prisma.courses.delete({
          where: {
            id: courseId,
          },
        });
  
        return res.status(200).json({ message: "Course deleted successfully" });
      } else {
       
        res.status(404).json({ message: 'Course not found' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    } finally {
      await prisma.$disconnect();
    }
  });
  

  export default router
   
   