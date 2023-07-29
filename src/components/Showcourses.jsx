import { useEffect, useState } from "react";
import Navbar from "./navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function ShowCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
     
        axios.get("http://localhost:3000/admin/courses").then((res) => {
            setCourses(res.data);
          });
   }, []);
 

   const Delete = async (id) => {
    let token = localStorage.getItem('token');
    try {
      const response = await axios.delete(`http://localhost:3000/admin/courses/delete/${id}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
  
      if (response.data.message === "success") {
        const updatedCourses = courses.filter((course) => course.id !== id);
        setCourses(updatedCourses);
      }
    } catch (error) {
      // Handle error if something goes wrong with the request
      console.error("Error deleting course:", error);
    }
  };
  
       

     

  return (
    <>
    
      <div className="h-full w-full bg-slate-100 p-10">
        <p className="text-xl text-blue-600 font-bold p-3 w-screen mt-3 flex justify-center">Created Courses</p>
        <div className=" p-3 flex flex-wrap justify-center">
          {courses.map((course) => (
            <div key={course.id} id='${course.id}' className="bg-indigo-100 m-10 h-[300px] w-[250px] rounded-lg overflow-hidden shadow-md ">
              <img className="h-[150px] w-full object-cover" src={course.image} alt="Course" />
              <div className="p-3 pb-0 h-[100px] m-0">
                <h2 className="font-bold w-full text-xl text-blue-700">{course.title}</h2>
                <p className="font-medium text-xs text-gray-600 w-full h-[35px] overflow-auto m-1">{course.description}</p>
              </div>
              <div className="flex justify-between items-center ml-3 mr-3 h-[40px]">
                <Link
                  to={`/admin/courses/${course.id}`}
                  className="py-2 px-4 bg-blue-700 hover:bg-indigo-500 text-white font-medium rounded"
                >
                  Update
                </Link>
                <button  onClick={()=>{Delete(course.id)}}
                  className="py-2 px-4 bg-red-700 hover:bg-red-500 text-white font-medium rounded ml-2">
                  Delete
                  </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ShowCourses;