import React from 'react'

const Course_details_card = (props) => {

    const Book02Icon = (props) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={32} height={32} color={"#000000"} fill={"none"} {...props}>
            <path d="M20.5 16.9286V10C20.5 6.22876 20.5 4.34315 19.3284 3.17157C18.1569 2 16.2712 2 12.5 2H11.5C7.72876 2 5.84315 2 4.67157 3.17157C3.5 4.34315 3.5 6.22876 3.5 10V19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M20.5 17H6C4.61929 17 3.5 18.1193 3.5 19.5C3.5 20.8807 4.61929 22 6 22H20.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M20.5 22C19.1193 22 18 20.8807 18 19.5C18 18.1193 19.1193 17 20.5 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M15 7L9 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 11L9 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );

    const Delete03Icon = (props) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={32} height={32} color={"#000000"} fill={"none"} {...props}>
            <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M9 11.7349H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M10.5 15.6543H13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M3 5.5H21M16.0555 5.5L15.3729 4.09173C14.9194 3.15626 14.6926 2.68852 14.3015 2.39681C14.2148 2.3321 14.1229 2.27454 14.0268 2.2247C13.5937 2 13.0739 2 12.0343 2C10.9686 2 10.4358 2 9.99549 2.23412C9.89791 2.28601 9.80479 2.3459 9.7171 2.41317C9.32145 2.7167 9.10044 3.20155 8.65842 4.17126L8.05273 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );

    const handleDelete = async (course,id) => {
        const responce = await fetch(`http://localhost:5000/courses/course/deleteModule/${course}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const result = await responce.json()
        console.log(result)
        // reload()
    }

    return (
        <div>
            <div className='flex justify-between items-center border-2 border-black rounded-xl m-3 px-4 py-2'>
                <div>
                    <h2 className='font-bold text-lg'>{props.module_title}</h2>
                    <p className='text-sm'>{props.module_description} . {props.content_type}</p>
                </div>
                <div className='flex gap-3'>
                    <button className='flex gap-1'>
                        <Book02Icon />
                        Read
                    </button>
                    <button onClick={()=>{handleDelete(props.course_id, props.module_id)}} className='flex gap-1'>
                        <Delete03Icon />
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Course_details_card
