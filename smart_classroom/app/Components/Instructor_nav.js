// "use client"
// import React, { useEffect, useState } from 'react'
// import Link from 'next/link'
// import { useSelector, useDispatch } from 'react-redux'

// const Instructor_nav = () => {

//     const Menu01Icon = (props) => (
//         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={32} height={32} color={"#000000"} fill={"none"} {...props}>
//             <path d="M4 5L20 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//             <path d="M4 12L20 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//             <path d="M4 19L20 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//         </svg>
//     );

//     const Cancel01Icon = (props) => (
//         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={32} height={32} color={"#000000"} fill={"none"} {...props}>
//             <path d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//         </svg>
//     );

//     const user_id = useSelector(state => state.counter.text)

//     const [name, setName] = useState("")
//     const [is_hamburgered, setIs_hamburgered] = useState(false)

//     const get_instructor_details = async (data) => {
//         const response = await fetch(`http://localhost:5000/get_user_details/${user_id}`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             }
//         })
//         const result = await response.json()
//         console.log(result)
//         setName(result.data.candidate_name)
//     }

//     useEffect(() => {
//         get_instructor_details()
//     }, [])


//     return (
//         <div className='h-full p-2 flex flex-col justify-around'>
//             <h1 className='font-bold text-2xl h-1/5 grid place-items-center'>
//                 Hi "{name}",
//             </h1>
//             <div className='flex justify-start h-3/5'>
//                 <ul className='text-lg p-2 '>
//                     <Link href="Instructor"><li className='hover:underline hover:cursor-pointer hover:scale-110 hover:translate-x-5 transition-all ease-in-out py-2 px-3 rounded-2xl hover:bg-green-100'>About Me</li></Link>
//                     <Link href="Instructor_courses"><li className='hover:underline hover:cursor-pointer hover:scale-110 hover:translate-x-5 transition-all ease-in-out py-2 px-3 rounded-2xl hover:bg-green-100'>Courses</li></Link>
//                     <Link href="Instructor_notice"><li className='hover:underline hover:cursor-pointer hover:scale-110 hover:translate-x-5 transition-all ease-in-out py-2 px-3 rounded-2xl hover:bg-green-100'>Notice</li></Link>
//                 </ul>
//             </div>
//             <div className='h-1/5 grid place-items-center'>
//                 <button className='w-full text-lg font-bold py-2 px-4 rounded-full bg-green-200 hover:cursor-pointer active:bg-green-300 hover:border-green-600 hover:border transition-all ease-in-out'>Sign out</button>
//             </div>
//         </div>
//     )
// }

// export default Instructor_nav




"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';

const Instructor_nav = () => {
    const Menu01Icon = (props) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={32} height={32} color={"#000000"} fill={"none"} {...props}>
            <path d="M4 5L20 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 12L20 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 19L20 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );

    const Cancel01Icon = (props) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={32} height={32} color={"#000000"} fill={"none"} {...props}>
            <path d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );

    const user_id = useSelector(state => state.counter.text);
    const [name, setName] = useState("");
    const [is_hamburgered, setIs_hamburgered] = useState(false);

    const get_instructor_details = async () => {
        const response = await fetch(`http://localhost:5000/get_user_details/${user_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const result = await response.json();
        setName(result.data.candidate_name);
    };

    useEffect(() => {
        get_instructor_details();
    }, []);

    return (
        <div className='relative p-2 flex flex-col'>
            {/* Header Section */}
            <div className='flex justify-between items-center'>
                <h1 className='font-bold text-2xl'>
                    Hi "{name}",
                </h1>
                <button onClick={() => setIs_hamburgered(!is_hamburgered)} className='lg:hidden'>
                    {is_hamburgered ? <Cancel01Icon /> : <Menu01Icon />}
                </button>
            </div>

            {/* Sidebar Menu for Small Screens */}
            <div className={`absolute top-0 left-0 h-[calc(100vh-10rem)] bg-white w-64 shadow-lg transition-transform transform ${is_hamburgered ? 'translate-x-0' : '-translate-x-full'} lg:hidden`}>
                <div className='flex flex-col h-full'>
                    <ul className='text-lg p-4 flex-grow'>
                        <Link href="Instructor">
                            <li className='hover:underline hover:cursor-pointer hover:scale-110 hover:translate-x-5 transition-all ease-in-out py-2 px-3 rounded-2xl hover:bg-green-100'>About Me</li>
                        </Link>
                        <Link href="Instructor_courses">
                            <li className='hover:underline hover:cursor-pointer hover:scale-110 hover:translate-x-5 transition-all ease-in-out py-2 px-3 rounded-2xl hover:bg-green-100'>Courses</li>
                        </Link>
                        <Link href="Instructor_notice">
                            <li className='hover:underline hover:cursor-pointer hover:scale-110 hover:translate-x-5 transition-all ease-in-out py-2 px-3 rounded-2xl hover:bg-green-100'>Notice</li>
                        </Link>
                    </ul>
                    {/* Sign Out Button in Sidebar */}
                    <div className='p-4'>
                        <button className='w-full text-lg font-bold py-2 px-4 rounded-full bg-green-200 hover:cursor-pointer active:bg-green-300 hover:border-green-600 hover:border transition-all ease-in-out'>Sign out</button>
                    </div>
                </div>
            </div>

            {/* Navigation Menu for Larger Screens */}
            <nav className='hidden lg:flex flex-col w-full h-[calc(100vh-10rem)]  p-4'>
                <ul className='text-lg'>
                    <Link href="Instructor">
                        <li className='hover:underline hover:cursor-pointer hover:scale-110 hover:translate-x-5 transition-all ease-in-out py-2 px-3 rounded-2xl hover:bg-green-100'>About Me</li>
                    </Link>
                    <Link href="Instructor_courses">
                        <li className='hover:underline hover:cursor-pointer hover:scale-110 hover:translate-x-5 transition-all ease-in-out py-2 px-3 rounded-2xl hover:bg-green-100'>Courses</li>
                    </Link>
                    <Link href="Instructor_notice">
                        <li className='hover:underline hover:cursor-pointer hover:scale-110 hover:translate-x-5 transition-all ease-in-out py-2 px-3 rounded-2xl hover:bg-green-100'>Notice</li>
                    </Link>
                </ul>
                {/* Sign Out Button for Larger Screens */}
                <div className='mt-4'>
                    <button className='w-full text-lg font-bold py-2 px-4 rounded-full bg-green-200 hover:cursor-pointer active:bg-green-300 hover:border-green-600 hover:border transition-all ease-in-out'>Sign out</button>
                </div>
            </nav>
        </div>
    );
};

export default Instructor_nav;
