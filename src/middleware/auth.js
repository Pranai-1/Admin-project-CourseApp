

const jwt=require('jsonwebtoken')

const adminSecretKey="admin"

  
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

  module.exports={
    AuthenticateJWTforAdmin,
    adminSecretKey
  }