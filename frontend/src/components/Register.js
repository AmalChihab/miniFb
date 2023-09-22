import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function Register() {
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async(e) => {
    navigate("/");
  }

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName, userPassword }),
      });

      if (response.ok) {
        // if Successful registration, redirect to Login page
        console.log('Registered successfully!');
        navigate("/");
      } else {
        const data = await response.json();
        setError(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 h-96">
        <h2 className="text-2xl font-semibold mb-12">Create Account</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleRegister}>
          <div className="mb-8">
            <input
              type="text"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-pink-500"
            />
          </div>
          <div className="mb-8">
            <input
              type="password"
              placeholder="Password"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-pink-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 mt-6 mb-6"
          >
            Create Account
          </button>
        </form>
        <p className="text-center text-gray-600">
          Already have an account? <button className='text-pink-600' onClick={handleLogin}>Login</button>
        </p>
      </div>
    </div>
  );
}

export default Register;
