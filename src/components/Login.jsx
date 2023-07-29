import Navbar from './navbar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login(props) {
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function handleSubmit() {
    let token=localStorage.getItem('token')
    fetch('http://localhost:3000/admin/login', {
      method: 'POST',
      headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'success') {
          localStorage.setItem("token",data.token)
          alert("Login successful")
          navigate("/admin/")
         
        } else {
         alert("Login failed")
         
        }
       
      });
  }

  return (
    <>
     

      <div className='h-screen w-screen bg-indigo-100 p-10'>
        <div className='p-5 grid items-center justify-center'>
          <div className='font-bold p-2 h-max w-max text-blue-600'>Admin Login</div>
          <div className='h-max w-max border-solid border-blue-500 rounded-sm border-2 p-3 grid bg-slate-100'>
            <input
              type='email'
              placeholder='email'
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className='border border-solid border-slate-500 p-0.5 pl-1 m-2 rounded hover:border-orange-500 hover:border-2'
            />
            <input
              type='password'
              placeholder='password'
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className='border border-solid border-slate-500 p-0.5 pl-1 m-2 rounded hover:border-orange-500 hover:border-2'
            />
           <button
              onClick={handleSubmit}
              className='bg-indigo-700 text-white font-bold text-sm p-2 rounded hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
            >
              Login
            </button>
            <p className='text-xs mt-1 p-2'>
             New User? {" "}
              <button
                onClick={() => {
                  navigate('/admin/signup');
                }}
                className='text-indigo-700 font-bold focus:outline-none'
              >
                Signup now
              </button>
              </p>
          </div>
        </div>
       
      </div>
    </>
  );
}

export default Login;
