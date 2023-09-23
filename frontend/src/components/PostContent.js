import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faComment } from '@fortawesome/free-solid-svg-icons';
import ReactionService from '../services/ReactionService';

const PostContent = ({ post, user }) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);

  const handleLikeClick = () => {
    setLiked(!liked);
    if (disliked) {
      setDisliked(false);
    }
    
    // Make an API request to create a like reaction
    ReactionService.createReaction({
      postId: post.id, 
      type: 'LIKE', 
      user: JSON.parse(localStorage.getItem('user')),
    })
      .then((response) => {
        console.log("like saved");
      })
      .catch((error) => {
        console.log("error");
      });
  };
  
  const handleDislikeClick = () => {
    setDisliked(!disliked);
    if (liked) {
      setLiked(false);
    }
  
    // Make an API request to create a dislike reaction
    ReactionService.createReaction({
      postId: post.id,
      type: 'DISLIKE', 
      user: JSON.parse(localStorage.getItem('user')),
    })
      .then((response) => {
        console.log("dislike saved");
      })
      .catch((error) => {
        console.log("error");
      });
  };

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (commentText) {
      // Add the comment with the user's name to the comments array
      setComments([...comments, commentText]);
      // Clear the comment input
      setCommentText('');
    }
  };

  return (
    <div className="w-752 h-185 bg-white p-4 mb-4 rounded-lg shadow-md mx-auto" style={{ maxWidth: '752px' }}>
      <div className="flex items-center space-x-2 mb-2">
        <div className="text-blue-500 font-semibold">{user}</div>
        <div className="text-gray-400">posted a post</div>
      </div>
      <p style={{fontFamily:'cursive'}}>{post.body}</p>
      
      <div className="flex justify-evenly items-center space-x-2 mt-4">
        <button
          className={`text-${liked ? 'blue' : 'gray'}-500 hover:text-blue-700`}
          onClick={handleLikeClick}
        >
          <FontAwesomeIcon icon={faThumbsUp} /> Like
        </button>
        <button
          className={`text-${disliked ? 'red' : 'gray'}-500 hover:text-red-700`}
          onClick={handleDislikeClick}
        >
          <FontAwesomeIcon icon={faThumbsDown} /> Dislike
        </button>
        <button className="text-green-500 hover:text-green-700">
          <FontAwesomeIcon icon={faComment} /> Comment
        </button>
      </div>

     
        {comments.map((comment, index) => (
          <div key={index} className="rounded-lg p-3 mt-2" style={{ backgroundColor: '#F9F9F9', width:'264px', height:'56px', fontFamily:'cursive' }}>
            <div className="font-semibold">{user}</div>
            <div>{comment}</div>
          </div>
        ))}
         {/* Comment section */}
      <div className="mt-2">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:border-blue-500"
            placeholder={`Add a comment as ${user}...`}
            value={commentText}
            onChange={handleCommentChange}
          />
          <button
            className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition duration-300 ease-in-out"
            onClick={handleCommentSubmit}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostContent;
