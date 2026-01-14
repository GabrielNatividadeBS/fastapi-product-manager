
// Categorias principais do backend (CategoryGroup)
export const PRODUCT_CATEGORIES = [
  "Eletrônicos",
  "Esporte",
  "Saúde",
  "Alimentos"
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];


export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  stock: boolean;
  category: ProductCategory;
}


export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  stock: boolean;
  category: ProductCategory;
}

export interface ProductFilters {
  search: string;
  category: ProductCategory | "all";
  stockStatus: "all" | "in_stock" | "out_of_stock";
}
