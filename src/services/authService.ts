// [MIGRADO] O serviço foi movido para /src/modules/services/authService.ts
    const error = await response.json();
    console.error('Resposta da API com erro:', error); 
    throw new Error(error.message || 'Erro ao registrar usuário');
  }
  console.log('Registro feito com sucesso');
};
