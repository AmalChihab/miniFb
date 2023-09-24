import React, { useState, useEffect  } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faComment } from '@fortawesome/free-solid-svg-icons';
import ReactionService from '../services/ReactionService';

const PostContent = ({ post, user }) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);


  
  useEffect(() => {
    // Fetch the number of likes/dislikes for this post
    ReactionService.getNbrLikesByPostId(post.id)
      .then((response) => {
        setLikes(response.data); // Update the state with the number of likes
      })
      .catch((error) => {
        console.log("Error fetching likes:", error);
      });

    ReactionService.getNbrDislikesByPostId(post.id)
      .then((response) => {
        setDislikes(response.data); // Update the state with the number of dislikes
      })
      .catch((error) => {
        console.log("Error fetching dislikes:", error);
      });

    // Load user reactions from local storage when the component mounts
    const storedReactions = JSON.parse(localStorage.getItem('userReactions')) || {};
    const userPostReactions = storedReactions[post.id] || {};

    // Check if the user has already liked or disliked the post
    if (userPostReactions.like) {
      setLiked(true);
    } else if (userPostReactions.dislike) {
      setDisliked(true);
    }
  }, [post.id]);

  const handleLikeClick = () => {
    if (!liked) {
      // If the user is switching from dislike to like, update the existing reaction
      if (disliked) {
        // First, get the existing reactionId using getReactionIdByPostIdAndUserId
        ReactionService.getReactionIdByPostIdAndUserId(post.id, JSON.parse(localStorage.getItem('user')).userId)
          .then((response) => {
            const reactionId = response.data;
            
            // Make an API request to update the existing reaction
            ReactionService.updateReactionType(reactionId, {
              postId: post.id,
              type: 'LIKE',
              user: JSON.parse(localStorage.getItem('user')),
            })
              .then(() => {
                setLiked(true);
                setDisliked(false);

                // Update user reactions in local storage
                const userReactions = JSON.parse(localStorage.getItem('userReactions')) || {};
                userReactions[post.id] = { like: true, dislike: false };
                localStorage.setItem('userReactions', JSON.stringify(userReactions));
  
                // Update the likes and dislikes count in state
                setLikes(likes + 1);
                if(dislikes > 0){
                  setDislikes(dislikes - 1);
                }
              })
              .catch((error) => {
                console.log("Error updating reaction:", error);
              });
          })
          .catch((error) => {
            console.log("Error getting existing reactionId:", error);
          });
      } else {
        // Create a new like reaction
        // Update the state to reflect that the user has liked the post
        setLiked(true);
        setDisliked(false);
  
        // Update user reactions in local storage
        const userReactions = JSON.parse(localStorage.getItem('userReactions')) || {};
        userReactions[post.id] = { like: true, dislike: false };
        localStorage.setItem('userReactions', JSON.stringify(userReactions));
  
        // Update the likes count in state
        setLikes(likes + 1);
  
        // Make an API request to create a like reaction
        ReactionService.createReaction({
          postId: post.id,
          type: 'LIKE',
          user: JSON.parse(localStorage.getItem('user')),
        })
          .then((response) => {
            console.log("like saved");
            console.log(response);
          })
          .catch((error) => {
            console.log("error");
          });
      }
    }
  };
  

  const handleDislikeClick = () => {
    if (!disliked) {
      // If the user is switching from like to dislike, update the existing reaction
      if (liked) {
        // First, get the reactionId using getReactionIdByPostIdAndUserId
        ReactionService.getReactionIdByPostIdAndUserId(post.id, JSON.parse(localStorage.getItem('user')).userId)
          .then((response) => {
            const reactionId = response.data;
            // Now, call the updateReactionType function with the reactionId
            ReactionService.updateReactionType(reactionId, {
              postId: post.id,
              type: 'DISLIKE',
              user: JSON.parse(localStorage.getItem('user')),
            })
              .then(() => {
                setDisliked(true);
                setLiked(false);

                // Update user reactions in local storage
                const userReactions = JSON.parse(localStorage.getItem('userReactions')) || {};
                userReactions[post.id] = { like: false, dislike: true };
                localStorage.setItem('userReactions', JSON.stringify(userReactions));
  

                // Update the likes and dislikes count in state
                if(likes > 0){
                  setLikes(likes - 1);
                }
                setDislikes(dislikes + 1);
              })
              .catch((error) => {
                console.log("Error updating reaction:", error);
              });
          })
          .catch((error) => {
            // Create a new dislike reaction
            // Update the state to reflect that the user has disliked the post
            setDisliked(true);
            setLiked(false);
      
            // Update user reactions in local storage
            const userReactions = JSON.parse(localStorage.getItem('userReactions')) || {};
            userReactions[post.id] = { like: false, dislike: true };
            localStorage.setItem('userReactions', JSON.stringify(userReactions));
      
            // Update the dislikes count in state
            setDislikes(dislikes + 1);
      
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
              });
      } else {
        // Create a new dislike reaction
        // Update the state to reflect that the user has disliked the post
        setDisliked(true);
        setLiked(false);
  
        // Update user reactions in local storage
        const userReactions = JSON.parse(localStorage.getItem('userReactions')) || {};
        userReactions[post.id] = { like: false, dislike: true };
        localStorage.setItem('userReactions', JSON.stringify(userReactions));
  
        // Update the dislikes count in state
        setDislikes(dislikes + 1);
  
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
      }
    }
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
          <span>{likes}</span> <FontAwesomeIcon icon={faThumbsUp} /> Like
        </button>
        <button
          className={`text-${disliked ? 'red' : 'gray'}-500 hover:text-red-700`}
          onClick={handleDislikeClick}
        >
          <span>{dislikes}</span> <FontAwesomeIcon icon={faThumbsDown} /> Dislike
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