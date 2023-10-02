import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './layouts/NavBar';
import ProfileInformation from './ProfileInformation';
import PostService from '../services/PostService';
import PostContent from './PostContent';

const Profile = () => {
  // Access the username from the URL parameter
  const { username, userid } = useParams();
  const [postsByUser, setPostsByUser] = useState([]);

  useEffect(() => {
 
    PostService.getPostsByUserId(userid)
     .then((response) => {
        setPostsByUser(response.data);
        console.log("data of posts by user : ",response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, [userid]);

  return (
    <div>
      <Navbar />
      <div className="flex space-x-20 bg-gray-100">
        {/* Left Column (Profile Information) */}
        <div className="w-1/3 p-5 bg-gray-100 rounded-lg">
          <ProfileInformation username={username} userId={userid} />
        </div>

        {/* Right Column (Post Content) */}
        <div className="md:w-2/4 p-2">
            {postsByUser.map((post) => (
              <div key={post.id}>
                <PostContent post={postsByUser} user={username} width="752" height="182" />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
