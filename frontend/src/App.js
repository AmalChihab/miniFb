import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Post from './components/Post';
import Profile from './components/Profile';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/posts" element={<Post />} />
          <Route path="/profile/:username/:userid" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
