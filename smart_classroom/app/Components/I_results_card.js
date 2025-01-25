import React from 'react'

const I_results_card = ({ image, name, achieved_score, registered_course, total_score, total_reading_time, modules_completed }) => {
    return (
        <>
            <div className="flex items-center justify-center bg-gray-100">
                <div className=" bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="relative h-48">
                        <img
                            src={`${image}`}
                            alt="Student Picture"
                            className="object-cover w-full h-full"
                        />
                    </div>

                    <div className="p-4">
                        <h2 className="text-lg font-semibold text-gray-800">{name}</h2>

                        <div className="mt-2 text-sm text-gray-600 space-y-1">
                            <p><span className="font-medium text-gray-700">Registered Course:</span> {registered_course}</p>
                            <p><span className="font-medium text-gray-700">Marks Achieved:</span> {achieved_score}</p>
                            <p><span className="font-medium text-gray-700">Total Score:</span> {total_score}</p>
                            <p><span className="font-medium text-gray-700">Total Reading Time:</span> {total_reading_time}</p>
                            <p><span className="font-medium text-gray-700">Modules Completed:</span> {modules_completed}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default I_results_card
