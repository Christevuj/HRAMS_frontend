import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3006/api/v1',
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export default api;