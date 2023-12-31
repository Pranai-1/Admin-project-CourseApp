import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Signup from './components/Signup';
import Login from './components/Login';
import CreateCourses from './components/Createcourses';
import ShowCourses from './components/Showcourses';
import UpdateCourses from './components/UpdateCourses';
import Navbar from './components/navbar';

import { AdminState } from './store/atoms/admin';
import Default from './components/Default';
import CreatedByInvidual from './components/createdByInvidual';
import {
  RecoilRoot,
  
  useSetRecoilState,
} from 'recoil';
import { useEffect } from 'react';
import axios from 'axios';


interface admin{
  message:string,
  email:string | null,
}

function App() {
   
 return (
        <Router>
          <RecoilRoot>
            <InitUser/>
            <Navbar />
            <Routes>
            <Route  path="/" element={<Default />} />
                <Route  path="/admin/" element={<Landing />} />
                <Route path="/admin/login" element={<Login />} />
                <Route path="/admin/signup" element={<Signup />} />
                <Route path="/admin/create" element={<CreateCourses />} />
                <Route path="/admin/courses" element={<ShowCourses />} />
                <Route path="/admin/createdByInvidual" element={<CreatedByInvidual />} />
                <Route path="/admin/courses/:id" element={<UpdateCourses />} />
                
            </Routes>
            </RecoilRoot>
        </Router>
    );
}

function InitUser(){
  const adminState=useSetRecoilState(AdminState)

  const init=async()=>{
    let token=localStorage.getItem("token")
    try{
    const res=await axios("http://localhost:3000/admin/me",
  {
    method:"GET",
    headers:{
      "Content-Type":"application/json",
      "Authorization":`Bearer ${token}`
    }
    })
    const data:admin=res.data
  if(data.email){
    adminState({
      isLoading:false,
        adminEmail:data.email
    })   
  }else{
    adminState({
      isLoading:false,
        adminEmail:null
    })   
 }
  }catch(e){
    adminState({
      isLoading:false,
        adminEmail:null
    }) 
  }
}
    useEffect(()=>{
      init()
    },[])
    return null;

}
export default App;