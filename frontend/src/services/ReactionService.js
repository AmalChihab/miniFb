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

  getReactionByPostId: (postId) => {
    return axios.get(`${API_BASE_URL}/${postId}`);
  },
};

export default ReactionService;
