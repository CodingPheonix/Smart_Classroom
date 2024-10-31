import React from 'react'
import Instructor_nav from '../Components/Instructor_nav'

const page = () => {
    return (
        <div className='flex min-h-[calc(100vh-5rem)] bg-green-200'>
            <div className='w-1/5 border border-black rounded-xl m-2 bg-white'>
                <Instructor_nav />
            </div>
            <div className='w-4/5 border border-black rounded-xl m-2 bg-white'>
                <div className='flex justify-between items-center p-7'>
                    <h2 className='font-bold text-3xl'>Notice Board</h2>
                    <button className='px-4 py-2 rounded-full border border-green-500 font-semibold'>Add Notice</button>
                </div>

            </div>
        </div>
    )
}

export default page
