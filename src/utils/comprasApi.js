const BASE_URL = process.env.REACT_APP_BASE_URL;

export const comprasApi = {
  async getCompras(token) {
    const res = await fetch(`${BASE_URL}/compras`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Erro ao buscar compras");
    return data;
  },

  async getCompraById(id, token) {
    const res = await fetch(`${BASE_URL}/compras/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Erro ao buscar compra");
    return data;
  },

  async createCompra(payload, token) {
    const res = await fetch(`${BASE_URL}/compras`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload), // envia { itens, total }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Erro ao criar compra");
    return data;
  },

  async cancelCompra(id, token) {
    const res = await fetch(`${BASE_URL}/compras/${id}/cancel`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Erro ao cancelar compra");
    return data;
  },

  async updateStatusCompra(id, status, token) {
    const res = await fetch(`${BASE_URL}/compras/${id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Erro ao atualizar status");
    return data;
  },
};
