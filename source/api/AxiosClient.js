import axios from 'axios';

export default {
  getExample() {
    const axiosInstance = axios.create({
      timeout: 5000,
    });
    return axiosInstance.get('https://example.com');
  },
};
