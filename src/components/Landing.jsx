import { useEffect,useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { AdminEmail } from "../store/selectors/AdminEmail"
import { IsLoading } from "../store/selectors/isLoading"
import { AdminState } from "../store/atoms/admin"
function Landing(props){
    const navigate=useNavigate()
   const adminEmail=useRecoilValue(AdminEmail)
   const isLoading=useRecoilValue(IsLoading)
   const adminState=useSetRecoilState(AdminState)
    useEffect(()=>{
      async function get(){
       let token=localStorage.getItem('token')
         const res=await axios.get("http://localhost:3000/admin/me",{
           
             headers:{
              "Authorization":`Bearer ${token}`
             }
         })
             if(res.data.message=="success"){
              adminState({
                isLoading:false,
                adminEmail:res.data.email
              })
             }else{
              adminState({
                isLoading:false,
                adminEmail:null
              })
             }
        
     }
     get()
     },[])

   return (
        <>
        {isLoading &&(
          <>
          Loading.....
          </>
        )}
        
         {/* Hero Section starting.... */}
         <div className='h-screen w-screen  bg-indigo-100 p-10'>
        
         {adminEmail ?(
         <>
           <div className="h-full flex items-center justify-center flex-wrap">
            <div className="mr-[100px] ">
        <p className="mt-[50px] w-max font-bold text-2xl mb-3 ">Admin Dashboard</p>
          <button onClick={()=>{
            navigate("/admin/courses")
         }}
          className="h-[30px] w-max pr-2 pl-2 pt-0.5 pb-1 cursor-pointer mt-3 bg-red-500  font-medium text-white  rounded-lg hover:bg-blue-600">
          View courses</button>
          </div>
         <img className="h-[300px] w-max" src="https://static.vecteezy.com/system/resources/previews/000/523/309/original/web-development-and-programming-coding-concept-seo-optimization-modern-web-design-on-laptop-screen-vector.jpg" alt="Image"/>
          </div>
         </>
         ):(
          <>
            <p className="text-2xl text-blue-800 font-bold flex justify-center mt-[30px]">Welcome to Code Academy</p>
            <img className="w-max h-[400px] mt-[40px] ml-[380px]" src="http://techkalture.com/wp-content/uploads/2021/07/corporate-training.jpg" alt="welcome"/>
        
          </>
         )}
         
         </div>
            
        </>
      )
}
export default Landing