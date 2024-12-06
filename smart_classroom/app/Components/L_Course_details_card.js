import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux'
import dotenv from 'dotenv';

dotenv.config();

const L_Course_details_card = (props) => {

    const user_id = useSelector(state => state.counter.text)

    // State List 
    const [isMark, setIsMark] = useState(false)

    // useEffects
    useEffect(() => {
      setIsMark(props.mark)
    }, [props.mark])
    

    //API Calls
    // const get_mark = async () => {
    //     const response = await fetch(`http://localhost:5000/get_mark/${user_id}/${props.module_id}`, {
    //       method: 'GET',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     })
    //     const result = await response.json()
    //     console.log(result.data);
    //     setIsMark(result.data)   
    //   }

    const Book02Icon = (props) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={32} height={32} color={"#000000"} fill={"none"} {...props}>
            <path d="M20.5 16.9286V10C20.5 6.22876 20.5 4.34315 19.3284 3.17157C18.1569 2 16.2712 2 12.5 2H11.5C7.72876 2 5.84315 2 4.67157 3.17157C3.5 4.34315 3.5 6.22876 3.5 10V19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M20.5 17H6C4.61929 17 3.5 18.1193 3.5 19.5C3.5 20.8807 4.61929 22 6 22H20.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M20.5 22C19.1193 22 18 20.8807 18 19.5C18 18.1193 19.1193 17 20.5 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M15 7L9 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 11L9 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );

    const CheckmarkSquare03Icon = (props) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={32} height={32} color={"#000000"} fill={"none"} {...props}>
            <path d="M21.4477 8.2C21.5 9.25014 21.5 10.4994 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C13.0719 2.5 14.0156 2.5 14.85 2.51908" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M8 11.5C8 11.5 9.5 11.5 11.5 15C11.5 15 16.5588 5.83333 21.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );

    const SquareIcon = (props) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={32} height={32} color={"#000000"} fill={"none"} {...props}>
            <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    );

    return (
        <div>
            <div className='flex justify-between items-center border-2 border-black rounded-xl m-3 px-4 py-2'>
                <div>
                    <h2 className='font-bold text-lg'>{props.module_title}</h2>
                    <p className='text-sm'>{props.module_description} . {props.content_type}</p>
                </div>
                <div className='flex gap-3'>
                    <Link href={`/L_Module_theory/${props.module_id}@${props.course_id}`}>
                        <button className='flex gap-1'>
                            <Book02Icon />
                            Read
                        </button>
                    </Link>
                    <button
                        className="flex gap-1"
                    >
                        {isMark ? <CheckmarkSquare03Icon /> : <SquareIcon />}
                        Mark as Read
                    </button>

                </div>
            </div>
        </div>
    )
}

export default L_Course_details_card
