"use client"
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Notice_card from '../Components/notice_card'
import Instructor_nav from '../Components/Instructor_nav'
import { useSelector, useDispatch } from 'react-redux'

const page = () => {

    const user_id = useSelector(state => state.counter.text)
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();

    //State List
    const [set_notice, setSet_notice] = useState(false)
    const [notice_list, setNotice_list] = useState([])

    // API calls
    const send_notice = async (data) => {
        const response = await fetch(`http://localhost:5000/send_notice/${user_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        const result = await response.json()
        console.log(result)
    }

    const get_notices = async () => {
        const response = await fetch(`http://localhost:5000/get_notices/${user_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const result = await response.json()
        console.log(result)
        if (result.data) {
            setNotice_list(result.data.notices)
        }
    };

    useEffect(() => {
      get_notices()
    }, [])
    

    // Submits
    const onSubmit = (data) => {
        setNotice_list((prev) => {
            const updatedList = [...prev, data];
            console.log(updatedList)
            send_notice(updatedList); // Send the updated list directly
            return updatedList;
        });
        reset();
        setSet_notice(!set_notice);
    };

    return (
        <div className='flex min-h-[calc(100vh-5rem)] bg-green-200'>
            <div className='w-1/5 border border-black rounded-xl m-2 bg-white'>
                <Instructor_nav />
            </div>
            <div className='w-4/5 border border-black rounded-xl m-2 bg-white'>
                <div className='flex justify-between items-center p-7'>
                    <h2 className='font-bold text-3xl'>Notice Board</h2>
                    <button
                        onClick={() => { setSet_notice(!set_notice) }}
                        className='px-4 py-2 rounded-full border border-green-500 font-semibold'
                    >Add Notice</button>
                </div>
                <div>
                    {notice_list ? (
                        notice_list.map((notice, index) => {
                            return (
                                <Notice_card key={index} heading={notice.heading} description={notice.description} />
                            )
                        })
                    ) : (
                        <div className='h-full text-center'>No Notice Added</div>
                    )}
                </div>

                {set_notice && (
                    <div>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="absolute inset-0 flex items-center justify-center bg-gray-50"
                        >
                            <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg space-y-6">
                                <h2 className="text-2xl font-semibold text-gray-800 text-center">Add Notice</h2>

                                <div>
                                    <label htmlFor="heading" className="block text-lg font-medium text-gray-700 mb-2">Heading</label>
                                    <input
                                        type="text"
                                        id="heading"
                                        {...register("heading", { required: "Heading is required" })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                    />
                                    {errors.heading && <p className="text-red-500 text-sm mt-1">{errors.heading.message}</p>}
                                </div>

                                <div>
                                    <label htmlFor="description" className="block text-lg font-medium text-gray-700 mb-2">Description</label>
                                    <textarea
                                        id="description"
                                        {...register("description", { required: "Description is required" })}
                                        className="w-full h-32 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                    ></textarea>
                                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-2 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600 transition duration-200"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>


                    </div>
                )}

            </div>
        </div>
    )
}

export default page
