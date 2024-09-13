import React from 'react'
import Link from 'next/link'
const Learner_nav = () => {
    return (
        <div className='h-full p-2 flex flex-col justify-around'>
            <h1 className='font-bold text-2xl h-1/5 grid place-items-center'>
                Hi "Learner",
            </h1>
            <div className='flex justify-start h-3/5'>
                <ul className='text-lg p-2 '>
                    <Link href="/Learner"><li className='hover:underline hover:cursor-pointer hover:scale-110 hover:translate-x-5 transition-all ease-in-out py-2 px-3 rounded-2xl hover:bg-green-100'>About Me</li></Link>
                    <Link href="Learner_courses"><li className='hover:underline hover:cursor-pointer hover:scale-110 hover:translate-x-5 transition-all ease-in-out py-2 px-3 rounded-2xl hover:bg-green-100'>Courses</li></Link>
                    <Link href="Learner_dashboard"><li className='hover:underline hover:cursor-pointer hover:scale-110 hover:translate-x-5 transition-all ease-in-out py-2 px-3 rounded-2xl hover:bg-green-100'>Dashboard</li></Link>
                </ul>
            </div>
            <div className='h-1/5 grid place-items-center'>
                <button className='w-full text-lg font-bold py-2 px-4 rounded-full bg-green-200 hover:cursor-pointer active:bg-green-300 hover:border-green-600 hover:border transition-all ease-in-out'>Sign out</button>
            </div>
        </div>
    )
}

export default Learner_nav
