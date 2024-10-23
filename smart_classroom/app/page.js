"use client"
import Image from "next/image";
import Web_logo from "./Components/Web_logo";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux'
import { setText, clearText } from "./redux/counter/counterSlice";

export default function Home() {

  const [islearnerlogin, setIslearnerlogin] = useState(false)
  const [IsInstructorlogin, setIsInstructorlogin] = useState(false)
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("")

  const router = useRouter()
  const dispatch = useDispatch()

  // store the id of the current user
  const user_id = useSelector(state => state.counter.text)
  console.log(user_id)
  // API Routes
  const upload_login_details = async (data) => {
    const responce = await fetch('http://localhost:5000/upload_login_details', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    // const result = await responce.json()
    // console.log(result);
    return responce
  }

  const verify_user_auth = async (data) => {
    const responce = await fetch('http://localhost:5000/verify_user_auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    // const result = await responce.json()
    // console.log(result);
    return responce
  }

  const { register, handleSubmit, errors, reset } = useForm()

  // Form Submits
  const LearnerOnSubmit = async (data) => {
    console.log({ ...data, id: uuidv4(), hasAccount: isLogin });
    let response;
  
    if (isLogin) {
      response = await verify_user_auth(data);
    } else {
      response = await upload_login_details({ ...data, id: uuidv4(), position: "Learner" });
    }
  
    const result = await response.json(); 

    if (response.status === 200) {
      setIslearnerlogin(!islearnerlogin);
      reset();
      dispatch(setText(result.account.candidate_id))
      router.push('/Learner'); 
    } else {
      setMessage(result.message || "An error occurred");
    }
  }
  
  const InstructorOnSubmit = async (data) => {
    console.log({ ...data, id: uuidv4(), hasAccount: isLogin });
    let response;
  
    if (isLogin) {
      response = await verify_user_auth(data);
    } else {
      response = await upload_login_details({ ...data, id: uuidv4(), position: "Instructor" });
    }
  
    const result = await response.json(); // Get the JSON response
  
    // Check for successful status code
    if (response.status === 200) {
      setIsInstructorlogin(!IsInstructorlogin);
      reset();
      dispatch(setText(result.account.candidate_id))
      router.push('/Instructor'); // Navigate only on success
    } else {
      // Display the error message returned from the server
      setMessage(result.message || "An error occurred");
    }
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
            <p className="text-red-600">*{message}</p>
          </div>
        )}
        {/* Login form for Instructor */}
        {IsInstructorlogin && (
          <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-around items-center border-green-600 bg-green-400 px-8 py-6 rounded-lg shadow-lg'>
            <h1 className='px-4 py-2 font-bold text-2xl mb-4 text-white'>
              {isLogin ? 'Learner Login' : 'Learner Sign Up'}
            </h1>

            <form className='flex flex-col justify-around items-start w-full' onSubmit={handleSubmit(InstructorOnSubmit)}>
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
            <p className="text-red-600">*{message}</p>
          </div>
        )}

      </div>
    </>
  );
}
