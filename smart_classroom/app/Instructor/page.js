import React from 'react'
import Instructor_nav from '../Components/Instructor_nav'
import Image from 'next/image'

const page = () => {
    return (
        <>
            <div className='flex bg-green-200'>
                <div className='h-[83vh] w-1/5 border border-black rounded-xl p-2 bg-white m-1 flex-grow'>
                    <Instructor_nav />
                </div>
                <div className='min-h-full w-4/5 border border-black rounded-xl p-2 bg-white m-1'>
                    <div className='h-[50vh]'>
                        <div className='w-full h-1/5 px-6 flex justify-between items-center'>
                            <h1 className='font-extrabold text-3xl '>My Profile</h1>
                            <button className='py-2 px-6 border border-green-600 rounded-full font-bold text-xl  hover:border-green-700 transition-all ease-in-out'>Edit</button>
                        </div>
                        <div className='h-4/5 flex justify-between'>
                            <div className="h-full">
                                <ul className='h-full'>
                                    <li className='p-3 pt-4'>Name: </li>
                                    <li className='p-3 pt-4'>Title / Position: </li>
                                    <li className='p-3 pt-4'>Institution / Department: </li>
                                    <li className='p-3 pt-4'>Contact Information: </li>
                                </ul>
                            </div>
                            <Image
                                className='h-40 w-32 border border-black'
                            // src={profilePic}
                            // alt="Picture of the author"
                            // width={500} automatically provided
                            // height={500} automatically provided
                            // blurDataURL="data:..." automatically provided
                            // placeholder="blur" // Optional blur-up while loading
                            />
                        </div>
                    </div>
                    <div className='my-3'>
                        <h1 className='font-extrabold text-3xl '>About me</h1>
                        <p className='my-2'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum, tempora officia facilis quidem quis voluptate molestiae ipsum quaerat earum unde tenetur sunt accusamus obcaecati laborum harum repellendus iure. Similique, deleniti. Delectus sunt quibusdam magnam facilis quaerat praesentium voluptas tenetur? Molestias.</p>
                    </div>
                    <div className='my-3'>
                        <h1 className='font-extrabold text-3xl '>My Courses</h1>
                        <ul>
                            <li>Course 1</li>
                            <li>Course 2</li>
                            <li>Course 3</li>
                            <li>Course 4</li>
                        </ul>
                    </div>
                    <div className='my-3'>
                        <h1 className='font-extrabold text-3xl '>Achievements / Certifications</h1>
                        <ul>
                            <li>Achievement 1</li>
                            <li>Achievement 2</li>
                            <li>Achievement 3</li>
                            <li>Achievement 4</li>
                        </ul>
                    </div>
                </div>

            </div>
        </>
    )
}

export default page