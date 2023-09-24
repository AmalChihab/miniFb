import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/comments';

const CommentService = {
  getAllComments: () => {
    return axios.get(`${API_BASE_URL}`)
  },

  getCommentsByPostId: (postId) => {
    return axios.get(`${API_BASE_URL}/post/${postId}`)
      },

  createComment: (commentData) => {
    return axios.post(`${API_BASE_URL}`, commentData)
      
  },

  updateComment: (commentData) => {
    return axios.put(`${API_BASE_URL}`, commentData)
  },

  deleteComment: (commentId) => {
    return axios.delete(`${API_BASE_URL}/${commentId}`)
  },
};

export default CommentService;
