"use client"
import { useState, useEffect } from 'react'
import React from 'react'
import Link from 'next/link'
import L_mycourse_card from '../Components/L_mycourse_card'
import Learner_nav from '../Components/Learner_nav'

const page = () => {

    //States declaration
    const [CourseList, setCourseList] = useState([])

    //API calls
    const getCourseList = async () => {
        try {
            const response = await fetch('http://localhost:5000/getMyCourseList', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const data = await response.json()
            setCourseList(data.data)
        } catch (error) {
            console.error(error)
        }
    }

    //useEffects
    useEffect(() => {
        getCourseList()
    }, [])



    return (
        <div className='flex h-full bg-green-200'>
            <div className='h-full w-1/5 border border-black rounded-xl m-2 bg-white'>
                <Learner_nav />
            </div>
            <div className='h-full w-4/5 border border-black rounded-xl m-2 bg-white p-2'>
                <h1 className='font-extrabold text-3xl p-5'>My Courses</h1>
                <ul className='m-4 p-2 flex justify-around items-center border border-green-700 rounded-full font-bold'>
                    <li className='w-1/4 grid place-items-center'>Course Name</li>
                    <li className='w-1/4 grid place-items-center'>Category</li>
                    <li className='w-1/4 grid place-items-center'>Duration</li>
                    <li className='w-1/4 grid place-items-center'>Actions</li>
                </ul>
                {/* Course List */}
                {CourseList.length > 0 ? (
                    CourseList.map((course, index) => (
                        // <Link key={index} href={`/Courses/${course.course_id}`}>
                        <L_mycourse_card
                            key={index}
                            id={course.course_id}
                            courseTitle={course.course_title}
                            courseCategory={course.course_category}
                            courseDuration={course.course_duration} />
                        // </Link>
                    ))
                ) : (
                    <p className='grid place-items-center'>No courses added</p>
                )}
            </div>
        </div>
    )
}

export default page