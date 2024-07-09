import api from './api';

interface Transaction {
    _id: string;
    product: string;
    quantity: number;
    totalPrice: number;
}

export const getTransactions = async (): Promise<Transaction[]> => {
    const response = await api.get<Transaction[]>('/transactions');
    return response.data;
};

export const createTransaction = async (transaction: Transaction): Promise<Transaction> => {
    const response = await api.post<Transaction>('/transactions', transaction);
    return response.data;
};
