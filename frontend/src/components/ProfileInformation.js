import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faFilePen, faEnvelope, faPhone, faMars, faVenus, faCalendar, faPlus} from '@fortawesome/free-solid-svg-icons'; // Example icon (replace with the desired FontAwesome icon)
import ProfileService from '../services/ProfileService';

import defaultProfilePhoto from '../assets/images/default.jpg';

const ProfileInformation = (props) => {
  const { user } = props;

  const customFont = {
    fontFamily: "cursive",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: "large",
  }

  const customFont1 = {
    fontFamily: "cursive",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "small",
  }

  const genderIcon = user.userGender === 'Male' ? faMars : faVenus;


  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    ProfileService.getProfilePhoto(user.userId)
      .then((imageDataUrl) => {
        setProfilePicture(imageDataUrl);
      })
      .catch((error) => {
        console.error('Error fetching profile photo:', error);
      });
  }, [user]);

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePicture(file);
      console.log(file);

      // Upload the selected profile picture
      uploadProfilePicture(user.userId, file);
      window.location.reload();
    }
  };

  const uploadProfilePicture = (userId, file) => {
    ProfileService.uploadProfilePicture(userId, file)
      .then((response) => {
        if (response.status === 200) {
          console.log('Profile picture uploaded successfully');
        } else {
          console.error('Failed to upload profile picture');
        }
      })
      .catch((error) => {
        console.error('Error uploading profile picture:', error);
      });
  };

  // Retrieve the user data and profile picture from local storage
  const userData = JSON.parse(localStorage.getItem("user"));
  const profilePictureData = userData.profilePicture;

  // Check if profilePictureData is null or empty
  const hasProfilePicture = profilePictureData && profilePictureData.length > 0;

  // Construct the data URI for the profile picture or use the default picture
  const profilePictureSrc = hasProfilePicture
    ? `data:image/jpeg;base64,${profilePictureData}`
    : defaultProfilePhoto; // Assuming defaultProfilePhoto is a URL to the default picture



  return (
    <div className="bg-white p-4 mb-4 rounded-lg shadow-md mx-auto min-h-[0]">
      <h2 style={customFont} className="text-xl font-semibold mb-4">Personal Information</h2>

      <div className="flex items-center p-4">
        {/* Display the selected profile picture */}
        <img
          src={profilePicture || defaultProfilePhoto}
          alt="Profile"
          className="w-12 h-12 rounded-full mr-2"
        />
        

        {/* Input for choosing a new profile picture */}
        <label htmlFor="profilePictureInput" className="cursor-pointer">
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Change Profile Picture
        </label>
        <input
          type="file"
          id="profilePictureInput"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleProfilePictureChange}
        />
      </div>

      <div className="flex items-center p-4">
        <FontAwesomeIcon icon={faUser} className="mr-2" /> 
        <h1 style={customFont1} className="text-lg">{user.userName}</h1>
      </div>
     
      <div className="flex items-center p-4">
        <FontAwesomeIcon icon={faFilePen} className="mr-2" /> 
        <p style={customFont1} className="text-lg">{user.userDescription}</p>
      </div>

      <div className="flex items-center p-4">
        <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
        <p style={customFont1} className="text-lg">{user.userEmail}</p>
      </div>

      <div className="flex items-center p-4">
        <FontAwesomeIcon icon={faPhone} className="mr-2" />
        <p style={customFont1} className="text-lg">{user.userPhoneNumber}</p>
      </div>

      <div className="flex items-center p-4">
        <FontAwesomeIcon icon={genderIcon} className="mr-2" />
        <p style={customFont1} className="text-lg">{user.userGender}</p>
      </div>

      <div className="flex items-center p-4">
        <FontAwesomeIcon icon={faCalendar} className="mr-2" />
        <p style={customFont1} className="text-lg">{user.userBirthday}</p>
      </div>

    </div>
  );
};

export default ProfileInformation;
