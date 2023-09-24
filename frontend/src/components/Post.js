import React, { useEffect, useState } from 'react';
import PostService from '../services/PostService';
import Navbar from './layouts/NavBar';
import CreateNewPost from './CreateNewPost';
import PostContent from './PostContent';

function Post() {
  const [posts, setPosts] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    // Fetch all posts when the component mounts
    PostService.getAllPosts()
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <CreateNewPost />
      {posts.map((post) => (
        <PostContent key={post.id} post={post} user={user.userName} />
      ))}
    </div>
  );
}

export default Post;
