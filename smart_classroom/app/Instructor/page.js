// "use client"
// import React, { useEffect, useState } from 'react'
// import Instructor_nav from '../Components/Instructor_nav'
// import Image from 'next/image'
// import { useSelector, useDispatch } from 'react-redux'

// const page = () => {

//     const user_id = useSelector(state => state.counter.text)

//     const [course_list, setCourse_list] = useState([])

//     const get_courses = async () => {
//         const response = await fetch(`http://localhost:5000/courses/getCourses/${user_id}`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             }
//         })
//         const data = await response.json()
//         console.log(data.data)
//         setCourse_list(data.data)
//     }

//     useEffect(() => {
//         get_courses()
//     }, [])


//     return (
//         <>
//             <div className='flex bg-green-200'>
//                 <div className='h-[83vh] w-1/5 border border-black rounded-xl p-2 bg-white m-1 flex-grow'>
//                     <Instructor_nav />
//                 </div>
//                 <div className='min-h-full w-4/5 border border-black rounded-xl p-2 bg-white m-1'>
//                     <div className='h-[50vh]'>
//                         <div className='w-full h-1/5 px-6 flex justify-between items-center'>
//                             <h1 className='font-extrabold text-3xl '>My Profile</h1>
//                             <button className='py-2 px-6 border border-green-600 rounded-full font-bold text-xl  hover:border-green-700 transition-all ease-in-out'>Edit</button>
//                         </div>
//                         <div className='h-4/5 flex justify-between'>
//                             <div className="h-full">
//                                 <ul className='h-full'>
//                                     <li className='p-3 pt-4'>Name: </li>
//                                     <li className='p-3 pt-4'>Title / Position: </li>
//                                     <li className='p-3 pt-4'>Institution / Department: </li>
//                                     <li className='p-3 pt-4'>Contact Information: </li>
//                                 </ul>
//                             </div>
//                             <Image
//                                 className='h-40 w-32 border border-black m-10'
//                             // src={profilePic}
//                             // alt="Picture of the author"
//                             // width={500} automatically provided
//                             // height={500} automatically provided
//                             // blurDataURL="data:..." automatically provided
//                             // placeholder="blur" // Optional blur-up while loading
//                             />
//                         </div>
//                     </div>
//                     <div className='my-3'>
//                         <h1 className='font-extrabold text-3xl '>About me</h1>
//                         <p className='my-2'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum, tempora officia facilis quidem quis voluptate molestiae ipsum quaerat earum unde tenetur sunt accusamus obcaecati laborum harum repellendus iure. Similique, deleniti. Delectus sunt quibusdam magnam facilis quaerat praesentium voluptas tenetur? Molestias.</p>
//                     </div>
//                     <div className='my-3'>
//                         <h1 className='font-extrabold text-3xl '>My Courses</h1>
//                         <ul className='py-2'>
//                             {
//                                 course_list.length === 0 ? (
//                                     <p>No courses available</p>  // Optional message when the list is empty
//                                 ) : (
//                                     <div>
//                                         {course_list.map((course, index) => (
//                                             <div key={index}>
//                                                 <h2>{index+1} . {course.course_title}</h2> {/* Display the course title */}
//                                             </div>
//                                         ))}
//                                     </div>
//                                 )
//                             }

//                         </ul>
//                     </div>
//                     <div className='my-3'>
//                         <h1 className='font-extrabold text-3xl '>Achievements / Certifications</h1>
//                         <ul>
//                             <li>Achievement 1</li>
//                             <li>Achievement 2</li>
//                             <li>Achievement 3</li>
//                             <li>Achievement 4</li>
//                         </ul>
//                     </div>
//                 </div>

//             </div>
//         </>
//     )
// }

// export default page






"use client";
import React, { useEffect, useState } from "react";
import Instructor_nav from "../Components/Instructor_nav";
import Image from "next/image";
import { useForm, useFieldArray } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";

