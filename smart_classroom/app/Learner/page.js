"use client"
import React from 'react'
import Learner_nav from '../Components/Learner_nav'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setText, clearText } from '../redux/counter/counterSlice'

const page = () => {

  const dispatch = useDispatch()

  // store the id of the current user
  const user_id = useSelector(state => state.counter.text)
  console.log("user_id: ", user_id)

  //State List

  const [name, setName] = useState("")
  const [date_of_birth, setDate_of_birth] = useState("")
  const [Age, setAge] = useState(0)

  const get_Learner_details = async (data) => {
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
    get_Learner_details()
  }, [])

  return (
    <>
      <div className='flex h-full bg-green-200'>
        <div className='h-full w-1/5 border border-black rounded-xl m-2 bg-white'>
          <Learner_nav />
        </div>
        <div className='h-full w-4/5 border border-black rounded-xl m-2 bg-white'>
          <div className='w-full h-1/5 px-6 flex justify-between items-center'>
            <h1 className='font-extrabold text-3xl '>My Profile</h1>
            <button className='py-2 px-6 border border-green-600 rounded-full font-bold text-xl  hover:border-green-700 transition-all ease-in-out'>Edit</button>
          </div>
          <div className='h-4/5 flex justify-between m-4'>
            <div className="h-full">
              <ul className='h-full'>
                <li className='p-3 pt-4'>Name: {name}</li>
                <li className='p-3 pt-4'>Date of Birth: </li>
                <li className='p-3 pt-4'>Student Id: </li>
                <li className='p-3 pt-4'>Address: </li>
              </ul>
            </div>
            <Image
              className='h-40 w-32 border border-black m-10'
            // src={profilePic}
            // alt="Picture of the author"
            // width={500} automatically provided
            // height={500} automatically provided
            // blurDataURL="data:..." automatically provided
            // placeholder="blur" // Optional blur-up while loading
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default page
