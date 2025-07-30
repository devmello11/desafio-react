// services/authService.ts
import axios from 'axios';

const API_URL = 'https://goon-teste-api-production.up.railway.app/api';

import type { RegisterFormData } from '../../types';

export const register = async (data: RegisterFormData) => {
  const { name, email, password } = data;

  const response = await axios.post(`${API_URL}/auth/register`, {
    name,
    email,
    password
  });

  return response.data;
};