const page = () => {
  const user_id = useSelector((state) => state.counter.text);

  const [name, setName] = useState('')
  const [course_list, setCourse_list] = useState([]);
  const [isEditing, setIsEditing] = useState(false); // Toggle between view and edit mode
  const [profileData, setProfileData] = useState({
    title: "Professor",
    institution: "University ABC, Dept. of Computer Science",
    contact: "john.doe@universityabc.edu",
    aboutMe: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    achievements: ["Achievement 1", "Achievement 2"],
  });

  const get_courses = async () => {
    const response = await fetch(`http://localhost:5000/courses/getCourses/${user_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setCourse_list(data.data);
  };

  const get_instructor_details = async (data) => {
    const response = await fetch(`http://localhost:5000/get_user_details/${user_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const result = await response.json()
    console.log(result)
    setName(result.data.candidate_name)
  }

  useEffect(() => {
    get_courses();
    get_instructor_details();
  }, []);

  const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
    defaultValues: {
      title: profileData.title,
      institution: profileData.institution,
      contact: profileData.contact,
      aboutMe: profileData.aboutMe,
      achievements: profileData.achievements.map((achievement) => ({ achievement })),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "achievements",
  });

  const onSubmit = (data) => {
    // Update the profile data state
    setProfileData({
      ...profileData,
      title: data.title,
      institution: data.institution,
      contact: data.contact,
      aboutMe: data.aboutMe,
      achievements: data.achievements.map((ach) => ach.achievement),
    });
    console.log(profileData)
    // Toggle back to view mode
    setIsEditing(false);
    reset();
  };

  return (
    <>
      <div className="flex bg-gradient-to-r from-green-100 to-white flex-col lg:flex-row max-w-[1860px] mx-auto">
        <div className="h-auto lg:h-[calc(100vh-112px)] w-full lg:w-1/5 border border-gray-300 shadow-lg rounded-lg p-4 bg-white m-4">
          <Instructor_nav />
        </div>
        <div className="h-auto lg:h-[calc(100vh-112px)] w-full lg:w-4/5 border border-gray-300 shadow-lg rounded-lg p-4 bg-white m-4 overflow-auto">
          <div className="h-full flex flex-col justify-between">
            {/* Header Section */}
            <div className="w-full flex justify-between items-center mb-6">
              <h1 className="font-bold text-4xl text-gray-800">My Profile</h1>
              <button
                className="py-2 px-6 border border-green-600 rounded-full font-bold text-xl text-green-600 hover:bg-green-600 hover:text-white transition-all ease-in-out duration-200 shadow-md"
                onClick={() => setIsEditing(!isEditing)} // Toggle between view and edit mode
              >
                {isEditing ? "Cancel" : "Edit"}
              </button>
            </div>

            <div className="flex-grow overflow-y-auto">
              {/* Profile Section */}
              <div className="flex flex-col lg:flex-row justify-between mb-6">
                {!isEditing ? (
                  <>
                    <div className="flex-grow p-4">
                      <ul className="list-disc list-inside">
                        <li className="py-2"><strong>Name:</strong> {name}</li>
                        <li className="py-2"><strong>Title / Position:</strong> {profileData.title}</li>
                        <li className="py-2"><strong>Institution / Department:</strong> {profileData.institution}</li>
                        <li className="py-2"><strong>Contact Information:</strong> {profileData.contact}</li>
                      </ul>
                    </div>
                    <Image
                      className="h-40 w-32 border border-gray-300 rounded-lg shadow-md m-4"
                    // src={profilePic}
                    // alt="Profile Picture"
                    />
                  </>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6 p-6">
                    {/* Title/Position Input */}
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title/Position
                      </label>
                      <input
                        type="text"
                        id="title"
                        {...register("title", { required: "Title is required" })}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-400 transition duration-150"
                      />
                      {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                    </div>

                    {/* Institution/Department Input */}
                    <div>
                      <label htmlFor="institution" className="block text-sm font-medium text-gray-700">
                        Institution/Department
                      </label>
                      <input
                        type="text"
                        id="institution"
                        {...register("institution", { required: "Institution is required" })}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-400 transition duration-150"
                      />
                      {errors.institution && <p className="text-red-500 text-sm">{errors.institution.message}</p>}
                    </div>

                    {/* Contact Information Input */}
                    <div>
                      <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
                        Contact Information
                      </label>
                      <input
                        type="text"
                        id="contact"
                        {...register("contact", { required: "Contact information is required" })}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-400 transition duration-150"
                      />
                      {errors.contact && <p className="text-red-500 text-sm">{errors.contact.message}</p>}
                    </div>

                    {/* About Me Textarea */}
                    <div>
                      <label htmlFor="aboutMe" className="block text-sm font-medium text-gray-700">
                        About Me
                      </label>
                      <textarea
                        id="aboutMe"
                        {...register("aboutMe", { required: "About Me is required" })}
                        rows="4"
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-400 transition duration-150"
                      />
                      {errors.aboutMe && <p className="text-red-500 text-sm">{errors.aboutMe.message}</p>}
                    </div>

                    {/* Achievements Section */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Achievements</label>
                      {fields.map((field, index) => (
                        <div key={field.id} className="mb-2 flex items-center space-x-2">
                          <input
                            type="text"
                            {...register(`achievements.${index}.achievement`, { required: "Achievement is required" })}
                            className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-400 transition duration-150"
                            placeholder={`Achievement ${index + 1}`}
                          />
                          <button
                            type="button"
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                            onClick={() => remove(index)}
                          >
                            Remove
                          </button>
                        </div>
                      ))}

                      {/* Add Achievement Button */}
                      <button
                        type="button"
                        onClick={() => append({ achievement: "" })}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                      >
                        + Add Achievement
                      </button>
                    </div>

                    {/* Submit Button */}
                    <div>
                      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Save
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* About Me Section */}
              <div className="my-6">
                <h1 className="font-bold text-3xl text-gray-800">About Me</h1>
                <p className="my-2 text-gray-700">{profileData.aboutMe}</p>
              </div>

              {/* My Courses Section */}
              <div className="my-6">
                <h1 className="font-bold text-3xl text-gray-800">My Courses</h1>
                <ul className="py-2">
                  {course_list.length === 0 ? (
                    <p className="text-gray-600">No courses available</p>
                  ) : (
                    course_list.map((course, index) => (
                      <div key={index} className="border-b border-gray-300 py-2">
                        <h2 className="text-lg text-gray-800">{index + 1}. {course.course_title}</h2>
                      </div>
                    ))
                  )}
                </ul>
              </div>

              {/* Achievements / Certifications Section */}
              <div className="my-6">
                <h1 className="font-bold text-3xl text-gray-800">Achievements / Certifications</h1>
                <ul>
                  {profileData.achievements.map((achievement, index) => (
                    <li key={index} className="text-gray-600 py-1">{achievement}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default page;
