import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/users';

const ProfileService = {
  uploadProfilePicture: (userId, file) => {
    const formData = new FormData();
    formData.append('file', file);

    return axios.post(`${API_BASE_URL}/${userId}/profile-picture`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  getProfilePhoto: (userId) => {
    return axios
      .get(`${API_BASE_URL}/${userId}/profile-picture`, {
        responseType: 'arraybuffer',
      })
      .then((response) => {
        const base64Image = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        );
        return `data:image/jpeg;base64,${base64Image}`;
      });
  },
  
};

export default ProfileService;
