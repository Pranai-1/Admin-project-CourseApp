import { useEffect } from "react";
import { useParams } from "react-router-dom";
import UpdateCard from "./UpdateCard";
import CourseCard from "./CourseCard";
import axios from "axios";
import { CourseState } from "../store/atoms/Course";
import {useRecoilValue, useSetRecoilState } from "recoil";
import { CourseDetails, CourseTitle } from "../store/selectors/coursedata";


function UpdateCourses(){
  const courseState=useSetRecoilState(CourseState)
  const courseDetails=useRecoilValue(CourseDetails)
    const id=useParams().id;

    useEffect(() => {
        let token = localStorage.getItem('token');
       
        axios.get("http://localhost:3000/admin/courses/" + id, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }).then(res => {
          if (res.data.message === "success") {
           
            courseState(prevState => ({
              ...prevState,
              course: {
                ...prevState.course,
                title: res.data.course.title,
                description: res.data.course.description,
                price: res.data.course.price,
                image: res.data.course.image,
                published: res.data.course.published,
              }
            }))
           
           
          } else {
            alert('Login and try again');
          }
        });
      }, []);
      
     
  
    
      console.log(courseDetails)

        return(
            <>
           {courseDetails ?(
               <>
               <BlueTopper/>
               <CourseCard id={id}/>
             <UpdateCard id={id} />
               </>
           ):(
            <>
            <div>Loading....</div>
            </>

           )}
           
            </>
        )
        
   
}

function BlueTopper(){
  const courseTitle=useRecoilValue(CourseTitle)
  return(
  <>
  <div className="h-[300px] w-screen bg-indigo-200 flex justify-center items-center">
  <p className="text-2xl text-blue-800 font-bold mr-[480px]">{courseTitle}</p>
  </div>
  </>
  )
}

export default UpdateCourses