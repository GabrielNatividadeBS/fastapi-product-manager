import { Product, ProductFormData } from "@/types/product";

const API_BASE_URL = "http://localhost:8000";

export const productApi = {
  async getAll(category_group?: string): Promise<Product[]> {
    let url = `${API_BASE_URL}/produto/listar-produtos`;
    if (category_group && category_group !== "all") {
      url += `?category_group=${encodeURIComponent(category_group)}`;
    }
    const response = await fetch(url);
    if (!response.ok) throw new Error("Erro ao buscar produtos");
    return response.json();
  },

  async getById(id: number): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/produto/${id}`);
    if (!response.ok) throw new Error("Produto não encontrado");
    return response.json();
  },

  async create(data: ProductFormData): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/produto/criar-produto`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Erro ao criar produto");
    return response.json();
  },

  async update(id: number, data: ProductFormData): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/produto/atualizar-produto/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Erro ao atualizar produto");
    return response.json();
  },

  async delete(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/produto/remover-produto/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Erro ao deletar produto");
  },
};