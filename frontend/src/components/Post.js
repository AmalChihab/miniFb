import React, { useEffect, useState } from 'react';
import PostService from '../services/PostService';
import Navbar from './layouts/NavBar';
import CreateNewPost from './CreateNewPost';
import PostContent from './PostContent';
import { useNavigate } from "react-router-dom";
import Chat from './Chat';

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

  const handleDeletePost = (postId) => {
    // Call your service's method to delete the post
    PostService.deletePost(postId)
      .then(() => {
        // Handle successful deletion by removing the deleted post from the state
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      })
      .catch((error) => {
        console.error('Error deleting post:', error);
      });
  };


  

  return (
    <div>
      <Navbar />
      <CreateNewPost />
       {user && (
        <div>
      {posts.map((post) => (
        <PostContent key={post.id} post={post}  user={user.userName} width="752" height="185"  onDelete={handleDeletePost} />
      ))}
          </div>
      )}
      <Chat />
    </div>
  );
}

export default Post;
