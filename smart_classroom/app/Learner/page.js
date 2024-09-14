import React from 'react'
import Learner_nav from '../Components/Learner_nav'
import Image from 'next/image'

const page = () => {
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
                <li className='p-3 pt-4'>Name: </li>
                <li className='p-3 pt-4'>Date of Birth: </li>
                <li className='p-3 pt-4'>Age: </li>
                <li className='p-3 pt-4'>No of Courses registered: </li>
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
