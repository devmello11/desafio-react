// [MIGRADO] O serviço foi movido para /src/modules/services/clientService.ts
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
