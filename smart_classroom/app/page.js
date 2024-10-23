"use client"
import Image from "next/image";
import Web_logo from "./Components/Web_logo";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

export default function Home() {

  const [islearnerlogin, setIslearnerlogin] = useState(false)
  const [IsInstructorlogin, setIsInstructorlogin] = useState(false)
  const [isLogin, setIsLogin] = useState(true);
  // const navigate = useNavigate();

  // API Routes
  const upload_login_details = async (data) => {
    const responce = await fetch('http://localhost:5000/upload_login_details', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    const result = await responce.json()
    console.log(result);
  }

  const verify_user_auth = async (data) => {
    const responce = await fetch('http://localhost:5000/verify_user_auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    const result = await responce.json()
    console.log(result);
  }

  const { register, handleSubmit, errors, reset } = useForm()

  // Form Submits
  const LearnerOnSubmit = async (data) => {
    console.log({ ...data, id: uuidv4(), hasAccount: isLogin })

    if (isLogin) {
      await verify_user_auth(data)
    }else{
      await upload_login_details({ ...data, id: uuidv4()})
    }
    setIslearnerlogin(!islearnerlogin)
    reset()
    // navigate('/Learner')
  }
  const InstructorOnSubmit = async (data) => {
    console.log({ ...data, id: uuidv4() })
    upload_login_details({ ...data, id: uuidv4() })
    setIsInstructorlogin(!IsInstructorlogin)
    reset()
    // navigate('/Learner')
  }

  return (
    <>
      <div className="h-full">
        {/* <Learner_login /> */}
        <div className="first_section flex flex-col justify-evenly items-center h-2/3 bg-green-200">
          <div className="text-5xl">
            <Web_logo />
          </div>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, reprehenderit?
          </div>
          <div className="buttons flex justify-around items-center gap-3">
            <button onClick={() => { setIsInstructorlogin(!IsInstructorlogin) }} className="px-4 py-2 bg-green-600 text-white font-bold rounded-full hover:bg-green-700 active:bg-green-800">Instructor's Login</button>
            <button onClick={() => { setIslearnerlogin(!islearnerlogin) }} className="px-4 py-2 bg-green-600 text-white font-bold rounded-full hover:bg-green-700 active:bg-green-800">Learner's Login</button>
          </div>
        </div>
        <div className="partition h-1 bg-green-400"></div>
        <div className="second_section flex flex-col justify-evenly items-center h-2/3 bg-green-200">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, ipsa!
        </div>
        <div className="partition h-1 bg-green-400"></div>
        <div className="third_section flex flex-col justify-evenly items-center h-2/3 bg-green-200">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, ipsa!
        </div>

        {/* Login form for LEARNER */}
        {islearnerlogin && (
          // <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-around items-center border-green-600 bg-green-400 px-6 py-4 rounded-lg'>
          //   <h1 className='px-4 py-2 font-bold text-xl'>
          //     Learner Login
          //   </h1>
          //   <form className='flex flex-col justify-around items-start' onSubmit={handleSubmit(LearnerOnSubmit)}>
          //     <label htmlFor="name">First Name</label>
          //     <input type="text" {...register("name", { required: true })} />
          //     <label htmlFor="email">Email</label>
          //     <input type="email" {...register("email", { required: true })} />
          //     <label htmlFor="password">Password</label>
          //     <input type="password" {...register("password", { required: true })} />
          //     {/* <Link href="/Learner"> */}
          //       <input className='px-6 py-2 mt-2 rounded-full bg-green-500 w-full' type="submit" value="Submit" />
          //     {/* </Link> */}
          //   </form>
          // </div>

          <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-around items-center border-green-600 bg-green-400 px-8 py-6 rounded-lg shadow-lg'>
            <h1 className='px-4 py-2 font-bold text-2xl mb-4 text-white'>
              {isLogin ? 'Learner Login' : 'Learner Sign Up'}
            </h1>

            <form className='flex flex-col justify-around items-start w-full' onSubmit={handleSubmit(LearnerOnSubmit)}>
              {!isLogin && (
                <>
                  <label className='text-white' htmlFor="name">Name</label>
                  <input
                    className='px-4 py-2 mb-2 w-full rounded-lg'
                    type="text"
                    {...register("name", { required: !isLogin })}
                  />
                </>
              )}

              <label className='text-white' htmlFor="email">Email</label>
              <input
                className='px-4 py-2 mb-2 w-full rounded-lg'
                type="email"
                {...register("email", { required: true })}
              />

              <label className='text-white' htmlFor="password">Password</label>
              <input
                className='px-4 py-2 mb-2 w-full rounded-lg'
                type="password"
                {...register("password", { required: true })}
              />

              <input
                className='px-6 py-2 mt-2 rounded-full bg-green-500 text-white font-semibold w-full hover:bg-green-600 transition duration-300'
                type="submit"
                value={isLogin ? 'Login' : 'Sign Up'}
              />
            </form>

            <p className='text-white mt-4'>
              {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
              <span
                onClick={() => setIsLogin(!isLogin)}
                className='underline cursor-pointer hover:text-gray-300 transition duration-300'>
                {isLogin ? 'Sign Up' : 'Login'}
              </span>
            </p>
          </div>
        )}
        {/* Login form for Instructor */}
        {IsInstructorlogin && (
          <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-around items-center border-green-600 bg-green-400 px-6 py-4 rounded-lg'>
            <h1 className='px-4 py-2 font-bold text-xl'>
              Instructor Login
            </h1>
            <form className='flex flex-col justify-around items-start' onSubmit={handleSubmit(InstructorOnSubmit)}>
              <label htmlFor="name">First Name</label>
              <input type="text" {...register("name")} />
              <label htmlFor="email">Email</label>
              <input type="email" {...register("email")} />
              <label htmlFor="password">Password</label>
              <input type="password" {...register("password")} />
              {/* <Link href="Instructor"> */}
              <input className='px-6 py-2 mt-2 rounded-full bg-green-500 w-full' type="submit" value="Submit" />
              {/* </Link> */}
            </form>
          </div>
        )}

      </div>
    </>
  );
}
