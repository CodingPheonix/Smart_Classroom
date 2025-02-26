import React from 'react'
import Link from 'next/link';

const View_course_details_card = (props) => {

    const Book02Icon = (props) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={32} height={32} color={"#000000"} fill={"none"} {...props}>
            <path d="M20.5 16.9286V10C20.5 6.22876 20.5 4.34315 19.3284 3.17157C18.1569 2 16.2712 2 12.5 2H11.5C7.72876 2 5.84315 2 4.67157 3.17157C3.5 4.34315 3.5 6.22876 3.5 10V19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M20.5 17H6C4.61929 17 3.5 18.1193 3.5 19.5C3.5 20.8807 4.61929 22 6 22H20.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M20.5 22C19.1193 22 18 20.8807 18 19.5C18 18.1193 19.1193 17 20.5 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M15 7L9 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 11L9 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );

    return (
        <div className="w-[14rem] h-[16rem] mx-auto border-2 border-black rounded-xl shadow-lg m-3 p-4 bg-white transition-transform duration-300 hover:scale-105 hover:shadow-2xl active:scale-95 active:shadow-lg">
            <div className="flex flex-col justify-center items-center h-full">
                <h2 className="font-extrabold text-2xl text-center text-green-700 mb-2">
                    {props.module_title}
                </h2>
                <p className="text-gray-600 text-base text-center mb-2">
                    {props.module_description}
                </p>
                <p className="text-sm text-gray-500 italic text-center">
                    {props.content_type}
                </p>
            </div>
        </div>

    )
}

export default View_course_details_card
