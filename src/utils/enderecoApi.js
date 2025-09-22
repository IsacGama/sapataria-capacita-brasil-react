const BASE_URL = process.env.REACT_APP_BASE_URL;

export const enderecoApi = {
  // Criar um novo endereço
  async createEndereco(dados, token) {
    try {
      const response = await fetch(`${BASE_URL}/enderecos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dados),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Erro ao criar endereço");

      return data;
    } catch (error) {
      console.error("Erro ao criar endereço:", error);
      throw error;
    }
  },

  // Buscar todos os endereços do cliente
  async getEnderecos(token) {
    try {
      const response = await fetch(`${BASE_URL}/enderecos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Erro ao buscar endereços");

      return data;
    } catch (error) {
      console.error("Erro ao buscar endereços:", error);
      throw error;
    }
  },

  // Buscar endereço por ID
  async getEnderecoById(id, token) {
    try {
      const response = await fetch(`${BASE_URL}/enderecos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Erro ao buscar endereço");

      return data;
    } catch (error) {
      console.error("Erro ao buscar endereço:", error);
      throw error;
    }
  },

  // Atualizar endereço
  async updateEndereco(id, dados, token) {
    try {
      const response = await fetch(`${BASE_URL}/enderecos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dados),
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Erro ao atualizar endereço");

      return data;
    } catch (error) {
      console.error("Erro ao atualizar endereço:", error);
      throw error;
    }
  },

  // Deletar endereço
  async deleteEndereco(id, token) {
    try {
      const response = await fetch(`${BASE_URL}/enderecos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Erro ao deletar endereço");
      }

      return true;
    } catch (error) {
      console.error("Erro ao deletar endereço:", error);
      throw error;
    }
  },
};
