import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {
  const [usn, setUsn] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Check if username and password match the fixed user credentials
    if (usn === 'admin' && password === 'admin123') {
      // If match, set isAuthenticated to true and navigate to the secured page
      setIsAuthenticated(true);
      navigate('/ttcreate');
    } else {
      // If no match, show an alert
      alert('Incorrect credentials. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="usn" className="block text-sm font-medium text-gray-700">
              Name
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
      </div>
    </div>
  );
};

export default Login;
