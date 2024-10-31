import React from 'react'

const Notice_card = ({ heading, description }) => {
    return (
        <div className="m-2 p-4 border border-black rounded-xl hover:border-green-500 transition-all ease-in-out duration-150 flex items-start space-x-4">
            <div className="w-5/6">
                <h3 className="font-semibold text-xl">{heading}</h3>
                <p className="text-base whitespace-normal overflow-hidden text-ellipsis">{description}</p>
            </div>
            <div className="w-1/6 flex justify-end gap-2">
                <button className="px-4 py-2 rounded-full bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-semibold">
                    Edit
                </button>
                <button className="px-4 py-2 rounded-full bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-semibold">
                    Remove
                </button>
            </div>
        </div>
    );
};


export default Notice_card