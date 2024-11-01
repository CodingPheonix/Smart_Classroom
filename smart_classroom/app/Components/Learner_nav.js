import React from 'react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'

const Learner_nav = () => {

    const user_id = useSelector(state => state.counter.text)

    const [name, setName] = useState("")

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
        <div className='h-full p-2 flex flex-col justify-around'>
            <h1 className='font-bold text-2xl h-1/5 grid place-items-center'>
                Hi {name},
            </h1>
            <div className='flex justify-start h-3/5'>
                <ul className='text-lg p-2 '>
                    <Link href="/Learner"><li className='hover:underline hover:cursor-pointer hover:scale-110 hover:translate-x-5 transition-all ease-in-out py-2 px-3 rounded-2xl hover:bg-green-100'>About Me</li></Link>
                    <Link href="Learner_courses"><li className='hover:underline hover:cursor-pointer hover:scale-110 hover:translate-x-5 transition-all ease-in-out py-2 px-3 rounded-2xl hover:bg-green-100'>Courses</li></Link>
                    <Link href="Learner_Mycourses"><li className='hover:underline hover:cursor-pointer hover:scale-110 hover:translate-x-5 transition-all ease-in-out py-2 px-3 rounded-2xl hover:bg-green-100'>My Courses</li></Link>
                    <Link href="Learner_dashboard"><li className='hover:underline hover:cursor-pointer hover:scale-110 hover:translate-x-5 transition-all ease-in-out py-2 px-3 rounded-2xl hover:bg-green-100'>Dashboard</li></Link>
                    <Link href="Learner_notice"><li className='hover:underline hover:cursor-pointer hover:scale-110 hover:translate-x-5 transition-all ease-in-out py-2 px-3 rounded-2xl hover:bg-green-100'>Notice Board</li></Link>
                </ul>
            </div>
            <div className='h-1/5 grid place-items-center'>
                <button className='w-full text-lg font-bold py-2 px-4 rounded-full bg-green-200 hover:cursor-pointer active:bg-green-300 hover:border-green-600 hover:border transition-all ease-in-out'>Sign out</button>
            </div>
        </div>
    )
}

export default Learner_nav
