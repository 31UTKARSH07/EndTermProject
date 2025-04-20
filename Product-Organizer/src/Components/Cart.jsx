import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { StoreContext } from '../Context/StoreContext';

const Cart = () => {
    const { cart, products, removeFromCart, addToCart, removeProductFromCart } = useContext(StoreContext);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [removing, setRemoving] = useState(null);

    useEffect(() => {
        const getCartWithDetails = () => {
            if (!products.length) return [];

            return cart.map(cartItem => {
                const product = products.find(p => String(p.id) === String(cartItem.id));
                if (!product) return null;
                return {
                    ...product,
                    quantity: cartItem.quantity
                };
            }).filter(Boolean);
        };
        const items = getCartWithDetails();
        setCartItems(items);

        const total = items.reduce((sum, item) => {
            return sum + (item.price * item.quantity);
        }, 0);

        setTotalPrice(total);
    }, [cart, products]);

    const handleRemoveProduct = (item) => {
        setRemoving(item.id);
        setTimeout(() => {
            removeProductFromCart(item);
            setRemoving(null);
        }, 300);
    };

    const calculateShipping = () => {
        return totalPrice > 50 ? 0 : 5.99;
    };

    const calculateTax = () => {
        return totalPrice * 0.07;
    };

    const calculateTotal = () => {
        return totalPrice + calculateShipping() + calculateTax();
    };
    if (cartItems.length === 0) {
        return (
            <div className="max-w-4xl mx-auto mt-8 p-8 bg-white rounded-xl shadow-lg">
                <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-50 rounded-full mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold mb-4 text-gray-800">Your Cart is Empty</h2>
                    <p className="text-gray-500 text-lg mb-8">Looks like you haven't added anything to your cart yet.</p>
                    <Link to="/" className="inline-block bg-blue-600 text-white py-3 px-8 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                        Start Shopping
                    </Link>
                </div>
            </div>
        );
    }
    return (
        <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Your Cart</h2>

            <div className="space-y-6">
                {cartItems.map((item) => (
                    <div
                        key={`cart-item-${item.id}`}
                        className={`flex items-center rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 p-4 ${removing === item.id ? 'opacity-50 scale-95' : 'opacity-100'}`}
                    >
                        <div className="w-24 h-24 bg-gray-50 rounded-lg p-2 flex items-center justify-center">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-contain"
                            />
                        </div>

                        <div className="ml-6 flex-grow">
                            <h3 className="font-medium text-gray-800 text-lg line-clamp-1">{item.title}</h3>
                            <p className="text-sm text-gray-500 capitalize">{item.category}</p>
                            <div className="flex items-center justify-between mt-3">
                                <div className="flex items-center border rounded-lg overflow-hidden shadow-sm">
                                    <button
                                        onClick={() => removeFromCart(item)}
                                        className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors font-medium"
                                        aria-label="Decrease quantity"
                                    >
                                        −
                                    </button>
                                    <span className="px-4 py-2 font-medium border-x">{item.quantity}</span>
                                    <button
                                        onClick={() => addToCart(item)}
                                        className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors font-medium"
                                        aria-label="Increase quantity"
                                    >
                                        +
                                    </button>
                                </div>
                                <button
                                    onClick={() => handleRemoveProduct(item)}
                                    className="text-red-500 hover:text-red-700 flex items-center gap-1 ml-4 font-medium transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    Remove
                                </button>
                            </div>
                        </div>

                        <div className="ml-6 text-right">
                            <p className="font-bold text-gray-800 text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                            <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
                    <h3 className="text-xl font-bold mb-4 text-gray-800">Order Summary</h3>

                    <div className="space-y-3">
                        <div className="flex justify-between text-gray-600">
                            <span>Subtotal</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between text-gray-600">
                            <span>Shipping</span>
                            <span>
                                {calculateShipping() === 0 ? (
                                    <span className="text-green-600 font-medium">Free</span>
                                ) : (
                                    `$${calculateShipping().toFixed(2)}`
                                )}
                            </span>
                        </div>

                        <div className="flex justify-between text-gray-600">
                            <span>Tax (7%)</span>
                            <span>${calculateTax().toFixed(2)}</span>
                        </div>

                        <div className="border-t border-gray-200 pt-3 mt-3">
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>${calculateTotal().toFixed(2)}</span>
                            </div>
                            {totalPrice < 50 && (
                                <p className="text-sm text-green-600 mt-2">Add ${(50 - totalPrice).toFixed(2)} more to get free shipping!</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-6 space-y-3">
                    <button className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 transition-all duration-300 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                        Proceed to Checkout
                    </button>
                    <Link to="/" className="block w-full text-center border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;