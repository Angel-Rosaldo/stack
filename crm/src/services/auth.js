import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth'; // Ajusta según tu API

const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

const verifyToken = async (token) => {
  const response = await axios.get(`${API_URL}/verify`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export default { login, verifyToken };