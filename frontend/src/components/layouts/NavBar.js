// Navbar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons'; 
import { faFacebook } from '@fortawesome/free-brands-svg-icons'; 
// }
function Navbar() {
  const location = useLocation();
  const username = "amal";

  const isPostPage = location.pathname === '/posts';

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

      <div className="text-black">
        {username && (
          <span className={`font-semibold text-lg ${customFont}`}>{username}</span>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
