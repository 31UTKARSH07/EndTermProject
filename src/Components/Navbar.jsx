import React, { useContext, useState, useEffect } from 'react';
import amazonLogo from '../assets/amz.jpg';
import { Link, useLocation } from 'react-router-dom';
import { StoreContext } from '../Context/StoreContext';

function Navbar() {
    const { setSearchTerm, cart } = useContext(StoreContext);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    const cartCount = cart?.reduce((total, item) => total + item.quantity, 0) || 0;
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };
    const isActive = (path) => {
        return location.pathname === path ? 'text-amber-400 font-medium' : 'text-white hover:text-blue-300';
    };
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`${isScrolled ? 'shadow-lg bg-gray-900' : 'bg-gray-800'} text-white py-3 px-4 md:px-6 sticky top-0 z-50 transition-all duration-300`}>
            <div className='container mx-auto flex items-center justify-between'>
                <Link className='w-[80px] flex items-center' to='/'>
                    <img src={amazonLogo} alt="Amazon" className="w-full h-auto rounded-md" />
                    <span className="ml-2 text-lg font-bold hidden sm:block"></span>
                </Link>

                <div className='flex-1 mx-4'>
                    <form className='relative'>
                        <input
                            onChange={handleSearchChange}
                            type='text'
                            placeholder='Search products...'
                            className='w-full py-2 px-4 rounded-lg bg-gray-700 border border-gray-600 text-white 
                            placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 
                            focus:border-transparent transition-all duration-200'
                        />
                        <button
                            type="submit"
                            className='absolute right-0 top-0 h-full bg-blue-500 hover:bg-blue-600 text-white px-4 
                            rounded-r-lg transition-colors duration-200 flex items-center justify-center'
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <span className="ml-1 hidden sm:inline">Search</span>
                        </button>
                    </form>
                </div>
                <div className='hidden md:flex items-center space-x-6'>
                    <Link to="/" className={`${isActive('/')} transition-colors duration-200 text-lg`}>
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Home
                        </div>
                    </Link>
                    <Link to="/cart" className={`${isActive('/cart')} transition-colors duration-200 text-lg relative`}>
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            Cart
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-amber-500 text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </div>
                    </Link>
                </div>
                <div className="md:hidden">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
                        aria-label="Open navigation menu"
                    >
                        {isMobileMenuOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
                <div className="md:hidden relative ml-2">
                    <Link to="/cart" className="block p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-amber-500 text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
            {isMobileMenuOpen && (
                <div className="md:hidden mt-3 py-3 border-t border-gray-700 animate-fadeIn">
                    <div className="container mx-auto px-4 space-y-3">
                        <Link
                            to="/"
                            className={`${isActive('/')} block py-2 px-3 rounded-md hover:bg-gray-700`}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                Home
                            </div>
                        </Link>
                        <Link
                            to="/cart"
                            className={`${isActive('/cart')} block py-2 px-3 rounded-md hover:bg-gray-700`}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                Cart ({cartCount})
                            </div>
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;