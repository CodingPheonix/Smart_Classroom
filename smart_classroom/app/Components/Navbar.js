import React from 'react'
import Link from 'next/link'
import Web_logo from './Web_logo'

const Navbar = () => {
    return (
        <div className='flex justify-between items-center px-4 h-10 bg-green-400'>
            <Web_logo/>
            <div className="options">
                <ul className=' flex justify-around gap-4'>
                    <li><Link href="/">Home</Link ></li>
                    <li><Link href="/about">About us</Link></li>
                    <li><Link href="/contact">Contact us</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar
