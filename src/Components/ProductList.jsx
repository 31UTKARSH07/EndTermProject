import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { StoreContext } from '../Context/StoreContext';

const ProductList = () => {
    const { search, categories, products, getProductsByCategory, addToCart, removeFromCart, doesContains, getQuantity } = useContext(StoreContext);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
    const [sortBy, setSortBy] = useState('default');
    const [baseProducts, setBaseProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const data = await getProductsByCategory(selectedCategory);
                const temp = data.filter((product) => {
                    return product.title.toLowerCase().includes(search.toLowerCase())
                })
                setBaseProducts(temp);
                setFilteredProducts(temp);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [selectedCategory, getProductsByCategory]);

    useEffect(() => {
        if (baseProducts.length === 0) return;

        let result = [...baseProducts];
        result = result.filter(
            (product) => product.price >= priceRange.min && product.price <= priceRange.max
        );

        if (sortBy === 'price-asc') {
            result.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-desc') {
            result.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'rating') {
            result.sort((a, b) => b.rating?.rate - a.rating?.rate);
        }

        setFilteredProducts(result);
    }, [sortBy, priceRange, baseProducts]);

    const maxPrice = Math.max(...products.map((product) => product.price), 0);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const handlePriceChange = (e) => {
        setPriceRange({ ...priceRange, [e.target.name]: parseFloat(e.target.value) });
    };

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    const ProductCard = ({ product }) => {
        const isInCart = doesContains(product);
        const quantity = getQuantity(product);

        const [discount] = useState(() => {
            const hasDiscount = Math.random() > 0.7;
            return hasDiscount ? Math.floor(Math.random() * 30 + 10) : 0;
        });

        const renderRatingStars = () => {
            const rating = Math.round(product.rating?.rate || 0);
            const stars = [];

            for (let i = 0; i < 5; i++) {
                if (i < rating) {
                    stars.push(
                        <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                    );
                } else {
                    stars.push(
                        <svg key={i} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                    );
                }
            }
            return stars;
        };
        return (
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full transform hover:-translate-y-1">
                {discount > 0 && (
                    <div className="absolute top-4 left-4 z-10">
                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                            -{discount}%
                        </span>
                    </div>
                )}
                <div className="h-56 relative overflow-hidden bg-gray-50 flex items-center justify-center">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-contain p-4 transition-transform duration-500 scale-100"
                    />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                    <div className="mb-2">
                        <span className="text-xs text-gray-500 inline-block bg-gray-100 px-2 py-1 rounded-full">
                            {product.category}
                        </span>
                    </div>
                    <h3 className="text-lg font-medium text-gray-800 mb-1 line-clamp-2 h-12">
                        {product.title}
                    </h3>
                    <div className="flex items-center mb-2">
                        <div className="flex mr-1">
                            {renderRatingStars()}
                        </div>
                        <span className="text-xs text-gray-500">
                            ({product.rating?.count || 0} reviews)
                        </span>
                    </div>
                    <div className="flex items-center mt-auto">
                        <p className="text-lg font-bold text-blue-600">${product.price.toFixed(2)}</p>
                        {discount > 0 && (
                            <p className="text-sm text-gray-400 line-through ml-2">
                                ${(product.price * (1 + discount / 100)).toFixed(2)}
                            </p>
                        )}
                    </div>
                    <div className="flex space-x-2 mt-4">
                        {!isInCart ? (
                            <button
                                onClick={() => addToCart(product)}
                                className="flex-1 py-2 px-3 rounded-lg transition duration-200 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-medium shadow-sm"
                            >
                                Add to Cart
                            </button>
                        ) : (
                            <div className="flex-1 flex items-center justify-between bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                                <button
                                    onClick={() => removeFromCart(product)}
                                    className={`px-3 py-2 text-lg font-bold transition-colors ${quantity <= 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                                    aria-label="Decrease quantity"
                                >
                                    -
                                </button>
                                <span className="text-gray-800 font-medium">{quantity}</span>
                                <button
                                    onClick={() => addToCart(product)}
                                    className="px-3 py-2 text-lg font-bold text-gray-700 hover:bg-gray-100 transition-colors"
                                    aria-label="Increase quantity"
                                >+</button>
                            </div>
                        )}
                       
                    </div>
                </div>
            </div>
        );
    };
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Our Products</h1>
            <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/4 bg-white p-6 rounded-lg shadow-md h-fit">
                    <h2 className="text-xl font-bold mb-6 text-gray-800">Filters</h2>
                    <div className="mb-8">
                        <h3 className="font-medium text-gray-700 mb-3">Categories</h3>
                        <div className="space-y-2">
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="all"
                                    name="category"
                                    checked={selectedCategory === 'all'}
                                    onChange={() => handleCategoryChange('all')}
                                    className="h-4 w-4 text-blue-600"
                                />
                                <label htmlFor="all" className="ml-2 text-gray-700 capitalize">
                                    All Products
                                </label>
                            </div>
                            {categories.map((category) => (
                                <div key={category} className="flex items-center">
                                    <input
                                        type="radio"
                                        id={category}
                                        name="category"
                                        checked={selectedCategory === category}
                                        onChange={() => handleCategoryChange(category)}
                                        className="h-4 w-4 text-blue-600"
                                    />
                                    <label htmlFor={category} className="ml-2 text-gray-700 capitalize">
                                        {category}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mb-8">
                        <h3 className="font-medium text-gray-700 mb-3">Price Range</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Min Price: ${priceRange.min}</label>
                                <input
                                    type="range"
                                    name="min"
                                    min="0"
                                    max={maxPrice}
                                    value={priceRange.min}
                                    onChange={handlePriceChange}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Max Price: ${priceRange.max}</label>
                                <input
                                    type="range"
                                    name="max"
                                    min="0"
                                    max={maxPrice}
                                    value={priceRange.max}
                                    onChange={handlePriceChange}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-medium text-gray-700 mb-3">Sort By</h3>
                        <select
                            value={sortBy}
                            onChange={handleSortChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="default">Default</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                            <option value="rating">Rating</option>
                        </select>
                    </div>
                </div>
                <div className="w-full md:w-3/4">
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    ) : filteredProducts.length === 0 ? (
                        <div className="bg-white p-8 rounded-lg shadow-md text-center">
                            <h3 className="text-lg font-medium text-gray-800 mb-2">No products found</h3>
                            <p className="text-gray-600">Try changing your filters or browsing other categories.</p>
                        </div>
                    ) : (
                        <div>
                            <div className="mb-6 flex justify-between items-center">
                                <h2 className="text-xl font-bold text-gray-800 capitalize">
                                    {selectedCategory === 'all' ? 'All Products' : selectedCategory}
                                </h2>
                                <p className="text-gray-600">{filteredProducts.length} products</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredProducts.map((product) => (
                                    <ProductCard key={`product-${product.id}`} product={product} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default ProductList;