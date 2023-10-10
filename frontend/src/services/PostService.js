import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/posts'; 
const PostService = {
  getAllPosts: () => {
    return axios.get(`${API_BASE_URL}`);
  },

  createPost: (postCommand) => {
    return axios.post(`${API_BASE_URL}`, postCommand);
  },

  updatePost: (postCommand) => {
    return axios.put(`${API_BASE_URL}`, postCommand);
  },

  deletePost: (postId) => {
    return axios.delete(`${API_BASE_URL}/${postId}`);
  },

  getPostsByUserId : (userId) => {
    return axios.get(`${API_BASE_URL}/posts/user/${userId}`);
  },
  
  getCreatorOfPost : (postId) => {
    return axios.get(`${API_BASE_URL}/${postId}/creator`);
  },

};

export default PostService;
