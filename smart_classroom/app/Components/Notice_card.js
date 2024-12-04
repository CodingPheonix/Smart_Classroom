// import React from 'react'
// import { useState } from 'react';
// import { MdEdit } from "react-icons/md";
// import { MdDeleteForever } from "react-icons/md";

// const Notice_card = ({ heading, description, id, notice_id }) => {

//     // State list
//     const [isExpanded, setIsExpanded] = useState(false);

//     //api calls
//     const delete_notice = async (id, notice_id) => {
//         try {
//             const response = await fetch(`http://localhost:5000/delete_notice?id=${id}&notice_id=${notice_id}`, {
//                 method: 'DELETE',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             });
//             const result = await response.json();
//             console.log(result);
//         } catch (error) {
//             console.error("Failed to delete notice:", error);
//         }
//     };

//     return (
//         // <div className="m-2 p-4 border border-black rounded-xl hover:border-green-500 transition-all ease-in-out duration-150 flex items-start space-x-4">
//         //     <div className="w-5/6">
//         //         <h3 className="font-semibold text-xl py-2">{heading}</h3>
//         //         <p className="text-base whitespace-normal overflow-hidden text-ellipsis">{description}</p>
//         //     </div>
//         //     <div className="w-1/6 flex justify-end gap-2">
//         //         <button className="px-4 py-2 rounded-full bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-semibold flex gap-2">
//         //             <MdEdit />
//         //             Edit
//         //         </button>
//         //         <button
//         //             onClick={() => delete_notice(id, notice_id)}
//         //             className="px-4 py-2 rounded-full bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-semibold flex gap-2"
//         //         >
//         //             <MdDeleteForever />
//         //             Remove
//         //         </button>

//         //     </div>
//         // </div>

//         <div className="m-2 p-4 border border-gray-300 rounded-xl hover:border-green-500 transition-all ease-in-out duration-150 flex flex-col">
//             <div className="flex justify-between items-start">
//                 <div className="w-5/6">
//                     <h3 className="font-semibold text-xl py-2">{heading}</h3>
//                     <p className={`text-base ${isExpanded ? 'whitespace-normal' : 'whitespace-nowrap overflow-hidden text-ellipsis'}`}>
//                         {description}
//                     </p>
//                 </div>
//                 <div className="w-1/6 flex justify-end gap-2">
//                     <button className="px-4 py-2 rounded-full bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-semibold flex gap-2">
//                         <MdEdit />
//                         Edit
//                     </button>
//                     <button
//                         onClick={() => delete_notice(id, notice_id)}
//                         className="px-4 py-2 rounded-full bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-semibold flex gap-2"
//                     >
//                         <MdDeleteForever />
//                         Remove
//                     </button>
//                 </div>
//             </div>
//             <button
//                 onClick={() => setIsExpanded(!isExpanded)}
//                 className="mt-2 text-blue-500 underline"
//             >
//                 {isExpanded ? 'Collapse' : 'Expand'}
//             </button>
//         </div>
//     );
// };


// export default Notice_card




import React, { useState } from 'react';
import { MdEdit } from 'react-icons/md';
import { MdDeleteForever } from 'react-icons/md';
import dotenv from 'dotenv';

dotenv.config();

const NoticeCard = ({ heading, description, id, notice_id }) => {
    // State for controlling the expanded/collapsed view
    const [isExpanded, setIsExpanded] = useState(false);

    // API call to delete the notice
    const delete_notice = async (id, notice_id) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/delete_notice?id=${id}&notice_id=${notice_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error("Failed to delete notice:", error);
        }
    };

    return (
        <div className="m-2 p-4 border border-gray-300 rounded-xl hover:border-green-500 transition-all ease-in-out duration-150 flex flex-col">
            <div className="flex justify-between items-start">
                <div className="w-5/6">
                    <h3 className="font-semibold text-[clamp(1.25rem, 1.2vw + 0.75rem, 2rem)] py-2 w-3/5">
                        {heading}
                    </h3>

                    <p className={`text-base ${isExpanded ? 'whitespace-normal' : 'whitespace-nowrap overflow-hidden text-ellipsis'}`}>
                        {description}
                    </p>
                </div>
                <div className="w-1/6 flex justify-end gap-2">
                    <button className="px-4 py-2 rounded-full bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-semibold flex gap-2">
                        <MdEdit />
                        Edit
                    </button>
                    <button
                        onClick={() => delete_notice(id, notice_id)}
                        className="px-4 py-2 rounded-full bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-semibold flex gap-2"
                    >
                        <MdDeleteForever />
                        Remove
                    </button>
                </div>
            </div>
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-2 hover:text-green-500 hover:underline text-end px-4 transition-all ease-in-out duration-150"
            >
                {isExpanded ? 'Collapse' : 'Expand'}
            </button>
        </div>
    );
};

export default NoticeCard;
