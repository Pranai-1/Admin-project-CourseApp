import { useEffect, useState } from "react";
import Navbar from "./navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function ShowCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
     
        axios.get("http://localhost:3000/admin/courses").then((res) => {
         
            setCourses(res.data.data);
          });
   }, []);
 

   
  
       

     

  return (
    <>
     {courses.length==0?(
          <>
          <div className="h-screen w-screen flex  justify-center items-center ">
           <p className="text-2xl text-blue-600 font-bold h-max w-max  ">You haven't created any Course</p>
           </div>
          </>
        ):(
        
      <div className="h-full w-full bg-slate-100 p-10">
        <p className="text-xl text-blue-600 font-bold p-3 w-screen mt-3 flex justify-center">All Courses</p>
        <div className=" p-3 flex flex-wrap justify-center">
          {courses.map((course) => (
            <div key={course._id}  className="bg-indigo-100 m-10 h-[300px] w-[250px] rounded-lg overflow-hidden shadow-md ">
              <img className="h-[160px] w-full object-cover" src={course.image} alt="Course" />
              <div className="p-3 pb-0 h-[100px] m-0">
                <h2 className="font-bold w-full text-xl text-blue-700">{course.title}</h2>
                <p className="font-medium text-xs text-gray-600 w-full h-[35px] overflow-auto m-1">{course.description}</p>
                <p className="font-medium text-m text-indigo-600 w-full h-[35px] overflow-auto m-1">Created By : {course.name}</p>

              </div>
             
            </div>
          ))}
        </div>
      </div>
)}
    
    </>
  );
}

export default ShowCourses;