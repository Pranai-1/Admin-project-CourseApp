import axios from "axios"
import { useState } from "react"

interface create{
  message:string
}
function CreateCourses(){
  
    const[title,setTitle]=useState("")
    const[description,setDescription]=useState("")
    const[price,setPrice]=useState(0)
    const[image,setImage]=useState("")
    const[published,setPublished]=useState(false)
   

   
    
    async function Create() {
        let token = localStorage.getItem('token');
       
        const config = {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        };
        const data = {
          title: title,
          description: description,
          price: price,
          image: image,
          published: published
        };
      
        try {
          const res = await axios.post("http://localhost:3000/admin/courses/create", data, config);
          console.log(res.data)
          const result:create=res.data
          if (result.message === "success") {
            alert("Course Created");
          } else {
            alert("Failed to create course");
          }
        } catch (error) {
          console.error(error);
          alert("An error occurred while creating the course");
        }
      }
      
    return(
        <>
   
    
    <div className="h-screen w-screen bg-indigo-100 p-10  ">
    <div className="flex justify-center items-center">
       <p className=" p-3 font-bold text-xl text-indigo-600 h-max w-max  mt-10">Create Course</p>
       </div>
       <div className="flex justify-center items-center">
      <div className="h-max w-max border-2 border-solid border-blue-500 grid p-3 mt-5 rounded mx-[640px]">
        <input type="text" placeholder="title" onChange={(e)=>{setTitle(e.target.value)}} className="border border-solid border-slate-500 p-2 m-2 rounded hover:border-orange-500 hover:border-2"/>
        <input type="text" placeholder="description" onChange={(e)=>{setDescription(e.target.value)}} className="border border-solid border-slate-500 p-2 m-2 rounded hover:border-orange-500 hover:border-2"/>
        <input type="number" placeholder="price" onChange={(e)=>{setPrice(parseFloat(e.target.value))}} className="border border-solid border-slate-500 p-2 m-2 rounded hover:border-orange-500 hover:border-2"/>
        <input type="text" placeholder="image url" onChange={(e)=>{setImage(e.target.value)}} className="border border-solid border-slate-500 p-2 m-2 rounded hover:border-orange-500 hover:border-2"/>
        <input type="text" placeholder="published" 
         onChange={(e) => {
          const value = e.target.value.toLowerCase(); // Convert input value to lowercase
          const publishedValue = value === "true"; // Check if value is "true" (case-insensitive)
          setPublished(publishedValue); // Update the state with the boolean value
        }}
         className="border border-solid border-slate-500 p-2 m-2 rounded hover:border-orange-500 hover:border-2"/>
        <button onClick={Create} className="h-max w-full bg-indigo-700 text-white font-bold text-xm p-2 rounded m-1 hover:bg-indigo-800">Create</button>
     </div>
     </div>
     </div>
    </>
    )
}
export default CreateCourses