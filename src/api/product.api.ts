// src/api/dummyapi.ts

import { ProductsResponse, Product } from '../types/types';
import { LIMIT } from '../utils/constants';

const BASE_URL = 'https://dummyjson.com/products';

export const getProductsByPage = async (
  skip: number
): Promise<ProductsResponse> => {
  const response = await fetch(`${BASE_URL}?limit=${LIMIT}&skip=${skip || 0}`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return await response.json();
};

export const getProductById = async (id: number): Promise<Product> => {
  const response = await fetch(`${BASE_URL}/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch product details');
  }
  return await response.json();
};
