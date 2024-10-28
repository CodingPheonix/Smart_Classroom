"use client"
import React from 'react'
import Learner_nav from '../Components/Learner_nav'
// import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard_activities from '../Components/Dashboard_activities'

const page = () => {
    return (
        <div className='flex min-h-screen bg-green-200'>
            <div className='w-1/5 border border-black rounded-xl m-2 bg-white'>
                <Learner_nav />
            </div>

            <div className='w-4/5 border border-black rounded-xl m-2 bg-white flex flex-col gap-3'>
                <h1 className='font-extrabold text-2xl h-28 flex items-center p-4'>Dashboard</h1>

                <div className='flex w-full justify-around items-center'>
                    <div className='w-44 p-2 h-28 bg-gradient-to-b from-white to-green-300 font-bold text-sm'>Total quizzes attempted</div>
                    <div className='w-44 p-2 h-28 bg-gradient-to-b from-white to-green-300 font-bold text-sm'>Total Grade achieved</div>
                    <div className='w-44 p-2 h-28 bg-gradient-to-b from-white to-green-300 font-bold text-sm'>Total quizzes attempted</div>
                    <div className='w-44 p-2 h-28 bg-gradient-to-b from-white to-green-300 font-bold text-sm'>Overall Rank</div>
                </div>

                <div className='w-full flex justify-center items-start'>
                    <div className='w-1/2 border border-black rounded-xl m-2 p-2'>
                        <h3 className='w-full text-center font-bold'>ACTIVITIES</h3>
                        <div className='w-full flex justify-around items-center'>
                            <div className='font-semibold'>Sl no.</div>
                            <div className='font-semibold'>Activity</div>
                            <div className='font-semibold'>Score</div>
                        </div>
                        <div className='overflow-y-auto max-h-[40vh]'>
                            <Dashboard_activities />
                            <Dashboard_activities />
                            <Dashboard_activities />
                            <Dashboard_activities />
                            <Dashboard_activities />
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

                    <div className='w-1/2 border border-black rounded-xl m-2 p-2'>
                        <h3 className='w-full text-center font-bold'>ANALYSIS</h3>
                        <div className='w-full grid grid-cols-2 gap-4 p-4'>
                            <div>
                                <div className='bg-white rounded-lg text-center text-xs font-semibold'>Total modules completed:</div>
                                <div className='w-full text-center'>5</div>
                            </div>
                            <div>
                                <div className='bg-white rounded-lg text-center text-xs font-semibold'>Average quiz score:</div>
                                <div className='w-full text-center'>78%</div>
                            </div>
                            <div>
                                <div className='bg-white rounded-lg text-center text-xs font-semibold'>Total assignments submitted:</div>
                                <div className='w-full text-center'>10</div>
                            </div>
                            <div>
                                <div className='bg-white rounded-lg text-center text-xs font-semibold'>Pending assignments:</div>
                                <div className='w-full text-center'>3</div>
                            </div>
                            <div>
                                <div className='bg-white rounded-lg text-center text-xs font-semibold'>Last quiz score:</div>
                                <div className='w-full text-center'>85%</div>
                            </div>
                            <div>
                                <div className='bg-white rounded-lg text-center text-xs font-semibold'>Total reading time:</div>
                                <div className='w-full text-center'>12 hours</div>
                            </div>
                            <div>
                                <div className='bg-white rounded-lg text-center text-xs font-semibold'>Total practice exercises completed:</div>
                                <div className='w-full text-center'>25</div>
                            </div>
                            <div>
                                <div className='bg-white rounded-lg text-center text-xs font-semibold'>Overall course progress:</div>
                                <div className='w-full text-center'>70%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page
