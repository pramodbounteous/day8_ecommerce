import axios from "axios";

export interface Product {
  id: string;
  title: string;
  description: string;
  productImg: string;
  price: number;
}

const API = axios.create({
  baseURL: "https://ecommerce-prisma2.onrender.com"
});

export const fetchProducts = async (): Promise<Product[]> => {
  const res = await API.get("/products");
  return res.data;
};

export const fetchProductById = async (id: string): Promise<Product> => {
  const res = await API.get(`/products/${id}`);
  return res.data;
};