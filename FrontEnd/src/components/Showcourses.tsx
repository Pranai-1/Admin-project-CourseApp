import { useEffect, useState } from "react";

import axios from "axios";


interface Course {
  id: number;
  title: string;
  description: string;
  image: string;
  published: boolean,
  adminId: string,
  name:string,
  price:number
}




function ShowCourses() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
     
        axios.get("http://localhost:3000/admin/courses").then((res) => {
      
        console.log(res.data)
          setCourses(res.data.data)
            
          });
 
   }, []);
 

   
  
       

     

  return (
    <>
     {courses.length==0?(
          <>
          <div className="h-screen w-screen flex  justify-center items-center ">
           <p className="text-2xl text-blue-600 font-bold h-max w-max  ">Courses are not available</p>
           </div>
          </>
        ):(
        
      <div className="h-full w-full bg-slate-100 p-10">
        <p className="text-xl text-blue-600 font-bold p-3 w-screen mt-3 flex justify-center">All Courses</p>
        <div className=" p-3 flex flex-wrap justify-center">
          {courses.map((course) => (
            <div key={course.id}  className="bg-indigo-100 m-10 h-[300px] w-[250px] rounded-lg overflow-hidden shadow-md ">
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