import api from './api';

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
}

export const getProducts = async (): Promise<Product[]> => {
    const response = await api.get<Product[]>('/products');
    return response.data;
};

export const createProduct = async (product: Product): Promise<Product> => {
    const response = await api.post<Product>('/products', product);
    return response.data;
};

export const updateProduct = async (id: string, product: Product): Promise<Product> => {
    const response = await api.put<Product>(`/products/${id}`, product);
    return response.data;
};

export const deleteProduct = async (id: string): Promise<void> => {
    await api.delete(`/products/${id}`);
};
