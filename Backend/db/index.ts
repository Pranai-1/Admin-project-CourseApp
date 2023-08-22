import mongoose, { Document, Model, Schema } from "mongoose";

interface Admin{
  email: String,
  password: String
}

interface Course{
  title: String,
  description: String,
  price: Number,
  image: String,
  published: Boolean,
  adminId: String,
  name:String,
}

const adminSchema:Schema<Admin & Document>=new mongoose.Schema({
    email: String,
    password: String
  })

  const courseSchema:Schema<Course & Document>=new mongoose.Schema({
    title: String,
      description: String,
      price: Number,
      image: String,
      published: Boolean,
      adminId: String,
      name:String,
     
  })
 
  
  export const Admin:Model<Admin & Document>= mongoose.model('Admin',adminSchema)
  export const Course= mongoose.model<Course & Document>('Course',courseSchema)
  