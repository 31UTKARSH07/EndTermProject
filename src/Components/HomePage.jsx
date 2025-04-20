import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../Context/StoreContext';
import ProductList from './ProductList';
function HomePage() {
  const { fetchAllProducts, error } = useContext(StoreContext);

  useEffect(() => {
    fetchAllProducts();
  }, []);

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
      <div>
        <ProductList></ProductList>
      </div>
    </div>
  );
}

export default HomePage;