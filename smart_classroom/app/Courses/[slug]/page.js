"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import Course_details_card from '../../Components/Course_details_card'


const page = ({ params }) => {
  const [isAddingCourse, setIsAddingCourse] = useState(false)
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
  }, [isAddingCourse, moduleList])

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
    if (newdata.contentType === "Content") {
      set_default_moduleData(newdata)
    } else {
      default_post_quiz_data(newdata)
    }
    setIsAddingCourse(false)
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
        <button onClick={() => { setIsAddingCourse(!isAddingCourse) }} className='px-4 py-2 border-green-700 border-2 rounded-full bg-white'>Add Module</button>
      </div>

      {/* module  */}
      <ol className='h-full'>
        {moduleList.length > 0 ? (
          moduleList.map((module, index) => (
            <li key={index}>
              <Course_details_card
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


      {/* Form for adding courses */}
      {isAddingCourse && (
       <div className="fixed inset-0 bg-gray-100 bg-opacity-70 flex items-center justify-center z-10">
       <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4 my-8 max-h-[80vh] overflow-y-auto">
         <h2 className="text-2xl font-semibold text-gray-700 mb-4">Create a New Module</h2>
         <form onSubmit={handleSubmit(onSubmit)}>
     
           {/* Module Title */}
           <div className="mb-4">
             <label className="block text-gray-700 font-medium mb-2" htmlFor="moduleTitle">
               Module Title
             </label>
             <input
               type="text"
               id="moduleTitle"
               {...register('moduleTitle', { required: 'Module title is required' })}
               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-500"
               placeholder="Enter module title"
             />
             {errors.moduleTitle && (
               <p className="text-red-500 text-sm mt-1">{errors.moduleTitle.message}</p>
             )}
           </div>
     
           {/* Module Description */}
           <div className="mb-4">
             <label className="block text-gray-700 font-medium mb-2" htmlFor="moduleDescription">
               Module Description
             </label>
             <textarea
               id="moduleDescription"
               {...register('moduleDescription', { required: 'Module description is required' })}
               rows="4"
               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-500"
               placeholder="Enter module description"
             ></textarea>
             {errors.moduleDescription && (
               <p className="text-red-500 text-sm mt-1">{errors.moduleDescription.message}</p>
             )}
           </div>
     
           {/* Content Type */}
           <div className="mb-4">
             <label className="block text-gray-700 font-medium mb-2" htmlFor="contentType">
               Content Type
             </label>
             <select
               id="contentType"
               {...register('contentType', { required: 'Content type is required' })}
               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-500"
               onChange={(e) => setContentType(e.target.value)}
             >
               <option value="" disabled>Select content type</option>
               <option value="Content">Content</option>
               <option value="quiz">Quiz</option>
             </select>
             {errors.contentType && (
               <p className="text-red-500 text-sm mt-1">{errors.contentType.message}</p>
             )}
           </div>
     
           {/* Submit Button */}
           <div className="mt-6">
             <button
               type="submit"
               className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
             >
               Create Module
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
