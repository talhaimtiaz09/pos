import api from './api';

interface Customer {
    _id: string;
    name: string;
    phone_number: string;
    address: string;
}

export const getCustomers = async (): Promise<Customer[]> => {
    const response = await api.get<Customer[]>('/customers');
    return response.data;
};

export const createCustomer = async (customer: Customer): Promise<Customer> => {
    const response = await api.post<Customer>('/customers', customer);
    return response.data;
};

export const updateCustomer = async (id: string, customer: Customer): Promise<Customer> => {
    const response = await api.put<Customer>(`/customers/${id}`, customer);
    return response.data;
};

export const deleteCustomer = async (id: string): Promise<void> => {
    await api.delete(`/customers/${id}`);
};
