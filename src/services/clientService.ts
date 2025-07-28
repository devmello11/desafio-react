import { getToken } from '../utils/tokenUtils';

const API_URL = 'https://goon-teste-api-production.up.railway.app/api/clients';

const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getToken()}`,
});

export const getClients = async () => {
  const response = await fetch(API_URL, {
    method: 'GET',
    headers: getAuthHeaders(),
  });

  if (!response.ok) throw new Error('Erro ao buscar clientes');
  return response.json();
};

export const createClient = async (data: {
  name: string;
  email: string;
  phone: string;
  company: string;
}) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error('Erro ao criar cliente');
  return response.json();
};

export const updateClient = async (id: string, data: any) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error('Erro ao atualizar cliente');
  return response.json();
};

export const deleteClient = async (id: string) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  if (!response.ok) throw new Error('Erro ao deletar cliente');
  return response.json();
};
