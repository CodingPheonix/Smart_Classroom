"use client"
import React from 'react'
import Link from 'next/link';
import { useEffect } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import { setText, clearText } from '../redux/counter/counterSlice'
import dotenv from 'dotenv';

dotenv.config();

const L_course_card = (props) => {

    const dispatch = useDispatch();

    // Store the id of the current user
    const user_id = useSelector(state => state.counter.text);

    const PlusSignIcon = (props) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={32} height={32} color={"#000000"} fill={"none"} {...props}>
            <path d="M12 4V20M20 12H4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );

    const ArrowUpRight03Icon = (props) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={32} height={32} color={"#000000"} fill={"none"} {...props}>
            <path d="M16.5 7.5L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M8 6.18791C8 6.18791 16.0479 5.50949 17.2692 6.73079C18.4906 7.95209 17.812 16 17.812 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );

    // Api calls
    const handleAddCourse = async () => {
        const responce = await fetch(`/api/components/l_course_card?id=${props.id}&learner_id=${user_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({})
        })
        const data = await responce.json()
        toast("Course Added", {
            position: "top-right",
            autoClose: 3000,
        })
    }

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

    // USEEFFECTS
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


    return (
        <div>
            <ToastContainer />
            <ul className='m-4 p-2 flex justify-around items-center border border-green-700 rounded-full font-bold'>
                <li className='w-1/4 grid place-items-center'>{props.courseTitle}</li>
                <li className='w-1/4 grid place-items-center'>{props.courseCategory}</li>
                <li className='w-1/4 grid place-items-center'>{props.courseDuration}</li>
                <li className='flex gap-4 justify-center items-center w-1/4'>
                    <button onClick={handleAddCourse}>
                        <PlusSignIcon />
                    </button>
                    <Link href={`/View_Courses/${props.id}`}>
                        <button>
                            <ArrowUpRight03Icon />
                        </button>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default L_course_card
