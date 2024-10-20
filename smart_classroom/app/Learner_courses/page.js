"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Learner_nav from '../Components/Learner_nav'
import L_course_card from '../Components/L_course_card'

const page = () => {

    // State Declarations
    const [CourseList, setCourseList] = useState([])

    //API calls
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

    // UseEffects
    useEffect(() => {
        getCourse()
    }, [])


    return (
        <div className='flex h-full bg-green-200'>
            <div className='h-full w-1/5 border border-black rounded-xl p-2 bg-white'>
                <Learner_nav />
            </div>
            <div className='h-full w-4/5 border border-black rounded-xl m-2 bg-white'>
                <div className="flex justify-between m-4 h-1/6 items-center">
                    <h1 className='font-extrabold text-3xl'>All Courses</h1>
                    <button className='py-2 px-6 border border-green-600 rounded-full font-bold text-xl  hover:border-green-700 transition-all ease-in-out'>Add Courses</button>
                </div>
                <ul className='m-4 p-2 flex justify-around items-center border border-green-700 rounded-full font-bold'>
                    <li className='w-1/4 grid place-items-center'>Course Name</li>
                    <li className='w-1/4 grid place-items-center'>Category</li>
                    <li className='w-1/4 grid place-items-center'>Duration</li>
                    <li className='w-1/4 grid place-items-center'>Actions</li>
                </ul>
                {/* Course List */}
                {CourseList.length > 0 ? (
                    CourseList.map((course, index) => (
                            <L_course_card
                                key={index}
                                id={course.course_id}
                                courseTitle={course.course_title}
                                courseCategory={course.course_category}
                                courseDuration={course.course_duration} />
                    ))
                ) : (
                    <p className='grid place-items-center'>No courses available</p>
                )}
            </div>
        </div>
    )
}

export default page
