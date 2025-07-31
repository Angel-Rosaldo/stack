import axios from 'axios';

const API_URL = 'http://localhost:3000/api/contacts'; // Ajusta según tu API

const getContacts = async (token) => {
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export default { getContacts };