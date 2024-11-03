import React from 'react';
import Link from 'next/link';
import Web_logo from './Web_logo';

const Navbar = () => {
    return (
        <div className='sticky top-0 flex justify-between items-center px-4 py-2 bg-green-400 shadow-md shadow-green-500 z-50'>
            <Web_logo />
            <div className="options">
                <ul className='flex justify-around gap-4 text-white'>
                    <li className='hover:text-green-600 active:text-green-700 hover:underline transition-all ease-in-out duration-200'><Link href="/">Home</Link></li>
                    <li className='hover:text-green-600 active:text-green-700 hover:underline transition-all ease-in-out duration-200'><Link href="/about">About us</Link></li>
                    <li className='hover:text-green-600 active:text-green-700 hover:underline transition-all ease-in-out duration-200'><Link href="/contact">Contact us</Link></li>
                </ul>
            </div>
        </div>
    );
}

export default Navbar;
