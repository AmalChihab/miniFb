import React, { useEffect, useState } from 'react';
import PostService from '../services/PostService';
import Navbar from './layouts/NavBar';
import CreateNewPost from './CreateNewPost';
import PostContent from './PostContent';
import { useNavigate } from "react-router-dom";

function Post() {
  const [posts, setPosts] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token'); 
  const navigate = useNavigate();

  useEffect(() => {

    if (!token) {
      navigate("/");
      return; 
    }

    // Fetch all posts when the component mounts
    PostService.getAllPosts()
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, [navigate, token]);

  return (
    <div>
      <Navbar />
      <CreateNewPost />
      {user && (
        <div>
          {posts.map((post) => (
            <PostContent key={post.id} post={post} user={user.userName} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Post;
