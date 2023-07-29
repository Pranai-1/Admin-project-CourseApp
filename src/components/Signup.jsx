import Navbar from './navbar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
  const navigate = useNavigate();
  
  function handleSubmit() {
    fetch('http://localhost:3000/admin/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'success') {  
          alert("signup successful")
          navigate('/admin/login')
          
        } else {
          alert("signup failed")
        }
        
      });
  }

   
  return (
    <>
      
      <div className='h-screen w-screen bg-indigo-100 p-10'>
        <div className='p-5 grid items-center justify-center'>
          <div className='font-bold p-2 text-blue-600 text-xl'>Admin Registration</div>
          <div className='border-blue-500 border-2 rounded-sm p-3 grid bg-slate-100'>
            <input
              type='email'
              placeholder='Email'
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className='border border-solid border-slate-500 p-1 m-2 rounded hover:border-2 hover:border-orange-500  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
            />
            <input
              type='password'
              placeholder='Password'
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className='border border-solid border-slate-500 p-1 m-2 rounded hover:border-2 hover:border-orange-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
            />
            <button
              onClick={handleSubmit}
              className='bg-indigo-700 text-white font-bold text-sm p-2 rounded hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
            >
              Signup
            </button>
            <p className='text-xs mt-1 p-2'>
              Already a User?{' '}
              <button
                onClick={() => {
                  navigate('/admin/login');
                }}
                className='text-indigo-700 font-bold focus:outline-none'
              >
                Login now
              </button>
            </p>
          </div>
        </div>
        
      </div>
    </>
  );
}

export default Signup;
