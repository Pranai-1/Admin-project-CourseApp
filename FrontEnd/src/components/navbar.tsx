 import { useNavigate } from "react-router-dom";
 import {useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { AdminEmail } from "../store/selectors/AdminEmail";
import { AdminState } from "../store/atoms/admin";
import { IsLoading} from "../store/selectors/isLoading"
 
 function Navbar(){
  const navigate=useNavigate()
  const [showSidebar, setShowSidebar] = useState(false);
 const adminEmail=useRecoilValue(AdminEmail)
 const isLoading=useRecoilValue(IsLoading)
 const adminState=useSetRecoilState(AdminState)
 
 const toggleSidebar = () => {
    setShowSidebar((prevShowSidebar) => !prevShowSidebar);
  }

  return (
    <>
    {isLoading &&(
      <>
      Loading.....
      </>
    )}
 {/* navbar starting..... */}
 <div className="fixed w-screen h-[45px] bg-indigo-400 flex justify-between">
  <div className="flex">
  <div
            className="p-1 mb-1 mr-2 font-bold text-3xl cursor-pointer"
            onClick={toggleSidebar}
          >
            &#8801;
          </div>
          {showSidebar && (
        <div className="fixed top-[45px] left-0 w-[200px] h-screen p-4">
          {/* Sidebar content */}
          <ul className="text-white">
            <li onClick={()=>{
              if(adminEmail){
              navigate('/admin/create')
              }else{
                alert("Login to continue")
              }
            }
            } 
              className="font-medium p-2 cursor-pointer text-blue-700 hover:text-red-600">
                Create Course</li>
                <li onClick={()=>{
              if(adminEmail){
              navigate('/admin/createdByInvidual')
              }else{
                alert("Login to continue")
              }
            }
            } 
              className="font-medium p-2 cursor-pointer text-blue-700 hover:text-red-600">
                Your Courses</li>
            <li onClick={()=>{
              if(adminEmail){
              navigate('/admin/courses')
              }else{
                alert("Login to continue")
              }
            }
            }  className="font-medium p-2 cursor-pointer  text-blue-700 hover:text-red-600">
              All Courses</li>
              
            
            {/* Add more items as needed */}
          </ul>
        </div>
      )}
 <div className="font-bold text-xl p-2 text-red-600">Dev Academy</div>
 </div>
 <ul className="hidden md:flex">
   <li className="md:font-medium md:p-2 md:m-1 cursor-pointer hover:text-indigo-700 ">Home</li>
   <li className="md:font-medium md:p-2 md:m-1 cursor-pointer hover:text-indigo-700">About Us</li>
   <li className="md:font-medium md:p-2 md:m-1 cursor-pointer hover:text-indigo-700">Contact Us</li>
 </ul>
 {adminEmail ?(
<>
<div className=" hidden md:flex font-bold text-white">
  <p className="text-xs mt-3 text-black">{adminEmail}</p>
   <button onClick={()=>{
    localStorage.removeItem("token")
    adminState({
      isLoading:false,
      adminEmail:null
    })
   
    navigate("/")
   }} 
   className="p-1 m-2  h-max w-auto bg-indigo-600 rounded hover:bg-indigo-800 text-white cursor-pointer mr-7">
    Logout</button>
    
 </div> 
</>
 ):(
 <>
  <div className=" hidden md:flex font-bold justify-start text-white w-[170px]">
   <a onClick={()=>navigate('/admin/login')}
   
  className="p-1 m-2  h-max w-auto bg-indigo-600 rounded hover:bg-indigo-800 text-white cursor-pointer">Login</a>
   <a onClick={()=>navigate('/admin/signup')}  className="p-1 m-2 h-max w-auto bg-indigo-600 rounded  hover:bg-indigo-800 text-white cursor-pointer">Signup</a>
 </div> 
 </>
 )}
 
 <div className='font-bold text-2xl mr-2 cursor-pointer md:hidden'>
 <a href="#">&#8801;</a>
 </div>
</div>
{/* navbar ending.... */}
</>
    )
 }
 export default Navbar