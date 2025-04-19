import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cart, setcart] = useState([])

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const response = await axios.get('https://fakestoreapi.com/products/categories');
                setCategories(response.data);
                setError(null);
            } catch (err) {
                setError('Failed to fetch categories: ' + err.message);
                console.error('Error fetching categories:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const fetchProductsByCategory = useCallback(async (category) => {
        try {
            setLoading(true);
            const response = await axios.get(`https://fakestoreapi.com/products/category/${category}`);
            setProducts(response.data);
            setError(null);
            return response.data;
        } catch (err) {
            setError('Failed to fetch products: ' + err.message);
            console.error('Error fetching products by category:', err);
            return [];
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchAllProducts = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get('https://fakestoreapi.com/products');
            console.log(response);
            setProducts(response.data);
            setError(null);
            return response.data;
        } catch (err) {
            setError('Failed to fetch products: ' + err.message);
            console.error('Error fetching all products:', err);
            return [];
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchProductById = useCallback(async (id) => {
        try {
            setLoading(true);
            const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
            setError(null);
            return response.data;
        } catch (err) {
            setError('Failed to fetch product: ' + err.message);
            console.error('Error fetching product by ID:', err);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    const value = {
        categories,
        products,
        loading,
        error,
        fetchProductsByCategory,
        fetchAllProducts,
        fetchProductById
    };

    return (
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>
    );
};