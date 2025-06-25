"use client"
import React, { useEffect, useState } from 'react'
import Instructor_nav from '../Components/Instructor_nav'
import I_results_card from '../Components/I_results_card'
import { useSelector, useDispatch } from 'react-redux'
import { setText, clearText } from '../redux/counter/counterSlice'
import dotenv from 'dotenv';

dotenv.config();

const Page = () => {

    const dispatch = useDispatch()
    const user_id = useSelector(state => state.counter.text)

    // State Declaration
    const [student_list, setStudent_list] = useState([])

    // API calls

    const get_student_data = async () => {
        const response = await fetch(`api/I_results/get_student_data?user_id=${user_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const result = await response.json()
        return { responce: response, result: result }
    };


    // Functions
    const get_current_user = async () => {
        const response = await fetch(`/api/home/get_current_user`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const result = await response.json()
        return result
    };

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
    }, [dispatch]);

    // UseEffects
    useEffect(() => {
        get_current_user()
    }, [])

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const { result } = await get_student_data();
                console.log(result)
                setStudent_list(result.data);
            } catch (error) {
                console.error("Error fetching student data:", error);
            }
        };
    
        fetchStudentData();
    }, [user_id]);
    

    return (
        <div className="flex flex-col lg:flex-row  mx-auto bg-gradient-to-r from-green-100 to-white max-w-[1860px]">
        {/* Sidebar */}
        <div className="h-auto lg:h-[calc(100vh-112px)] w-full lg:w-1/5 border border-gray-300 shadow-lg rounded-lg p-4 bg-white m-4">
            <Instructor_nav />
        </div>
    
        {/* Main Content */}
        <div className="flex-grow min-h-[calc(100vh-230px)] lg:h-[calc(100vh-112px)] border border-gray-300 shadow-lg rounded-lg p-4 bg-white m-4 overflow-auto">
            {student_list.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {student_list.map((data, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center shadow-md border border-gray-200 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-transform transform hover:scale-105"
                        >
                            <I_results_card
                                image={data.image}
                                name={data.name}
                                registered_course={data.registered_course}
                                achieved_score={data.achieved_score}
                                total_score={data.total_score}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">No Data Available</p>
            )}
        </div>
    </div>
    

    )
}

export default Page
