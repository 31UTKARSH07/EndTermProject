import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { StoreContext } from '../Context/StoreContext';

function ProductCard({ product }) {
    const { addToCart } = useContext(StoreContext);
    return (
        <div
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transform transition duration-300 hover:-translate-y-2 group"
        >
            <div className="h-48 relative overflow-hidden bg-gray-200">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-contain p-4"
                />
            </div>
            <div className="p-4">
                <h3 className="text-lg font-medium text-gray-800 mb-2 truncate">{product.title}</h3>
                <p className="text-blue-600 font-bold mb-1">${product.price.toFixed(2)}</p>
                <p className="text-sm text-gray-500 mb-3 inline-block bg-gray-100 px-2 py-1 rounded-full">
                    {product.category}
                </p>

                <div className="flex flex-col space-y-2 mt-3">
                    <button
                        onClick={() => addToCart(product)}
                        className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded-md transition duration-200"
                    >
                        Add to Cart
                    </button>
                    <Link
                        to={`/product/${product.id}`}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-md transition duration-200 text-center"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;