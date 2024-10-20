import React from 'react'
import { useState } from 'react'
import Learner_nav from '../Components/Learner_nav'

const page = () => {

    const [CourseList, setCourseList] = useState([])

    const getCourse = async () => {
        try {
            const response = await fetch('http://localhost:5000/courses/getCourses', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const result = await response.json()
            console.log(result.data)
            setCourseList(result.data)
        } catch (error) {
            console.error('Failed to fetch courses', error.message);
        }
    }

    

    return (
        <div className='flex h-full bg-green-200'>
            <div className='h-full w-1/5 border border-black rounded-xl m-2 bg-white'>
                <Learner_nav />
            </div>
            <div className='h-full w-4/5 border border-black rounded-xl m-2 bg-white'>
                <div className="flex justify-between m-4 h-1/6 items-center">
                    <h1 className='font-extrabold text-3xl'>My Courses</h1>
                    <button className='py-2 px-6 border border-green-600 rounded-full font-bold text-xl  hover:border-green-700 transition-all ease-in-out'>Add Courses</button>
                </div>
                <ul className='m-4 p-2 flex justify-around items-center border border-green-700 rounded-full font-bold'>
                    <li>Sl no</li>
                    <li>Course Name</li>
                    <li>Category</li>
                </ul>
            </div>
        </div>
    )
}

export default page
