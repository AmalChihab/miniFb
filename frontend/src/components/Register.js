import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function Register() {
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userBirthday, setUserBirthday] = useState('');
  const [userPhoneNumber, setUserPhoneNumber] = useState('');
  const [userGender, setUserGender] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async(e) => {
    navigate("/");
  }

  // Custom validation function for birthday (the user needs to be at least 10 yo)
  const isBirthdayValid = (birthday) => {
    const today = new Date();
    const birthDate = new Date(birthday);
    const minAgeDate = new Date(today.getFullYear() - 10, today.getMonth(), today.getDate()); // Minimum age of 10 years

    return birthDate <= minAgeDate;
  };

  // Custom validation function for phone number
  const isPhoneNumberValid = (phoneNumber) => {
    const phoneNumberRegex = /^[0-9]{10}$/; 

    return phoneNumberRegex.test(phoneNumber);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!isBirthdayValid(userBirthday)) {
      setError('Please enter a valid birthdate (at least 10 years older).');
      return;
    }

    if (!isPhoneNumberValid(userPhoneNumber)) {
      setError('Please enter a valid phone number.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          userName, 
          userPassword, 
          userEmail, 
          userDescription, 
          userBirthday, 
          userPhoneNumber, 
          userGender 
        }),
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
    <div className="flex mt-4 justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md h-full w-96">
        <h2 className="text-2xl font-semibold mb-12">Create Account</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleRegister}>
          <div className="mb-8">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Username"
                value={userName}
                required
                onChange={(e) => setUserName(e.target.value)}
                className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-pink-500"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Password"
                value={userPassword}
                required
                onChange={(e) => setUserPassword(e.target.value)}
                className="w-full border-b-2 mt-3 border-gray-300 focus:outline-none focus:border-pink-500"
              />
            </div>
          </div>
          <div className="mb-8">
            <input
              type="email"
              placeholder="Email"
              value={userEmail}
              required
              onChange={(e) => setUserEmail(e.target.value)}
              className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-pink-500"
            />
          </div>
          <div className="mb-8">
            <input
              type="text"
              placeholder="Description"
              value={userDescription}
              required
              onChange={(e) => setUserDescription(e.target.value)}
              className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-pink-500"
            />
          </div>
          <div className="mb-8">
            <input
              type="date"
              placeholder="Birthday"
              value={userBirthday}
              required
              onChange={(e) => setUserBirthday(e.target.value)}
              className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-pink-500"
            />
          </div>
          <div className="mb-8">
            <input
              type="tel"
              placeholder="Phone Number"
              value={userPhoneNumber}
              required
              onChange={(e) => setUserPhoneNumber(e.target.value)}
              className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-pink-500"
            />
          </div>
          <div className="mb-8">
            <select
              value={userGender}
              required
              onChange={(e) => setUserGender(e.target.value)}
              className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-pink-500"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
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
