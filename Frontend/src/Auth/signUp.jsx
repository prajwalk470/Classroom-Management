import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Login from './login';
import Spinner from '../Components/Spinner';
const SignUp = () => {
    const [name, setName] = useState('');
    const [usn, setUsn] = useState('');
    const [branch, setBranch] = useState('');
    const [email, setEmail] = useState('');
    const [year, setYear] = useState('');
    const [semester, setSemester] = useState('');
    const [password, setPassword] = useState('');
    const navigate= useNavigate();
    const [loading, setLoading]= useState(false);
    const handleSignIn= ()=>{
      const data= {
        name,
        usn,
        branch,
        email,
        year,
        semester,
        password
      };
      setLoading(true);
      axios
      .post('http://localhost:5555/register', data)
      .then(()=>{
        setLoading(false);
        navigate('/login');
      })
      .catch((error)=>{
        setLoading(false);
        alert('An error has occured..');
        console.log(error);
      })
    };

  return (
    
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow-lg w-96">
      {loading ? <Spinner/> : ''}
        <h2 className="text-2xl font-semibold mb-4">
           Sign Up 
        </h2>
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
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
            <label htmlFor="branch" className="block text-sm font-medium text-gray-700">
              Branch
            </label>
            <input
              type="text"
              id="branch"
              name="branch"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="year" className="block text-sm font-medium text-gray-700">
              Year
            </label>
            <input
              type="text"
              id="year"
              name="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="semester" className="block text-sm font-medium text-gray-700">
              Semester
            </label>
            <input
              type="text"
              id="semester"
              name="semester"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="text"
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
              className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600" onClick={handleSignIn}
            >
              Sign Up
            </button>
          </div>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account? <Link to="/login" className="text-blue-500 hover:underline focus:outline-none">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;



