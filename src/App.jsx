import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/landing';
import Signup from './components/Signup';
import Login from './components/Login';
import CreateCourses from './components/Createcourses';
import ShowCourses from './components/Showcourses';
import UpdateCourses from './components/UpdateCourses';
import Navbar from './components/navbar';

import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
    const[logged,setLogged]=useState(false)
    useEffect(()=>{
      init()
    },[])

    let init=async()=>{
        let token=localStorage.getItem("token")
        const res=await axios("http://localhost:3000/admin/me",
      {
        method:"GET",
        headers:{
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
        }
        })
      if(res.data.message=='success'){
        setLogged(true)   
      }else{
        setLogged(false)
     }
      }
    
    return (
        <Router>
            <Navbar logged={logged} setLogged={setLogged}/>
            <Routes>
                <Route  path="/admin/" element={<Landing logged={logged} setLogged={setLogged}/>} />
                <Route path="/admin/login" element={<Login  setLogged={setLogged}/>} />
                <Route path="/admin/signup" element={<Signup />} />
                <Route path="/admin/create" element={<CreateCourses />} />
                <Route path="/admin/courses" element={<ShowCourses />} />
                <Route path="/admin/courses/:id" element={<UpdateCourses />} />
                
            </Routes>
        </Router>
    );
}

export default App;