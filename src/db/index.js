const mongoose=require("mongoose")
const adminSchema=new mongoose.Schema({
    email: String,
    password: String
  })
  
  const courseSchema=new mongoose.Schema({
    title: String,
      description: String,
      price: Number,
      image: String,
      published: Boolean,
      adminId: String,
     
  })
  
  const Admin=new mongoose.model('Admin',adminSchema)
  const Course=new mongoose.model('Course',courseSchema)
  
  module.exports={
    Admin,
    Course
  }