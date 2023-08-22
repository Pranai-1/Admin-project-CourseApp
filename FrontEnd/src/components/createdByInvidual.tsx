import axios from "axios"
import { useEffect } from "react"
import { Link } from "react-router-dom";
import { useState } from "react";

interface Course {
  _id: string;
  title: string;
  description: string;
  image: string;
  published: boolean,
  adminId: string,
  name:string,
}

interface response{
  message:string,
  courses?:Course[]
}

function CreatedByInvidual(){
    const [individualcourses, setIndividualcourses] = useState<Course[]>([]);
    useEffect(()=>{
        let token = localStorage.getItem('token');
       axios.get("http://localhost:3000/admin/courses/individual",{
        headers: {
            "Authorization": `Bearer ${token}`
          }
       }).then((res)=>{
        const response:response=res.data
        if(response.courses){
        setIndividualcourses(response.courses)
        }
    })
    })


    const Delete = async (id:string) => {
        let token = localStorage.getItem('token');
        try {
          const res = await axios.delete(`http://localhost:3000/admin/courses/delete/${id}`, {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          });
           const response:response=res.data
          if (response.message == "success") {
            const updatedCourses = individualcourses.filter((course) => course._id !== id);
            setIndividualcourses(updatedCourses);
          }
        } catch (error) {
          // Handle error if something goes wrong with the request
          console.error("Error deleting course:", error);
        }
      };
    
return(
    <>
         
        {individualcourses.length==0?(
          <>
          <div className="h-screen w-screen flex  justify-center items-center ">
           <p className="text-2xl text-blue-600 font-bold h-max w-max  ">You haven't created any Course</p>
           </div>
          </>
        ):(
            <>
             <div className="h-screen w-screen bg-slate-100 p-10">
             <p className="text-xl text-blue-600 font-bold p-3 w-screen mt-3 flex justify-center">Created Courses</p>
        <div className=" p-3 flex flex-wrap justify-center">
          {individualcourses.map((course) => (
            <div key={course._id}  className="bg-indigo-100 m-10 h-[300px] w-[250px] rounded-lg overflow-hidden shadow-md ">
              <img className="h-[150px] w-full object-cover" src={course.image} alt="Course" />
              <div className="p-3 pb-0 h-[100px] m-0">
                <h2 className="font-bold w-full text-xl text-blue-700">{course.title}</h2>
                <p className="font-medium text-xs text-gray-600 w-full h-[35px] overflow-auto m-1">{course.description}</p>
              </div>
              <div className="flex justify-between items-center ml-3 mr-3 h-[40px]">
                <Link
                  to={`/admin/courses/${course._id}`}
                  className="py-2 px-4 bg-blue-700 hover:bg-indigo-500 text-white font-medium rounded"
                >
                  Update
                </Link>
                <button  onClick={()=>{Delete(course._id)}}
                  className="py-2 px-4 bg-red-700 hover:bg-red-500 text-white font-medium rounded ml-2">
                  Delete
                  </button>
              </div>
            </div>
          ))}
        </div>
        </div>
            </>
        )}
       
      
    </>
)
}
export default CreatedByInvidual