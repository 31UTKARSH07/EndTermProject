import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../Context/StoreContext';
import ProductCard from './ProductCard';

function HomePage() {
  const { fetchAllProducts, products, loading, error, categories, fetchProductsByCategory, addToCart } = useContext(StoreContext);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const handleCategorySelect = (category) => {
    setActiveCategory(category);
    if (category === 'all') {
      fetchAllProducts();
    } else {
      fetchProductsByCategory(category);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-xl text-gray-700">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center bg-red-100 p-6 rounded-lg shadow-md max-w-md mx-auto">
          <p className="text-red-600 text-lg mb-4">Error: {error}</p>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md transition duration-200"
            onClick={fetchAllProducts}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Categories</h2>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => handleCategorySelect('all')}
            className={`py-2 px-4 rounded-md transform transition duration-300 hover:-translate-y-1 ${activeCategory === 'all'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
          >
            All Products
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => handleCategorySelect(category)}
              className={`py-2 px-4 rounded-md transform transition duration-300 hover:-translate-y-1 ${activeCategory === category
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Products</h1>
        {products.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <p className="text-gray-500 text-lg">No products found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;