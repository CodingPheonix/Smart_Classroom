"use client"
import { useState, useEffect } from 'react'
import React from 'react'
import Link from 'next/link'
import L_mycourse_card from '../Components/L_mycourse_card'
import Learner_nav from '../Components/Learner_nav'
import { useSelector, useDispatch } from 'react-redux';
import { setText, clearText } from '../redux/counter/counterSlice'
import dotenv from 'dotenv';

dotenv.config();

const page = () => {
    const dispatch = useDispatch();
    console.log("this is learner mycourses");
    

    // Store the id of the current user
    const user_id = useSelector(state => state.counter.text);

    //States declaration
    const [CourseList, setCourseList] = useState([])

    //API calls
    const getCourseList = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getMyCourseList/${user_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const data = await response.json()
            console.log(data);

            setCourseList(data.data)
            // setCourseList(data)
        } catch (error) {
            console.error(error)
        }
    }

    const get_current_user = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/get_current_user`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const result = await response.json()
        console.log(result)
        return result
    };

    //useEffects

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await get_current_user();
                if (result.data && result.data.length !== 0) {
                    dispatch(setText(result.data[0].user_id));
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchData();
    }, []);


    useEffect(() => {
        getCourseList()
    }, [user_id])



    return (
        <div className="flex bg-gradient-to-r from-green-100 to-white flex-col lg:flex-row max-w-[1860px] mx-auto">
            <div className="h-auto lg:h-[calc(100vh-112px)] w-[calc(100vw-2rem)] lg:w-1/5 border border-gray-300 shadow-lg rounded-lg p-4 bg-white m-4">
                <Learner_nav />
            </div>
            <div className="h-[calc(100vh-225px)] lg:h-[calc(100vh-112px)] w-[calc(100vw-2rem)] lg:w-4/5 border border-gray-300 shadow-lg rounded-lg p-4 bg-white m-4 overflow-auto">
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
                            user={user_id}
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
