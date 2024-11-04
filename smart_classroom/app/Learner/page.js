// "use client"
// import React from 'react'
// import Learner_nav from '../Components/Learner_nav'
// import Image from 'next/image'
// import { useState, useEffect } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { setText, clearText } from '../redux/counter/counterSlice'

// const page = () => {

//   const dispatch = useDispatch()

//   // store the id of the current user
//   const user_id = useSelector(state => state.counter.text)
//   console.log("user_id: ", user_id)

//   //State List

//   const [name, setName] = useState("")
//   const [date_of_birth, setDate_of_birth] = useState("")
//   const [Age, setAge] = useState(0)

//   const get_Learner_details = async (data) => {
//     const response = await fetch(`http://localhost:5000/get_user_details/${user_id}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       }
//     })
//     const result = await response.json()
//     console.log(result)
//     setName(result.data.candidate_name)
//   }

//   useEffect(() => {
//     get_Learner_details()
//   }, [])

//   return (
//     <>
//       <div className='flex bg-green-200'>
//         {/* Sidebar Navigation */}
//         <div className='h-[calc(100vh-7rem)] w-1/5 border border-gray-300 rounded-xl m-4 bg-white shadow-md'>
//           <Learner_nav />
//         </div>

//         {/* Main Profile Section */}
//         <div className='h-[calc(100vh-7rem)] w-4/5 border border-gray-300 rounded-xl m-4 bg-white shadow-md flex flex-col'>
//           {/* Header Section */}
//           <div className='flex justify-between items-center p-6 border-b border-gray-300'>
//             <h1 className='font-extrabold text-3xl text-gray-800'>My Profile</h1>
//             <button className='py-2 px-6 border border-green-600 rounded-full font-bold text-xl text-green-600 hover:bg-green-600 hover:text-white transition-all ease-in-out'>
//               Edit
//             </button>
//           </div>

//           {/* Profile Details Section */}
//           <div className='flex-grow flex justify-between items-start p-6 overflow-auto'>
//             {/* Profile Information */}
//             <div className="flex-grow">
//               <ul className='space-y-4'>
//                 <li className='text-lg'><strong>Name:</strong> {name}</li>
//                 <li className='text-lg'><strong>Date of Birth:</strong> [Date]</li>
//                 <li className='text-lg'><strong>Student ID:</strong> [ID]</li>
//                 <li className='text-lg'><strong>Address:</strong> [Address]</li>
//               </ul>
//             </div>
//             {/* Profile Image */}
//             <Image
//               className='h-40 w-32 border border-gray-300 rounded-lg shadow-md'
//             // src={profilePic}
//             // alt="Profile Picture"
//             />
//           </div>
//         </div>
//       </div>

//     </>
//   )
// }

// export default page




"use client";
import React from 'react';
import Learner_nav from '../Components/Learner_nav';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Page = () => {
  const dispatch = useDispatch();

  // Store the id of the current user
  const user_id = useSelector(state => state.counter.text);
  console.log("user_id: ", user_id);

  // State List
  const [name, setName] = useState("");
  const [date_of_birth, setDate_of_birth] = useState("");
  const [age, setAge] = useState(0);
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  const get_Learner_details = async () => {
    const response = await fetch(`http://localhost:5000/get_user_details/${user_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const result = await response.json();
    console.log(result);
    setName(result.data.candidate_name);
    // Optionally, you can set other user details here
    // setDate_of_birth(result.data.date_of_birth);
    // setAge(result.data.age);
  };

  useEffect(() => {
    get_Learner_details();
  }, []);

  return (
    <>
      <div className="flex bg-gradient-to-r from-green-100 to-white flex-col lg:flex-row max-w-[1860px] mx-auto">
        <div className="h-auto lg:h-[calc(100vh-112px)] w-[calc(100vw-2rem)] lg:w-1/5 border border-gray-300 shadow-lg rounded-lg p-4 bg-white m-4">
          <Learner_nav />
        </div>
        <div className="h-[calc(100vh-225px)] lg:h-[calc(100vh-112px)] w-[calc(100vw-2rem)] lg:w-4/5 border border-gray-300 shadow-lg rounded-lg p-4 bg-white m-4 overflow-auto">
          {/* Header Section */}
          <div className='flex justify-between items-center p-6 border-b border-gray-300'>
            <h1 className='font-extrabold text-3xl text-gray-800'>My Profile</h1>
            {/* <button
              onClick={() => setIsHamburgerOpen(!isHamburgerOpen)}
              className='lg:hidden py-2 px-6 border border-green-600 rounded-full font-bold text-xl text-green-600 hover:bg-green-600 hover:text-white transition-all ease-in-out'
            >
              {isHamburgerOpen ? 'Close Menu' : 'Open Menu'}
            </button> */}
            <button className='block py-2 px-6 border border-green-600 rounded-full font-bold text-xl text-green-600 hover:bg-green-600 hover:text-white transition-all ease-in-out'>
              Edit
            </button>
          </div>

          {/* Profile Details Section */}
          <div className='flex-grow flex flex-col-reverse sm:flex-row justify-between items-start p-6 overflow-auto'>
            {/* Profile Information */}
            <div className="flex-grow">
              <ul className='space-y-4'>
                <li className='text-lg'><strong>Name:</strong> {name}</li>
                <li className='text-lg'><strong>Date of Birth:</strong> {date_of_birth || '[Date]'}</li>
                <li className='text-lg'><strong>Student ID:</strong> [ID]</li>
                <li className='text-lg'><strong>Address:</strong> [Address]</li>
              </ul>
            </div>
            {/* Profile Image */}
            <Image
              className='h-40 w-32 border border-gray-300 rounded-lg shadow-md mx-auto'
            // src={profilePic}
            // alt="Profile Picture"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
