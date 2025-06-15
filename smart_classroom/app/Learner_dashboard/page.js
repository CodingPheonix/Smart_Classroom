"use client"
import React, { useCallback, useEffect, useState } from 'react'
import Learner_nav from '../Components/Learner_nav'
import Dashboard_activities from '../Components/Dashboard_activities'
import { useSelector, useDispatch } from 'react-redux';
import { setText, clearText } from '../redux/counter/counterSlice'
import Set_star from '../Components/Set_star.js'
import { ftotal_quiz, fper_cent_score, fmodules_completed, favg_score, ftotal_lessons, fmax_score } from "../operations.js"
import dotenv from 'dotenv';

dotenv.config();

const Page = () => {
    const dispatch = useDispatch();

    // Store the id of the current user
    const user_id = useSelector(state => state.counter.text);

    //State list
    const [activity_list, setActivity_list] = useState([])
    const [total_quiz, setTotal_quiz] = useState(0)
    const [avg_score, setAvg_score] = useState(0)
    const [per_cent_score, setPer_cent_score] = useState(0)
    const [modules_completed, setModules_completed] = useState(0)
    const [total_lessons, setTotal_lessons] = useState(0)
    const [max_quiz_score, setMax_quiz_score] = useState(0)
    const [pending_assignments, setPending_assignments] = useState(0)
    const [total_time, setTotal_time] = useState("")
    const [Rank, setRank] = useState(0)
    const [most_recent, setMost_recent] = useState(0)
    const [req_arr, setReq_arr] = useState([])

    //Api calls
    const get_activities = useCallback(async () => {
        try {
            const response = await fetch(`/api/Learner_dashboard/get_activities?user_id=${user_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const result = await response.json() 
            setActivity_list(result.data)
        } catch (error) {
            console.error('Error fetching activities:', error)
        }
    }, [user_id])

    const get_dashboard = useCallback(async () => {
        try {
            const response = await fetch(`/api/Learner_dashboard/fetch_student_dashboard_data?user_id=${user_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const result = await response.json()

            setReq_arr(result.data)
            setTotal_quiz(ftotal_quiz(result.data));
            setAvg_score(favg_score(result.data));
            setPer_cent_score(fper_cent_score(result.data))
            setModules_completed(fmodules_completed(result.data));
            setTotal_lessons(ftotal_lessons(result.data))
            setMax_quiz_score(fmax_score(result.data))

            const target = result.data.find(data => data.most_recent === true);
            setMost_recent(target?.quiz_score || 0);

        } catch (error) {
            console.error('Error fetching activities:', error)
        }
    }, [user_id])

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

    const get_pending_assignments = useCallback(async () => {
        const response = await fetch(`/api/Learner_dashboard/get_pending_assignments?user_id=${user_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const result = await response.json()
        setPending_assignments(result.data)
    }, [user_id]);

    const get_total_time = useCallback(async () => {
        const response = await fetch(`/api/Learner_dashboard/get_total_time?user_id=${user_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(),
        })
        const result = await response.json()
        setTotal_time(result.data)
    }, [user_id]);
    
    const get_rank = useCallback(async () => {
        const response = await fetch(`/api/Learner_dashboard/get_rank?user_id=${user_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(),
        })
        const result = await response.json()
        if (result.data == 1) {
            setRank("1st")
        }else if (result.data == 2) {
            setRank("2nd")
        }else if (result.data == 3) {
            setRank("3rd")
        }else{
            setRank(`${result.data}th`)
        }
    }, [user_id]);
    

    //useEffects
    useEffect(() => {
        const fetchData = async () => {
            await get_activities()
            await get_dashboard()
            await get_pending_assignments()
            await get_total_time()
            await get_rank()
        }
        fetchData()
    }, [user_id, get_activities, get_dashboard, get_pending_assignments, get_total_time, get_rank])

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
        <div className="flex bg-gradient-to-r from-green-100 to-white flex-col lg:flex-row max-w-[1860px] mx-auto">
            <div className="h-auto lg:h-[calc(100vh-112px)] w-[calc(100vw-2rem)] lg:w-1/5 border border-gray-300 shadow-lg rounded-lg p-4 bg-white m-4">
                <Learner_nav />
            </div>
            <div className="h-[calc(100vh-225px)] lg:h-[calc(100vh-112px)] w-[calc(100vw-2rem)] lg:w-4/5 border border-gray-300 shadow-lg rounded-lg p-4 bg-white m-4 overflow-auto">
                <h1 className='font-extrabold text-3xl h-24 flex items-center p-4'>Dashboard</h1>

                <div className='flex lg:flex-row flex-col gap-2 w-full justify-around items-center'>
                    <div className='lg:w-44 w-3/4 p-2 h-28 bg-gradient-to-b from-white to-green-300 font-bold text-xs learner_dashboard_basic'>
                        <div className='h-1/6'>Total quizzes attempted</div>
                        <div className='h-5/6 grid place-items-center text-2xl'>{total_quiz}</div>
                    </div>
                    <div className='lg:w-44 w-3/4 p-2 h-28 bg-gradient-to-b from-white to-green-300 font-bold text-xs learner_dashboard_basic'>
                        <div className='h-1/6'>Percentage score achieved</div>
                        <div className='h-5/6 grid place-items-center text-2xl'>{per_cent_score}</div>
                    </div>
                    <div className='lg:w-44 w-3/4 p-2 h-28 bg-gradient-to-b from-white to-green-300 font-bold text-xs learner_dashboard_basic'>
                        <div className='h-1/6'>Modules Completed</div>
                        <div className='h-5/6 grid place-items-center text-2xl'>{modules_completed}</div>
                    </div>
                    <div className='lg:w-44 w-3/4 p-2 h-28 bg-gradient-to-b from-white to-green-300 font-bold text-xs learner_dashboard_basic'>
                        <div className='h-1/6'>Overall Rank</div>
                        <div className='h-5/6 grid place-items-center text-2xl'>{Rank}</div>
                    </div>
                </div>

                <div className='w-full flex lg:flex-row flex-col gap-2 justify-center items-start'>
                    <div className='lg:w-1/2 w-full h-72 border mx-auto border-black rounded-xl m-2 p-2 flex flex-col items-center'>
                        <h3 className='w-full text-center font-bold'>ACTIVITIES</h3>
                        <div className='w-full flex justify-around items-center'>
                            <div className='font-semibold'>Sl no.</div>
                            <div className='font-semibold'>Activity</div>
                            <div className='font-semibold'>Score</div>
                        </div>
                        <div className='w-5/6 h-[1px] bg-black my-1'></div>
                        <div className='overflow-y-auto w-full h-[40vh]'>
                            {activity_list && (
                                (activity_list.length === 0 && activity_list) ? (
                                    <div className='text-center'>No Activities Recorded</div>
                                ) : (
                                    activity_list.map((activity, index) => (
                                        <Dashboard_activities key={index} slno={index + 1} activity={activity.name} score={activity.data} />
                                    ))
                                )
                            )}
                        </div>
                    </div>

                    <div className='lg:w-1/2 w-full h-72 mx-auto border border-black rounded-xl m-2 p-2'>
                        <h3 className='w-full text-center font-bold'>ANALYSIS</h3>
                        <div className='w-full grid grid-cols-2 gap-4 p-4'>
                            <div>
                                <div className='bg-white rounded-lg text-center text-xs font-semibold'>Total Lessons Viewed:</div>
                                <div className='w-full text-center'>{total_lessons || 0}</div>
                            </div>
                            <div>
                                <div className='bg-white rounded-lg text-center text-xs font-semibold'>Average Assignment Score:</div>
                                <div className='w-full text-center'>{avg_score || 0.00}</div>
                            </div>
                            <div>
                                <div className='bg-white rounded-lg text-center text-xs font-semibold'>Most Recent Quiz Score:</div>
                                <div className='w-full text-center'>{most_recent || 0}</div>
                            </div>
                            <div>
                                <div className='bg-white rounded-lg text-center text-xs font-semibold'>Max quiz score:</div>
                                <div className='w-full text-center'>{max_quiz_score || 0}</div>
                            </div>
                            <div>
                                <div className='bg-white rounded-lg text-center text-xs font-semibold'>Total assignments submitted:</div>
                                <div className='w-full text-center'>{total_quiz || 0}</div>
                            </div>
                            <div>
                                <div className='bg-white rounded-lg text-center text-xs font-semibold'>Pending assignments:</div>
                                <div className='w-full text-center'>{pending_assignments || 0}</div>
                            </div>
                            <div>
                                <div className='bg-white rounded-lg text-center text-xs font-semibold'>Total reading time:</div>
                                <div className='w-full text-center'>{total_time || "0:0:0"}</div>
                            </div>
                            <div>
                                <div className='bg-white rounded-lg text-center text-xs font-semibold'>Academic Rating:</div>
                                <div className='w-full flex justify-center items-center pt-1'><Set_star arr={req_arr} /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page
