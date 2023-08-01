import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/landing';
import Signup from './components/Signup';
import Login from './components/Login';
import CreateCourses from './components/Createcourses';
import ShowCourses from './components/Showcourses';
import UpdateCourses from './components/UpdateCourses';
import Navbar from './components/navbar';
import React from 'react';
import { AdminState } from './store/atoms/admin';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
   
 return (
        <Router>
          <RecoilRoot>
            <InitUser/>
            <Navbar />
            <Routes>
                <Route  path="/admin/" element={<Landing />} />
                <Route path="/admin/login" element={<Login />} />
                <Route path="/admin/signup" element={<Signup />} />
                <Route path="/admin/create" element={<CreateCourses />} />
                <Route path="/admin/courses" element={<ShowCourses />} />
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
  if(res.data.email){
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
  

}
export default App;