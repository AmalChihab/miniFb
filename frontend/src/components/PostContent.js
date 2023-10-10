import React, { useState, useEffect  } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faComment } from '@fortawesome/free-solid-svg-icons';
import ReactionService from '../services/ReactionService';
import PostService from '../services/PostService';
import CommentService from '../services/CommentService'; 
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import defaultProfilePhoto from '../assets/images/default.jpg';
import ProfileService from '../services/ProfileService';

const PostContent = ({ post, user, width, height, onDelete}) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null); 
  const [creatorInfo, setCreatorInfo] = useState(null); 
  const [loadingCreatorInfo, setLoadingCreatorInfo] = useState(true);
  const [postReactions, setPostReactions] = useState([]);
  const [loadingPostReactions, setLoadingPostReactions] = useState(true);


  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleDeletePost = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');

    if (confirmDelete) {
      // Call the onDelete function passed from the Post component to trigger post deletion
      onDelete(post.id);
    }
  };


  


  useEffect(() => {
    ProfileService.getProfilePhoto(JSON.parse(localStorage.getItem('user')).userId)
      .then((imageDataUrl) => {
        
        setProfilePhoto(imageDataUrl);
      })
      .catch((error) => {
        console.error('Error fetching profile photo:', error);
      });
  }, [user]);


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

    CommentService.getCommentsByPostId(post.id)
      .then((response) => {
        const commentsWithProfilePics = response.data.map(async (comment) => {
          // Fetch the profile picture for each commenter
          const commenterProfilePhoto = await ProfileService.getProfilePhoto(comment.user.id)
            .then((imageDataUrl) => imageDataUrl)
            .catch((error) => {
              console.error('Error fetching commenter profile photo:', error);
              return defaultProfilePhoto; // Use default profile picture in case of an error
            });
  
          // Update the comment object to include the profile picture
          return { ...comment, commenterProfilePhoto };
        });
  
        // Set the comments state with profile pictures
        Promise.all(commentsWithProfilePics).then((commentsWithPics) => {
          setComments(commentsWithPics);
          setLoadingComments(false); // Set loading to false once comments are loaded
        });
      })
      .catch((error) => {
        console.log('Error fetching comments:', error);
        setLoadingComments(false); // Set loading to false in case of an error
      });

      PostService.getCreatorOfPost(post.id)
      .then((response) => {
        setCreatorInfo(response.data); // Update the state with the number of likes
        setLoadingCreatorInfo(false); // Set loading to false once creatorInfo is loaded
      })
      .catch((error) => {
        console.log("Error fetching creator of the post:", error);
        setLoadingCreatorInfo(false); // Set loading to false in case of an error
      });

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
    console.log("the user : ",JSON.parse(localStorage.getItem('user')))
    if (commentText) {
      // Prepare the data for the new comment
      const newCommentData = {
        body: commentText,
        user: JSON.parse(localStorage.getItem('user')),
        post: post,
      };
  
      // Call your service's method to create a new comment
      CommentService.createComment(newCommentData)
        .then((response) => {
          // Handle the response, e.g., show a success message or update the UI
          console.log('Comment created successfully:', response.data);
  
          // Update the comments state to include the new comment
          setComments((prevComments) => [...prevComments, response.data]);
  
          // Clear the comment input field
          setCommentText('');
        })
        .catch((error) => {
          // Handle any errors, e.g., show an error message or log the error
          console.error('Error creating comment:', error);
        });
    }
  };

  const handleCommentDelete = (commentId) => {
    // Call your service's method to delete the comment by ID
    CommentService.deleteComment(commentId)
      .then(() => {
        // Update the comments state by removing the deleted comment
        setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
      })
      .catch((error) => {
        console.error('Error deleting comment:', error);
      });
  };

  // Check if creatorInfo contains a valid photoUrl
  const hasProfilePicture = creatorInfo && creatorInfo.profilePicture;

// Construct the data URI for the creator's profile picture or use the default picture
 const profilePictureSrc = hasProfilePicture
  ? `data:image/jpeg;base64,${creatorInfo.profilePicture}` // Assuming creatorInfo.photoUrl contains the URL to the creator's profile picture
  : defaultProfilePhoto; // Assuming defaultProfilePhoto is a URL to the default picture


  return (
<div className={`w-${width} h-${height} bg-white p-4 mb-4 rounded-lg shadow-md mx-auto relative`} style={{ maxWidth: '752px' }}>
      <div className="flex items-center space-x-2 mb-2">
      
      <img
         src={profilePictureSrc}
         alt="Profile"
         className="w-10 h-10 rounded-full"
/>

        
        {!loadingCreatorInfo && (
          <div className="text-blue-500 font-semibold">{creatorInfo.userName}</div>
        )}
          <div className="text-gray-400">posted a post</div>
      </div>
      <p style={{fontFamily:'cursive'}}>{post.body}</p>

      <div style={{maxWidth: '750px', maxHeight: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  {post.photo && (
    <img
      src={`data:image/jpeg;base64,${post.photo}`} // Assuming photo data is stored as a base64-encoded string
      alt="Post"
      style={{width:'800px', maxWidth: '760px', maxHeight: '200px', objectFit: 'contain', borderRadius: '0.5rem' }}
    />
  )}
</div>


      
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
 {/* Display comments if they exist */}
 {loadingComments ? (
        <p>Loading comments...</p>
      ) : (
        <div>
          {comments.map((comment) => (
      <div key={comment.id} className="rounded-lg p-3 mt-2" style={{ backgroundColor: '#F9F9F9', wordWrap: 'break-word', fontFamily: 'cursive' }}>
        <div className="flex items-center space-x-2">
          <img
            src={`data:image/jpeg;base64,${comment.user.profilePicture}`} // Use commenter's profile picture or default picture
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />

          <div className="font-semibold">{comment.user.name}</div>
        </div>
        <div>{comment.body}</div>
        {/* Add a delete button */}
        {comment.user.id === JSON.parse(localStorage.getItem('user')).userId && (
          // Display delete button only if the comment belongs to the current user
          <button
            className="text-red-400 hover:text-red-700 mt-2"
            onClick={() => handleCommentDelete(comment.id)}
            style={{ fontSize: '12px', fontFamily: 'cursive' }}
          >
            Delete Comment
          </button>
        )}
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
      )}
     <div className="absolute top-2 right-2 mx-4 py-2">

     {creatorInfo && JSON.parse(localStorage.getItem("user")).userId === creatorInfo.userId && (
        <button
          onClick={toggleDropdown}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
        >
            <FontAwesomeIcon icon={faEllipsisVertical} />
        </button>
        )}
        {isDropdownOpen && (
          <div className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div className="py-1">
              <button
                onClick={handleDeletePost}
                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 hover:text-red-800"
              >
                Delete Post
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostContent;