const express=require("express")
const fs=require("fs")
const app=express()
const cors=require("cors")
const jwt=require('jsonwebtoken')
app.use(cors())
app.use(express.json())
const port=3000

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

app.get("/admin/me",AuthenticateJWTforAdmin,(req,res)=>{
  return  res.status(201).json({message:"success",email:req.admin.email})
})

app.post("/admin/signup", (req, res) => {
    const{email,password}=req.body
    if(email.length<5 || password.length<5){
      return res.status(404).json({message:"Invalid"})
    }
    fs.readFile("admindata.txt","utf-8",(err,data)=>{
      if(data){
      data=JSON.parse(data)
      const admin=data.find(data=>data.email==email)
      if(admin){
        return res.status(404).json({message:"Admin already Exists"})
     
      }
    }
        let newAdmin={
          email : email,
          password : password
        }
        let adminToken=generateJWTForAdmin(newAdmin)
        data.push(newAdmin)
      
        fs.writeFile("admindata.txt",JSON.stringify(data),(err)=>{
          if(err){
             return res.status(404).json({message:"Admin already Exists"})
          }else{
           return  res.status(201).json({message:"success",token:adminToken})
          }
          
        })
      })
    })

   app.post("/admin/login",(req,res)=>{
    const{email,password}=req.body
    fs.readFile("admindata.txt","utf-8",(err,data)=>{
        if(data){
            data=JSON.parse(data)
            const admin=data.find(data=>data.email==email && data.password==password)
            if(admin){
              let adminToken=generateJWTForAdmin(admin)
                res.status(200).json({message:"success",token:adminToken})
            }else{
                res.status(404).json({message:"failed"})
            }
        }
    })
   })

   app.post('/admin/create',AuthenticateJWTforAdmin,(req, res) => {
    const body = req.body;
    if(body.title.length<3 ||body.description.length<6){
      return res.status(404).json({message:"failed"})
    }else{
    fs.readFile("coursesdata.txt", "utf-8", (err, data) => {
      if (err) {
        return res.status(404).json({message:"failed"})
      } else {
        if(data){
          data = JSON.parse(data)
        }
        body['id']=parseInt(Date.now())
          data.push(body)
        fs.writeFile("coursesdata.txt", JSON.stringify(data), (err) => {
          if (err) {
            return res.status(404).json({message:"failed"})
          }
          return res.status(200).json({message:"success"})
        });
      
    }
  
    });
  }
  });

  app.get("/admin/courses",(req,res)=>{
    fs.readFile("coursesdata.txt","utf-8",(err,data)=>{
      if(data){
        data=JSON.parse(data)
       
      }
      res.status(200).json(data)
    })
  })

  app.get("/admin/courses/:id",AuthenticateJWTforAdmin,(req,res)=>{
    const id = req.params.id; 

   
    fs.readFile("coursesdata.txt","utf-8",(err,data)=>{
      if(data){
        data=JSON.parse(data)
      }
      const course=data.find((course)=>course.id==id)
      if(course){
       return res.status(200).json({message:"success",course:course})
      }else{
        return res.status(403).json({message:"failed"})
      }
    })
  })

  app.post("/admin/courses/:id",AuthenticateJWTforAdmin,(req,res)=>{
    const id = parseInt(req.params.id); 
    const body=req.body;
    if(body.title.length<3 ||body.description.length<6){
      return res.status(401).json({message:"failed"})
    }
    fs.readFile("coursesdata.txt","utf-8",(err,data)=>{
      if(data){
        data=JSON.parse(data)
      }
      const course=data.find((course)=>course.id==id)
      
      if(course){
       Object.assign(course,body)
        fs.writeFile("coursesdata.txt", JSON.stringify(data),(err) => {})
           res.status(200).json({message:"success"})
      }else{
        return res.status(402).json({message:"failed"})
      }
    })
  })

  app.delete("/admin/courses/delete/:id",AuthenticateJWTforAdmin,(req,res)=>{
    const id=parseInt(req.params.id)
    fs.readFile("coursesdata.txt","utf-8",(err,data)=>{
      if(data){
        data=JSON.parse(data)
        let courses=data.filter(data=>data.id!=id)
        fs.writeFile("coursesdata.txt",JSON.stringify(courses),(err)=>{
          if(err){
            return res.status(404).json({message:"failed"})
          }else{
            return res.status(200).json({message:"success"})
          }
        })
      }else{
        return res.status(404).json({message:"failed"})
      }
     
    })
  })


app.listen(port,()=>{console.log(`server running on port ${port}`)})