const API_URL = 'https://goon-teste-api-production.up.railway.app/api';


interface LoginResponse {
  token: string;
  user: string | { name: string; email: string };
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    let errorMsg = 'Erro ao fazer login';
    try {
      const error = await response.json();
      if (typeof error.message === 'string') errorMsg = error.message;
    } catch {}
    throw new Error(errorMsg);
  }

  return response.json();
};

export const register = async (data: { name: string; email: string; password: string }): Promise<void> => {
  console.log('Dados enviados para API:', data);
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    console.error('Resposta da API com erro:', error); 
    throw new Error(error.message || 'Erro ao registrar usuário');
  }
  console.log('Registro feito com sucesso');
};
