import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    const [categories, setCategories] = useState(() => {
        try {
            const storedCategories = localStorage.getItem("categories");
            return storedCategories ? JSON.parse(storedCategories) : [];
        } catch (error) {
            console.error("Error parsing categories from localStorage:", error);
            return [];
        }
    });

    const [products, setProducts] = useState(() => {
        try {
            const storedProducts = localStorage.getItem("products");
            return storedProducts ? JSON.parse(storedProducts) : [];
        } catch (error) {
            console.error("Error parsing products from localStorage:", error);
            return [];
        }
    });

    const [cart, setCart] = useState(() => {
        try {
            const storedCart = localStorage.getItem("cart");
            return storedCart ? JSON.parse(storedCart) : [];
        } catch (error) {
            console.error("Error parsing cart from localStorage:", error);
            return [];
        }
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearchTerm] = useState('');
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const response = await axios.get('https://fakestoreapi.com/products/categories');
                setCategories(response.data);
                localStorage.setItem("categories", JSON.stringify(response.data));
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
    useEffect(() => {
        fetchAllProducts();
    }, []);
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const fetchProductsByCategory = useCallback(async (category) => {
        try {
            setLoading(true);
            const response = await axios.get(`https://fakestoreapi.com/products/category/${category}`);
            localStorage.setItem(`products_${category}`, JSON.stringify(response.data));
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
            setProducts(response.data);
            localStorage.setItem("products", JSON.stringify(response.data));
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

    const getProductsByCategory = useCallback(async (category) => {
        if (category === 'all') {
            return await fetchAllProducts();
        } else {
            return await fetchProductsByCategory(category);
        }
    }, [fetchAllProducts, fetchProductsByCategory]);

    const getQuantity = useCallback((product) => {
        const cartItem = cart.find(item => String(item.id) === String(product.id));
        return cartItem ? Number(cartItem.quantity) : 0;
    }, [cart]);

    const doesContains = useCallback((product) => {
        return getQuantity(product) > 0;
    }, [getQuantity]);

    const removeProductFromCart = useCallback((product) => {
        setCart(prevCart => prevCart.filter(item => String(item.id) !== String(product.id)));
    }, []);

    const addToCart = useCallback((product) => {
        const quantity = getQuantity(product);
        const newQuantity = quantity === 0 ? 1 : quantity + 1;

        setCart(prevCart => {
            const filtered = prevCart.filter(item => String(item.id) !== String(product.id));
            return [{ id: String(product.id), quantity: newQuantity }, ...filtered];
        });
    }, [getQuantity]);

    const removeFromCart = useCallback((product) => {
        const quantity = getQuantity(product);

        if (quantity <= 1) {
            removeProductFromCart(product);
            return;
        }

        setCart(prevCart => {
            const filtered = prevCart.filter(item => String(item.id) !== String(product.id));
            return [{ id: String(product.id), quantity: quantity - 1 }, ...filtered];
        });
    }, [getQuantity, removeProductFromCart]);
    const value = useMemo(() => ({
        categories,
        products,
        loading,
        error,
        cart,
        fetchProductsByCategory,
        fetchAllProducts,
        fetchProductById,
        getProductsByCategory,
        addToCart,
        setSearchTerm,
        search,
        removeFromCart,
        removeProductFromCart,
        doesContains,
        getQuantity
    }), [
        categories, products, loading, error, cart, search,
        fetchProductsByCategory, fetchAllProducts, fetchProductById,
        getProductsByCategory, addToCart, removeFromCart,
        removeProductFromCart, doesContains, getQuantity
    ]);

    return (
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>
    );
};