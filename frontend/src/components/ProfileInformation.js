import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faFilePen } from '@fortawesome/free-solid-svg-icons'; // Example icon (replace with the desired FontAwesome icon)

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

  return (
    <div className="bg-white p-4 mb-4 rounded-lg shadow-md mx-auto">
      <h2 style={customFont} className="text-xl font-semibold mb-4">Personal Information</h2>

      <div className="flex items-center p-4">
        <FontAwesomeIcon icon={faUser} className="mr-2" /> 
        <h1 style={customFont1} className="text-lg">{user.userName}</h1>
      </div>
     
      <div className="flex items-center p-4">
        <FontAwesomeIcon icon={faFilePen} className="mr-2" /> 
        <p style={customFont1} className="text-lg">{user.userDescription}</p>
      </div>
    </div>
  );
};

export default ProfileInformation;
