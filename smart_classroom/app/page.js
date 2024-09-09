"use client"
import Image from "next/image";
import Web_logo from "./Components/Web_logo";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function Home() {

  const [islearnerlogin, setIslearnerlogin] = useState(false)
  const [IsAdminlogin, setIsAdminlogin] = useState(false)
  // const navigate = useNavigate();

  const { register, handleSubmit, errors, reset } = useForm()
    const LearnerOnSubmit = async (data) => {
        console.log(data)
        setIslearnerlogin(!islearnerlogin)
        reset()
        // navigate('/Learner')
    }
    const AdminOnSubmit = async (data) => {
        console.log(data)
        setIsAdminlogin(!IsAdminlogin)
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
            <button onClick={() => {setIsAdminlogin(!IsAdminlogin)}} className="px-4 py-2 bg-green-600 text-white font-bold rounded-full hover:bg-green-700 active:bg-green-800">Instructor's Login</button>
            <button onClick={() => {setIslearnerlogin(!islearnerlogin)}} className="px-4 py-2 bg-green-600 text-white font-bold rounded-full hover:bg-green-700 active:bg-green-800">Learner's Login</button>
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
          <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-around items-center border-green-600 bg-green-400 px-6 py-4 rounded-lg'>
            <h1 className='px-4 py-2 font-bold text-xl'>
              Learner Login
            </h1>
            <form className='flex flex-col justify-around items-start' onSubmit={handleSubmit(LearnerOnSubmit)}>
              <label htmlFor="name">First Name</label>
              <input type="text" {...register("name")} />
              <label htmlFor="email">Email</label>
              <input type="email" {...register("email")} />
              <label htmlFor="password">Password</label>
              <input type="password" {...register("password")} />
              <input className='px-6 py-2 mt-2 rounded-full bg-green-500 w-full' type="submit" value="Submit" />
            </form>
          </div>
        )}
        {/* Login form for Admin */}
        {IsAdminlogin && (
          <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-around items-center border-green-600 bg-green-400 px-6 py-4 rounded-lg'>
            <h1 className='px-4 py-2 font-bold text-xl'>
              Admin Login
            </h1>
            <form className='flex flex-col justify-around items-start' onSubmit={handleSubmit(AdminOnSubmit)}>
              <label htmlFor="name">First Name</label>
              <input type="text" {...register("name")} />
              <label htmlFor="email">Email</label>
              <input type="email" {...register("email")} />
              <label htmlFor="password">Password</label>
              <input type="password" {...register("password")} />
              <input className='px-6 py-2 mt-2 rounded-full bg-green-500 w-full' type="submit" value="Submit" />
            </form>
          </div>
        )}

      </div>
    </>
  );
}
