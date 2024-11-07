"use client";
import React from 'react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { setText, clearText } from '../redux/counter/counterSlice'
import Learner_nav from '../Components/Learner_nav';

const Page = () => {
  const dispatch = useDispatch();

  // Store the id of the current user
  const user_id = useSelector(state => state.counter.text);
  console.log("user_id: ", user_id);

  // State List
  const [name, setName] = useState("");
  const [date_of_birth, setDate_of_birth] = useState("");
  const [age, setAge] = useState(0);
  const [address, setaddress] = useState("")
  const [Phone, setPhone] = useState(0)
  const [Registered_courses, setRegistered_courses] = useState([])
  const [isEditing, setIsEditing] = useState(false)

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // const get_Learner_details = async () => {
  //   const response = await fetch(`http://localhost:5000/get_user_details/${user_id}`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     }
  //   });
  //   const result = await response.json();
  //   console.log(result);
  //   setName(result.data.candidate_name);
  // };

  const get_current_user = async () => {
    const response = await fetch(`http://localhost:5000/get_current_user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const result = await response.json()
    console.log(result)
    return result
  };

  const getCourseList = async () => {
    try {
      const response = await fetch(`http://localhost:5000/getMyCourseList/${user_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      const data = await response.json()
      console.log(data);
      setRegistered_courses(data.data)
    } catch (error) {
      console.error(error)
    }
  }

  const upload_user_profile_data = async (data) => {
    const response = await fetch(`http://localhost:5000/upload_user_profile_data/${user_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const result = await response.json()
    console.log(result)
  };

  const fetch_user_profile_data = async () => {
      const response = await fetch(`http://localhost:5000/fetch_user_profile_data/${user_id}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          }
      })
      const result = await response.json()
      console.log(result)
      setName(result.data.user_name)
      setDate_of_birth(result.data.user_dob)      
      setAge(result.data.user_age)
      setaddress(result.data.user_address)
      setPhone(result.data.user_phone)
  };

  //UseEffects
  useEffect(() => {
    // get_Learner_details();
    getCourseList();
    fetch_user_profile_data()
  }, [user_id]);

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

  // Form Submits
  const onSubmit = (data) => {
    console.log(data);
    setName(data.name);
    setAge(data.age);
    setDate_of_birth(data.date_of_birth);
    setaddress(data.address);
    setPhone(data.phone);
    upload_user_profile_data(data)
    reset()
    setIsEditing(!isEditing)
  };

  return (
    <>
      <div className="flex bg-gradient-to-r from-green-100 to-white flex-col lg:flex-row max-w-[1860px] mx-auto">
        <div className="h-auto lg:h-[calc(100vh-112px)] w-[calc(100vw-2rem)] lg:w-1/5 border border-gray-300 shadow-lg rounded-lg p-4 bg-white m-4">
          <Learner_nav />
        </div>
        <div className="h-[calc(100vh-225px)] lg:h-[calc(100vh-112px)] w-[calc(100vw-2rem)] lg:w-4/5 border border-gray-300 shadow-lg rounded-lg p-4 bg-white m-4 overflow-auto">
          {/* Header Section */}
          <div className='flex justify-between items-center p-6 border-b border-gray-300 mb-3'>
            <h1 className='font-extrabold text-3xl text-gray-800'>My Profile</h1>
            <button
              onClick={() => { setIsEditing(!isEditing); }}
              className='block py-2 px-6 border border-green-600 rounded-full font-bold text-xl text-green-600 hover:bg-green-600 hover:text-white transition-all ease-in-out'
            >
              Edit
            </button>

          </div>

          {/* Profile Details Section */}
          <div className='flex-grow'>
            <ul className='px-10 space-y-4'>
              <li className='text-lg'><strong>Name:</strong> {name || '[Name]'}</li>
              <li className='text-lg'><strong>Date of Birth:</strong> {date_of_birth || '[Date]'}</li>
              <li className='text-lg'><strong>Age:</strong> {age || '[Age]'} </li>
              <li className='text-lg'><strong>Address:</strong> {address || '[Address]'} </li>
              <li className='text-lg'><strong>Phone no:</strong> {Phone || '[Phone no]'} </li>
            </ul>

            <h3 className='mt-6 mb-2 text-2xl font-semibold px-6'>Registered Courses</h3>
            <div className='space-y-2 px-6'>
              {
                Registered_courses && Registered_courses.length > 0 ? (
                  Registered_courses.map((course, index) => (
                    <div key={index} className='flex items-center bg-gray-50 p-3 border border-gray-200 rounded-md shadow-sm'>
                      <span className='font-medium mr-2'>{index + 1}.</span>
                      <span className='text-gray-800'>{course.course_title}</span>
                    </div>
                  ))
                ) : (
                  <p className='text-gray-500'>No registered courses available.</p>
                )
              }
            </div>
          </div>

        </div>
        {isEditing && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit(onSubmit)} className="px-10 space-y-4 bg-white h-auto w-1/2 p-6 border border-gray-300 rounded-lg shadow-lg">
              {/* Name Field */}
              <div>
                <label className="block text-lg font-semibold" htmlFor="name">Name:</label>
                <input
                  id="name"
                  {...register('name', { required: 'Name is required' })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Enter name"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              </div>

              {/* Date of Birth Field */}
              <div>
                <label className="block text-lg font-semibold" htmlFor="date_of_birth">Date of Birth:</label>
                <input
                  type="date"
                  id="date_of_birth"
                  {...register('date_of_birth', { required: 'Date of Birth is required' })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
                {errors.date_of_birth && <p className="text-red-500 text-sm">{errors.date_of_birth.message}</p>}
              </div>

              {/* Age Field */}
              <div>
                <label className="block text-lg font-semibold" htmlFor="age">Age:</label>
                <input
                  type="number"
                  id="age"
                  {...register('age', { required: 'Age is required', min: { value: 0, message: 'Age must be a positive number' } })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Enter age"
                />
                {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
              </div>

              {/* Address Field */}
              <div>
                <label className="block text-lg font-semibold" htmlFor="address">Address:</label>
                <input
                  id="address"
                  {...register('address', { required: 'Address is required' })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Enter address"
                />
                {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
              </div>

              {/* Phone Number Field */}
              <div>
                <label className="block text-lg font-semibold" htmlFor="phone">Phone no:</label>
                <input
                  type="tel"
                  id="phone"
                  {...register('phone', {
                    required: 'Phone number is required',
                    pattern: { value: /^[0-9]{10}$/, message: 'Invalid phone number format' }
                  })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Enter phone number"
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="mt-4 py-2 px-6 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition"
              >
                Submit
              </button>
            </form>
          </div>

        )}
      </div>
    </>
  );
}

export default Page;
