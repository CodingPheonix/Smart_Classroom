"use client"
import React from 'react'
import { useState, useEffect } from 'react'
// import { useForm } from 'react-hook-form'
// import { v4 as uuidv4 } from 'uuid'
// import Course_details_card from '../../Components/Course_details_card'
import View_course_details_card from '../../Components/View_course_details_card.js'
import dotenv from 'dotenv';

dotenv.config();


const Page = ({ params }) => {
    const [isAddingCourse, setIsAddingCourse] = useState(false)
    // const [contentType, setContentType] = useState('')
    const [title, settitle] = useState('')
    // const [courseDetails, setCourseDetails] = useState({})
    const [moduleList, setModuleList] = useState([])

    useEffect(() => {
        const getModules = async () => {
            const modules = await getModule()
            setModuleList(modules)
        }
        getModules()
    }, [isAddingCourse])

    useEffect(() => {
        const fetchTitle = async () => {
            await getTitle();
        };
        fetchTitle();
    }, []);

    // const {
    //     register,
    //     handleSubmit,
    //     watch,
    //     reset,
    //     formState: { errors },
    // } = useForm()

    // const onSubmit = (data) => {
    //     console.log(data)
    //     setModuleList([...moduleList, data])
    //     const newdata = { ...data, id: uuidv4() }
    //     console.log(newdata)
    //     createModule(newdata)
    //     if (newdata.contentType === "Content") {
    //         set_default_moduleData(newdata)
    //     } else {
    //         default_post_quiz_data(newdata)
    //     }
    //     setIsAddingCourse(false)
    //     reset()
    // }

    const getModule = async () => {
        try {
            const responce = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/courses/course/get-title/${params.slug}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const result = await responce.json()
            return result.data.course_details
            // setModuleList(result.data.course_details)
            // console.log(moduleList)
        } catch (error) {
            console.error("Failed to fetch course list: ", error.message)
        }
    }


    // const createModule = async (data) => {
    //     try {
    //         const result = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/courses/course/createModule/${params.slug}`, {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(data)
    //         })
    //         const response = await result.json()
    //         console.log(response)
    //     } catch (error) {
    //         console.error('Failed to modify courses', error.message);
    //     }
    // }

    // const set_default_moduleData = async (data) => {
    //     try {
    //         const responce = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/courses/course/setModule`, {
    //             method: "POST",
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(data)
    //         })
    //         const result = await responce.json()
    //         console.log(result)
    //     } catch (error) {
    //         console.error('Failed to set default module data', error.message)
    //     }
    // }

    // const default_post_quiz_data = async (data) => {
    //     try {
    //         const responce = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/post_quiz_data`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(data)
    //         })
    //         const result = await responce.json()
    //         console.log(result)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    const getTitle = async () => {
        const responce = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/courses/course/get-title/${params.slug}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = await responce.json()
        settitle(data.data.course_title)
    }


    return (
        <div className='relative h-[calc(100vh-9rem)]'>
            <div className='flex justify-between items-center px-4 h-16 bg-green-200 '>
                <h1 className='font-bold text-xl'>{title}</h1>
            </div>

            {/* module  */}
            <ol className='h-full flex flex-wrap gap-5 m-2'>
                {moduleList.length > 0 ? (
                    moduleList.map((module, index) => (
                        <li key={index}>
                            <View_course_details_card
                                course_id={params.slug}
                                module_id={module.module_id}
                                module_title={module.module_title}
                                module_description={module.module_description}
                                content_type={module.content_type}
                            />
                        </li>
                    ))
                ) : (
                    <p className='grid place-items-center w-full h-full'>No modules yet</p>
                )}
            </ol>
        </div>
    )
}

export default Page
