"use client"
import React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'

const page = ({ params }) => {

  const [isAddingCourse, setIsAddingCourse] = useState(false)
  const [contentType, setContentType] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    console.log(data)
    setIsAddingCourse(false)
    reset()
  }

  return (
    <div className='relative h-screen'>
      <div className='flex justify-between items-center px-4 h-16 bg-green-200 '>
        <h1 className='font-bold text-xl'>Title</h1>
        <button onClick={() => { setIsAddingCourse(!isAddingCourse) }} className='px-4 py-2 border-green-700 border-2 rounded-full bg-white'>Add Module</button>
      </div>
      {isAddingCourse && (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-100 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">Create a New Module</h2>
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
                  <option value="video">Video</option>
                  <option value="pdf">PDF</option>
                  <option value="quiz">Quiz</option>
                </select>
                {errors.contentType && (
                  <p className="text-red-500 text-sm mt-1">{errors.contentType.message}</p>
                )}
              </div>

              {/* Video URL */}
              {contentType === 'video' && (
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="videoUrl">
                    Video URL
                  </label>
                  <input
                    type="url"
                    id="videoUrl"
                    {...register('videoUrl', {
                      required: 'Video URL is required',
                      pattern: {
                        value: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm,
                        message: 'Enter a valid URL',
                      },
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-500"
                    placeholder="Enter video URL"
                  />
                  {errors.videoUrl && (
                    <p className="text-red-500 text-sm mt-1">{errors.videoUrl.message}</p>
                  )}
                </div>
              )}

              {/* PDF Upload */}
              {contentType === 'pdf' && (
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="pdfFile">
                    Upload PDF
                  </label>
                  <input
                    type="file"
                    id="pdfFile"
                    {...register('pdfFile', { required: 'PDF file is required' })}
                    accept=".pdf"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-500"
                  />
                  {errors.pdfFile && (
                    <p className="text-red-500 text-sm mt-1">{errors.pdfFile.message}</p>
                  )}
                </div>
              )}

              {/* Quiz Questions */}
              {contentType === 'quiz' && (
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="quizQuestions">
                    Quiz Questions (comma separated)
                  </label>
                  <textarea
                    id="quizQuestions"
                    {...register('quizQuestions', { required: 'Quiz questions are required' })}
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-500"
                    placeholder="Enter quiz questions"
                  ></textarea>
                  {errors.quizQuestions && (
                    <p className="text-red-500 text-sm mt-1">{errors.quizQuestions.message}</p>
                  )}
                </div>
              )}

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