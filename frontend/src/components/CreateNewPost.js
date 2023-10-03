import React, { useState } from 'react';
import PostService from '../services/PostService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { faImage } from '@fortawesome/free-solid-svg-icons';

function CreateNewPost() {
  const [postText, setPostText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // State to hold the image preview URL

  const handlePostTextChange = (e) => {
    setPostText(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);

    // Display the selected image as a preview
    const reader = new FileReader();
    reader.onload = (event) => {
      setImagePreview(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handlePostClick = () => {
    if (postText || selectedImage) {
      
      // Prepare the data for the new post
      let formData = {
        body: postText,
        user: JSON.parse(localStorage.getItem('user')),    
      };

      if (selectedImage) {
        const reader = new FileReader();
        reader.onload = (event) => {
                
        // Convert the image data to a byte array and append it to FormData
        const byteData = new Uint8Array(event.target.result);

        formData = {
          body: postText,
          user: JSON.parse(localStorage.getItem('user')),
          photo: Array.from(byteData), // Convert Uint8Array to an array of numbers
        };

        PostService.createPost(formData)
          .then((response) => {
            console.log('Post created successfully:', response);
          })
          .catch((error) => {
            console.error('Error creating post:', error);
          });
        };

        reader.readAsArrayBuffer(selectedImage);
      } else {
        PostService.createPost(formData)
          .then((response) => {
            console.log('Post created successfully:', response);
          })
          .catch((error) => {
            console.error('Error creating post:', error);
          });
      }
  
      setPostText('');
      setSelectedImage(null);
      setImagePreview(null); // Clear the image preview
      window.location.reload();
    }
  };
  
  
  const buttonStyle = {
    backgroundColor: '#EE2C4D',
    transition: 'background-color 0.3s ease',
  };

  const iconColor = {
    color: '#EE2C4D',
  }

  return (
    <div className="w-752 h-185 bg-white p-4 mb-4 rounded-lg shadow-md mx-auto" style={{ maxWidth: '752px' }}>
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
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: 'none' }}
        id="imageInput"
      />
      {imagePreview && (
        <div className="flex justify-center items-center mt-2">
          <img
            src={imagePreview}
            alt="Selected Image"
            className="rounded-lg object-cover"
            style={{ maxWidth: '700px', maxHeight: '200px', objectFit: 'contain', borderRadius: '0.5rem' }}
          />
        </div>
      )}
      <div className="flex justify-between items-center mt-2">
        <label className="cursor-pointer flex items-center" htmlFor="imageInput">
          <FontAwesomeIcon icon={faImage} className="h-5 w-5 mr-1 icon-color" />
          photo
        </label>
        <button
          className="text-white px-4 py-1 rounded-md hover:bg-ee2c4d hover:text-white font-bold"
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
