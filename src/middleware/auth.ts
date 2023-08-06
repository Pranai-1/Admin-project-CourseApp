import { NextFunction,Response,Request } from "express"


import jwt from 'jsonwebtoken';

export const adminSecretKey: string = "admin";

  
export const AuthenticateJWTforAdmin=(req:Request,res:Response,next:NextFunction)=>{
  let authHeader: string | undefined = req.headers.authorization;
 
    if(authHeader){
      const token: string = authHeader.split(' ')[1];
    jwt.verify(token,adminSecretKey,(err,admin)=>{
      if(err){
        return res.status(403).json({message:"Invalid"})
      }
      if(!admin){
        return res.status(403).json({message:"Invalid"})
      }
      if(typeof admin=="string"){
        return res.status(403).json({message:"Invalid"})
      }

        req.headers["adminId"]=admin.id
        next()
      
    })
  }else{
    return res.status(401).json({message:"Invalid"})
  }
  }

 