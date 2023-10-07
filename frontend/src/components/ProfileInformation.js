import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faFilePen, faEnvelope, faPhone, faMars, faVenus, faCalendar} from '@fortawesome/free-solid-svg-icons'; // Example icon (replace with the desired FontAwesome icon)

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


  return (
    <div className="bg-white p-4 mb-4 rounded-lg shadow-md mx-auto min-h-[0]">
      <h2 style={customFont} className="text-xl font-semibold mb-4">Personal Information</h2>

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
