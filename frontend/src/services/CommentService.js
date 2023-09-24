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
    return axios.post('/comments', commentData)
      
  },

  updateComment: (commentData) => {
    return axios.put('/comments', commentData)
  },

  deleteComment: (commentId) => {
    return axios.delete(`/comments/${commentId}`)
  },
};

export default CommentService;
