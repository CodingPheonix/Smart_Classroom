import React from 'react'
import Learner_nav from '../Components/Learner_nav'

const page = () => {
    return (
        <div className='flex h-full bg-green-200'>
            <div className='h-full w-1/5 border border-black rounded-xl m-2 bg-white'>
                <Learner_nav />
            </div>
            <div className='h-full w-4/5 border border-black rounded-xl m-2 bg-white'>
            <h1 className='font-extrabold text-2xl h-1/6 flex items-center p-4'>Dashboard</h1>
            </div>
        </div>
    )
}

export default page
