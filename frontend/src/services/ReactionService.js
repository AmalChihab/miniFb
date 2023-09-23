import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/reactions'; 
const ReactionService = {
  getAllReactions: () => {
    return axios.get(`${API_BASE_URL}/all`);
  },

  createReaction: (reactionCommand) => {
    return axios.post(`${API_BASE_URL}/create`, reactionCommand);
  },

  deleteReaction: (reactionId) => {
    return axios.delete(`${API_BASE_URL}/${reactionId}`);
  },

  updateReactionType: (reactionId, reactionCommand) => {
    return axios.put(`${API_BASE_URL}/${reactionId}`, reactionCommand);
  },

  getReactionByPostId: (postId) => {
    return axios.get(`${API_BASE_URL}/${postId}`);
  },

  getNbrLikesByPostId: (postId) => {
    return axios.get(`${API_BASE_URL}/nbrLikes/${postId}`);
  },
  
  getNbrDislikesByPostId: (postId) => {
    return axios.get(`${API_BASE_URL}/nbrDislikes/${postId}`);
  },

  getReactionIdByPostIdAndUserId: (postId, userId) => {
    return axios.get(`${API_BASE_URL}/reactionId?postId=${postId}&userId=${userId}`);
  },

};

export default ReactionService;
