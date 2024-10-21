"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import L_Course_details_card from '../../Components/L_Course_details_card'


const page = ({ params }) => {
  const [contentType, setContentType] = useState('')
  const [title, settitle] = useState('')
  const [courseDetails, setCourseDetails] = useState({})
  const [moduleList, setModuleList] = useState([])

  useEffect(() => {
    const getModules = async () => {
      const modules = await getModule()
      console.log("modules fetched = ", modules)
      setModuleList(modules)
    }
    getModules()
  }, [])

  useEffect(() => {
    const fetchTitle = async () => {
      await getTitle();
    };
    fetchTitle();
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    console.log(data)
    setModuleList([...moduleList, data])
    const newdata = { ...data, id: uuidv4() }
    console.log(newdata)
    createModule(newdata)
    set_default_moduleData(newdata)
    default_post_quiz_data(newdata)
    reset()
  }

  const getModule = async () => {
    try {
      const responce = await fetch(`http://localhost:5000/courses/course/get-title/${params.slug}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const result = await responce.json()
      // console.log(result.data.course_details)
      return result.data.course_details
      // setModuleList(result.data.course_details)
      // console.log(moduleList)
    } catch (error) {
      console.error("Failed to fetch course list: ", error.message)
    }
  }


  const createModule = async (data) => {
    try {
      const result = await fetch(`http://localhost:5000/courses/course/createModule/${params.slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
      const response = await result.json()
      console.log(response)
    } catch (error) {
      console.error('Failed to modify courses', error.message);
    }
  }

  const set_default_moduleData = async (data) => {
    try {
      const responce = await fetch(`http://localhost:5000/courses/course/setModule`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
      const result = await responce.json()
      console.log(result)
    } catch (error) {
      throw new Error(error);
    }
  }

  const default_post_quiz_data = async (data) => {
    try {
      const responce = await fetch(`http://localhost:5000/post_quiz_data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
      const result = await responce.json()
      console.log(result)
    } catch (error) {
      throw new Error(error);
    }
  }

  const getTitle = async () => {
    const responce = await fetch(`http://localhost:5000/courses/course/get-title/${params.slug}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const data = await responce.json()
    console.log(data.data)
    settitle(data.data.course_title)
  }


  return (
    <div className='relative h-[calc(100vh-9rem)]'>
      <div className='flex justify-between items-center px-4 h-16 bg-green-200 '>
        <h1 className='font-bold text-xl'>{title}</h1>
      </div>
      
      {/* module  */}
      <ol className='h-full'>
        {moduleList.length > 0 ? (
          moduleList.map((module, index) => (
            <li key={index}>
              <L_Course_details_card
                course_id={params.slug}
                module_id={module.module_id}
                module_title={module.module_title}
                module_description={module.module_description}
                content_type={module.content_type}
              />
            </li>
          ))
        ) : (
          <p className='grid place-items-center h-full'>No modules yet</p>
        )}
      </ol>      
    </div>
  )
}

export default page
