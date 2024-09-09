"use client"
import React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const Learner_login = () => {
    const [result, setResult] = useState({})

    const { register, handleSubmit, errors } = useForm()
    const onSubmit = async (data) => {
        console.log(data)
        setResult(data)
    }


    return (
        <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-around items-center border-green-600 bg-green-400 px-6 py-4 rounded-lg'>
            <h1 className='px-4 py-2 font-bold text-xl'>
                Learner Login
            </h1>
            <form className='flex flex-col justify-around items-start' onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="name">First Name</label>
                <input type="text" {...register("name")} />
                <label htmlFor="email">Email</label>
                <input type="email" {...register("email")} />
                <label htmlFor="password">Password</label>
                <input type="password" {...register("password")} />
                <input className='px-6 py-2 mt-2 rounded-full bg-green-500 w-full' type="submit" value="Submit" />
            </form>
        </div>
    )
}
export default Learner_login
