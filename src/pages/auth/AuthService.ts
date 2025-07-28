// services/authService.ts
import axios from 'axios';

const API_URL = 'https://goon-teste-api-production.up.railway.app/api';

export const register = async (data: any) => {
  const { name, email, password } = data;

  const response = await axios.post(`${API_URL}/auth/register`, {
    name,
    email,
    password
  });

  return response.data;
};
