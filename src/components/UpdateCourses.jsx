import { useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./navbar";
import { useNavigate } from "react-router-dom";
import UpdateCard from "./UpdateCard";
import CourseCard from "./CourseCard";
import axios from "axios";
function UpdateCourses(){
   const[course,setCourse]=useState({
    title:"",
    description:"",
    price:"",
    image:"",
    published:""
   }
   )
    const id=useParams().id;
    const navigate=useNavigate()
    useEffect(() => {
        let token = localStorage.getItem('token');
       
        axios.get("http://localhost:3000/admin/courses/" + id, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }).then(res => {
          if (res.data.message === "success") {
            setCourse({
              ...course,
              title: res.data.course.title,
              description: res.data.course.description,
              price: res.data.course.price,
              image: res.data.course.image,
              published: res.data.course.published,
            });
          } else {
            alert('Login and try again');
          }
        });
      }, []);
      
      console.log("parent update")
  
    
  

        return(
            <>
         
           <CourseCard course={course} id={id}/>
             <UpdateCard course={course} id={id} setCourse={setCourse}/>
            </>
        )
        
   
}

export default UpdateCourses