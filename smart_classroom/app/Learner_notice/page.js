"use client"
import React, { useEffect, useState } from 'react'
import Learner_nav from '../Components/Learner_nav'
import L_notice_card from '../Components/L_notice_card'

const page = () => {

  //State list
  const [notice_list, setNotice_list] = useState([])

  //API calls
  const get_notices = async (data) => {
    const response = await fetch(`http://localhost:5000/get_all_notices`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const result = await response.json()
    console.log(result)

    const list = result.data;

    const new_list = await Promise.all(
      list.map(async (item) => {
        const instructor = await get_instructor(item.instructor_id);
        return item.notices.map((notice) => ({
          instructor_name: instructor,
          heading: notice.heading,
          description: notice.description,
        }));
      })
    );
    const flattened_list = new_list.flat();
    setNotice_list(flattened_list)
  };

  const get_instructor = async (data) => {
    console.log(data)
    const response = await fetch(`http://localhost:5000/get_instructor/${data}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const result = await response.json()
    console.log(result)
    return result.data
  };


  //useEffect
  useEffect(() => {
    get_notices()
  }, [])

  return (
    <div className="flex bg-gradient-to-r from-green-100 to-white flex-col lg:flex-row max-w-[1860px] mx-auto">
      <div className="h-auto lg:h-[calc(100vh-112px)] w-[calc(100vw-2rem)] lg:w-1/5 border border-gray-300 shadow-lg rounded-lg p-4 bg-white m-4">
        <Learner_nav />
      </div>
      <div className="h-[calc(100vh-225px)] lg:h-[calc(100vh-112px)] w-[calc(100vw-2rem)] lg:w-4/5 border border-gray-300 shadow-lg rounded-lg p-4 bg-white m-4 overflow-auto">
        <div className='min-h-[calc(100vh-5rem)] border-2 border-black rounded-3xl m-3'>
          <h2 className='text-center font-bold text-3xl py-2'>NOTICE BOARD</h2>
          <div className='h-[1px] bg-black mt-3'></div>
          <div>
            {
              notice_list.map((item, index) => {
                return (
                  <L_notice_card key={index} instructor_name={item.instructor_name} heading={item.heading} description={item.description} />
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
