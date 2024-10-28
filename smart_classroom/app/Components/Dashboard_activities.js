import React from 'react'

const Dashboard_activities = (props) => {
    return (
        <div>
            <div className='w-full flex justify-around items-center'>
                <div className='font-semibold w-1/3 text-center' >{props.slno}</div>
                <div className='font-semibold w-1/3 text-center' >{props.activity}</div>
                <div className='font-semibold w-1/3 text-center' >{props.score}</div>
            </div>
        </div>
    )
}

export default Dashboard_activities
