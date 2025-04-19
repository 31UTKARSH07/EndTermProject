import React from 'react'
import amazonLogo from '../assets/amz.jpg'
import { Link } from 'react-router-dom'
function Navbar() {
    return (
        <nav className='bg-gray-800 text-white p-5'>
            <div className='container mask-x-to-amber-500 flex justify-between align items-center'>
                <Link className='w-[60px] ' to='/' >
                    <img src={amazonLogo} />
                </Link>
                <div className='flex-1 mx-4'>
                    <div className='relative border-2 border-white rounded-md'>
                        <input type='text' placeholder='Search Items...' className='w-full py-2 px-4 rounded-md
                         text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500'></input>
                         <button className='absolute right-0 top-0 h-full bg-blue-300 hover:bg-amber-500 text-black px-4 rounded-r-md'>Search</button>
                    </div>
                </div>
                <div className='hidden md:flex space-x-5'>
                    <a href="#" className="hover:text-blue-300">Home</a>
                    <a href="#" className="hover:text-blue-300">About</a>
                    <a href="#" className="hover:text-blue-300">Services</a>
                    <a href="#" className="hover:text-blue-300">Cart</a>
                </div>
            </div>
        </nav>
    )
}
export default Navbar