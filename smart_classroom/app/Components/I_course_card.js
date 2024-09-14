import React from 'react'

const I_course_card = (props) => {
    return (
        <div>
            <ul className='m-4 p-2 flex justify-around items-center border border-green-700 rounded-full font-bold'>
                <li>{props.courseTitle}</li>
                <li>{props.courseCategory}</li>
                <li>{props.courseDuration}</li>
            </ul>
        </div>
    )
}

export default I_course_card
