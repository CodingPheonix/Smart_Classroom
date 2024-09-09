import React from 'react'
import Web_logo from './Web_logo'

const Footer = () => {
    return (
        <div className='flex h-10 justify-around items-center bg-green-400'>
            <div>
                <Web_logo />
            </div>
            <div className='flex'>
                Made by <div className='hover:underline hover:cursor-pointer px-2'>Sayan Biswas</div> || 2024
            </div>
        </div>
    )
}

export default Footer
