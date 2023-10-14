// Navbar.js
import React, {useEffect,useState} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons'; 
import { faFacebook } from '@fortawesome/free-brands-svg-icons'; 
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import defaultProfilePhoto from '../../assets/images/default.jpg';
import { useNavigate } from "react-router-dom";
import ProfileService from '../../services/ProfileService';



function Navbar() {
  const location = useLocation();
  const userId = JSON.parse(localStorage.getItem('user')).userId;
  const userString = localStorage.getItem('user');
  const username = userString ? JSON.parse(userString).userName : null; // Check if username is not null
  const navigate = useNavigate();
  const isPostPage = location.pathname === '/posts';
  const [profilePicture, setProfilePicture] = useState(null);
   // Retrieve the user data and profile picture from local storage
   const userData = JSON.parse(localStorage.getItem('user'));


   useEffect(() => {
    ProfileService.getProfilePhoto(userData.userId)
      .then((imageDataUrl) => {
        setProfilePicture(imageDataUrl);
      })
      .catch((error) => {
        console.error('Error fetching profile photo:', error);
      });
  }, [userData]);

  const iconHomeStyle = {
    color: '#EE2C4D',
    borderBottom: isPostPage ? '2px solid #EE2C4D' : 'none', 
  };


  const iconFacebookStyle = {
    color : '#2A77DE',
  }

  const facebookTextStyle = {
    color: '#EE2C4D', 
    cursor: 'pointer', 
    display: 'flex', 
    alignItems: 'center', 
    gap: '0.5rem',
  };

  const navbarStyle = {
    backgroundColor: '#F9F9F9',
    borderBottom: '1px solid #ccc',
  };

  const customFont = {
    fontFamily: "cursive",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: "large",
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/");
    window.location.reload();
  }; 

  return (
    <nav style={navbarStyle} className="p-4 flex justify-between items-center">
      <div className="flex items-center">
      <Link to="/posts" style={facebookTextStyle}>
          <FontAwesomeIcon
            icon={faFacebook}
            style={{ ...iconFacebookStyle, marginRight: '0.25rem' }} 
            className="h-8 w-8" 
          />
          <span style={facebookTextStyle} className="font-semibold text-lg ">
            Facebook
          </span>
        </Link>
      </div>

      <Link to="/posts" className={`hover:text-gray-300`} style={iconHomeStyle}>
        <FontAwesomeIcon icon={faHome} className="h-6 w-6" />
      </Link>

      <div className="text-black" style={{ display: 'flex', alignItems: 'center' }}>
        {username ? (
          <Link to={`/profile/${username}/${userId}`} className={`font-semibold text-lg ${customFont}`}>
           <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src={profilePicture || defaultProfilePhoto}
                  alt="Profile"
                  className="w-10 h-10 rounded-full mr-2"
                />
              {username}
            </div>
          </Link>
        ) : null}
        <FontAwesomeIcon onClick={handleLogout} icon={faSignOutAlt} className="hover:text-pink-600 ml-6 h-6 w-6" />
      </div>

    </nav>
  );
}

export default Navbar;
