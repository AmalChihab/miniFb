import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function Login() {
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    navigate("/register");
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName, userPassword }),
      });

      if (response.ok) {
        // Successful login, redirect or update user state here
        console.log('Logged in successfully!');
        navigate("/posts");
      } else {
        const data = await response.json();
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 h-96">
        <h2 className="text-2xl font-semibold mb-12">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
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
            Login
          </button>
        </form>
        <p className="text-center text-gray-600">
          Don't have an account? <button className='text-pink-600' onClick={handleSignUp}>Sign up</button>
        </p>
      </div>
    </div>
  );
}

export default Login;
