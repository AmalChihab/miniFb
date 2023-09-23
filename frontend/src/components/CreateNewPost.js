// CreateNewPost.js
import React, { useState } from 'react';
import PostService from '../services/PostService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'; 
import defaultPhoto from '../assets/images/default.jpg'

function CreateNewPost() {
  const [postText, setPostText] = useState('');

  const handlePostTextChange = (e) => {
    setPostText(e.target.value);
  };

  const handlePostClick = () => {
    if (postText) {
      // Read the image file as binary data
      fetch(defaultPhoto)
        .then((response) => response.arrayBuffer())
        .then((imageData) => {
          // Convert the binary data to a Uint8Array
          const byteData = new Uint8Array(imageData);
  
          // Prepare the data for the new post
          const newPostData = {
            body: postText,
            user: JSON.parse(localStorage.getItem('user')),
            photo: Array.from(byteData), // Convert Uint8Array to an array of numbers
          };
  
          // Call your service's method to create a new post
          PostService.createPost(newPostData)
          .then((response) => {
            // Handle the response, e.g., show a success message or update the UI
            console.log('Post created successfully:', response);
          })
          .catch((error) => {
            // Handle any errors, e.g., show an error message or log the error
            console.error('Error creating post:', error);
          });

          // Clear the input field after posting
          setPostText('');
        });
    }
  };
  


  const buttonStyle = {
    backgroundColor : '#EE2C4D',
    transition: 'background-color 0.3s ease',
    
  }

  return (
    <div className="w-752 h-185 bg-white p-4 mb-4 rounded-lg shadow-md mx-auto"
    style={{ maxWidth: '752px' }}>
    <textarea
        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
        placeholder="What's on your mind?"
        rows="3"
        value={postText}
        onChange={handlePostTextChange}
        style={{
          backgroundColor: '#F9F9F9', 
          borderRadius: '10px', 
          borderColor: 'transparent',
        }}
        onFocus={(e) => {
          e.target.style.borderColor = '#EE2C4D';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = 'transparent'; 
        }}
      ></textarea>
      <div className="flex justify-end items-center mt-2">
      <button
          className="text-white px-4 py-1 rounded-md  hover:bg-ee2c4d hover:text-white font-bold"
          onClick={handlePostClick}
          style={buttonStyle} 
        >
        <div className="flex items-center space-between">
            <FontAwesomeIcon icon={faPaperPlane} />
            <span className="ml-2">Post</span>
          </div>
        </button>
      </div>
    </div>
  );
}

export default CreateNewPost;
