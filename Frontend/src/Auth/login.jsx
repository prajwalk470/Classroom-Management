import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import SignUp from './signUp';
const Login = () => {
  const [usn, setUsn] = useState('');
  const [password, setPassword] = useState('');
  const navigate= useNavigate();
  const handleLogin = (e)=>{
    e.preventDefault();
    axios.post('http://localhost:5555/login',{usn, password})
    .then(result => {console.log(result)
      if(result.data === "Success"){
        navigate('/login/rooms')
      }
      else{
        alert("Incorrect password . Pls try agian..")
      }
    })
    .catch(err=> console.log(err)); 
  };
  return (
    
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">
          Login
        </h2>
        <form>
          <div className="mb-4">
            <label htmlFor="usn" className="block text-sm font-medium text-gray-700">
              USN
            </label>
            <input
              type="text"
              id="usn"
              name="usn"
              value={usn}
              onChange={(e) => setUsn(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account? <Link to="/register" className="text-blue-500 hover:underline focus:outline-none">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

