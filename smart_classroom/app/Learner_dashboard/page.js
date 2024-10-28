"use client"
import React from 'react'
import Learner_nav from '../Components/Learner_nav'
// import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard_activities from '../Components/Dashboard_activities'

const page = () => {
    return (
        <div className='flex h-full bg-green-200'>
            <div className='h-full w-1/5 border border-black rounded-xl m-2 bg-white'>
                <Learner_nav />
            </div>
            
            <div className='w-4/5 border border-black rounded-xl m-2 bg-white flex flex-col gap-3'>
                <h1 className='font-extrabold text-2xl h-40 flex items-center p-4'>Dashboard</h1>

                <div className='flex w-full justify-around items-center'>
                    <div className='w-44 h-28 bg-gradient-to-b from-white to-green-300 font-bold'>Total quizzes attempted</div>
                    <div className='w-44 h-28 bg-gradient-to-b from-white to-green-300 font-bold'>Total Grade achieved</div>
                    <div className='w-44 h-28 bg-gradient-to-b from-white to-green-300 font-bold'>Total quizzes attempted</div>
                    <div className='w-44 h-28 bg-gradient-to-b from-white to-green-300 font-bold'>Rank</div>
                </div>

                <div className='w-full flex justify-center items-center'>
                    <div className='w-1/2 min-h-[40vh] border border-black rounded-xl m-2 p-2'>
                        <h3 className='w-full text-center font-bold'>ACTIVITIES</h3>
                        <div className='w-full flex justify-around items-center'>
                            <div className='font-semibold'>Sl no.</div>
                            <div className='font-semibold'>Activity</div>
                            <div className='font-semibold'>Score</div>
                        </div>
                        <div className='overflow-y-scroll max-h-[30vh]'>
                            <Dashboard_activities />
                            <Dashboard_activities />
                            <Dashboard_activities />
                            <Dashboard_activities />
                            <Dashboard_activities />
                            <Dashboard_activities />
                            <Dashboard_activities />
                            <Dashboard_activities />
                            <Dashboard_activities />
                        </div>
                    </div>

                    <div className='w-1/2'>
                        {/* Additional content if needed */}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default page
