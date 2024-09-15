"use client"
import React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { v4 as uuidv4 } from 'uuid';
import Instructor_nav from '../Components/Instructor_nav'
import I_course_card from '../Components/I_course_card'

const page = () => {

    const [isCreate, setIsCreate] = useState(false)
    const [CourseList, setCourseList] = useState([])

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        console.log(data)
        setCourseList([...CourseList, {...data, id:uuidv4()}])
        reset()
        setIsCreate(!isCreate)
    }

    return (
        <div className='flex h-full bg-green-200'>
            <div className='h-full w-1/5 border border-black rounded-xl m-2 bg-white'>
                <Instructor_nav />
            </div>
            <div className='h-full w-4/5 border border-black rounded-xl m-2 bg-white'>
                <div className="flex justify-between m-4 h-1/6 items-center">
                    <h1 className='font-extrabold text-3xl'>My Courses</h1>
                    <button onClick={() => { setIsCreate(!isCreate) }} className='py-2 px-6 border border-green-600 rounded-full font-bold text-xl  hover:border-green-700 transition-all ease-in-out'>Create Courses</button>
                </div>
                <ul className='m-4 p-2 flex justify-around items-center border border-green-700 rounded-full font-bold'>
                    <li>Course Title</li>
                    <li>Course Category</li>
                    <li>Duration</li>
                </ul>
                {/* Course List */}
                {CourseList.length > 0 ? (
                    CourseList.map((course, index) => (
                        <Link href={`../Courses/${course.id}`}><I_course_card key={course.id} courseTitle={course.courseTitle} courseCategory={course.courseCategory} courseDuration={course.courseDuration} /></Link>
                    ))
                ) : (
                    <p className='grid place-items-center'>No courses available</p>
                )}
            </div>

            {isCreate && (
                // Form for creating courses 
                <div className="min-h-screen bg-gray-100 flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Create a New Course</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* Course Title */}
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2" htmlFor="courseTitle">
                                    Course Title
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-500"
                                    placeholder="Enter course title"
                                    {...register("courseTitle")}
                                />
                            </div>

                            {/* Course Description */}
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2" htmlFor="courseDescription">
                                    Course Description
                                </label>
                                <textarea
                                    rows="4"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-500"
                                    placeholder="Enter course description"
                                    {...register("courseDescription")}
                                ></textarea>
                            </div>

                            {/* Course Category */}
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2" htmlFor="courseCategory">
                                    Course Category
                                </label>
                                <select
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-500"
                                    {...register("courseCategory")}
                                >
                                    <option value="" disabled>Select a category</option>
                                    <option value="Computer Science">Computer Science</option>
                                    <option value="Mathematics">Mathematics</option>
                                    <option value="Physics">Physics</option>
                                    <option value="Literature">Literature</option>
                                </select>
                            </div>

                            {/* Course Duration */}
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2" htmlFor="courseDuration">
                                    Duration (in weeks)
                                </label>
                                <input
                                    type="number"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-500"
                                    placeholder="Enter duration in weeks"
                                    {...register("courseDuration")}
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="mt-6">
                                <button
                                    type="submit"
                                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    Create Course
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            )}
        </div>
    )
}

export default page
