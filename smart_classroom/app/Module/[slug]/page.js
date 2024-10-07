"use client";
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Para_courses from '@/app/Components/Para_courses';

const Page = ({ params }) => {
    const module_id = params.slug.split('%40')[0];
    const course_id = params.slug.split('%40')[1];

    const [module_data, setModule_data] = useState({});
    const [addFile, setAddFile] = useState(false);
    const [addParagraph, setAddParagraph] = useState(false);
    const [parapageData, setparaPageData] = useState([])

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const get_module_data = async () => {
        const response = await fetch(`http://localhost:5000/courses/course/module/${course_id}/${module_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const result = await response.json();
        console.log(result.data);
        setModule_data(result.data);
    };

    useEffect(() => {
        get_module_data();
    }, []);

    const paragraphSubmit = (data) => {
        console.log(data);
        setparaPageData((prev) => [
            ...prev,
            { type: 'paragraph', heading: data.heading, explanation: data.explanation }
        ]);
        console.log(parapageData);

        reset();
        setAddParagraph(false);
    };

    const onSubmitFile = (data) => {
        console.log(data);
        reset()
        setAddFile(false)
    }

    return (
        <div>
            <div className="max-w-5xl min-h-[calc(100vh-7rem)] mx-auto mt-5 p-6 bg-gray-100 rounded-lg shadow-md">
                <div className="relative">
                    <h1 className="text-3xl font-bold text-center text-green-600">{module_data.module_title}</h1>
                    <div className="btn absolute top-3 right-20 flex gap-2">
                        <button
                            onClick={() => setAddParagraph(!addParagraph)}
                            className="px-4 py-2 rounded-full bg-green-400 text-white font-semibold">
                            Add Text
                        </button>
                        <button
                            onClick={() => setAddFile(!addFile)}
                            className="px-4 py-2 rounded-full bg-green-400 text-white font-semibold">
                            Add Files
                        </button>
                    </div>
                </div>

                {parapageData.length > 0 ? (
                    parapageData.map((data, index) => (
                        <Para_courses key={index} heading={data.heading} paragraph={data.explanation} />
                    ))
                ) : (
                    <p className='grid place-items-center'>No data available</p>
                )}

                <div className="materials">
                    <input type="file" />
                </div>
            </div>

            {/* Form to Add paragraph in the Module */}
            {addParagraph && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
                        <h2 className="text-lg font-bold mb-4 text-green-600">Add Paragraph</h2>
                        <form onSubmit={handleSubmit(paragraphSubmit)}>
                            <label htmlFor="heading" className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
                            <input
                                type="text"
                                {...register("heading", { required: true })}
                                className="border border-gray-300 rounded-md p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            {errors.heading && <p className="text-red-500 text-sm">Heading is required</p>}

                            <label htmlFor="explanation" className="block text-sm font-medium text-gray-700 mb-1">Explanation</label>
                            <textarea
                                {...register("explanation", { required: true })}
                                className="border border-gray-300 rounded-md p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                                rows="4"
                                placeholder="Enter your explanation here..."
                            ></textarea>

                            {errors.explanation && <p className="text-red-500 text-sm">Explanation is required</p>}

                            <input
                                type="submit"
                                value="Submit"
                                className="w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 transition duration-200"
                            />
                        </form>
                    </div>
                </div>
            )}
            {/* Form to add Files in the Module */}
            {addFile && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
                        <h2 className="text-lg font-bold mb-4 text-green-600">Add Files</h2>
                        <form onSubmit={onSubmitFile}>
                            <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-1">Select Files</label>
                            <input
                                type="file"
                                name="file"
                                multiple
                                className="border border-gray-300 rounded-md p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />

                            <input
                                type="submit"
                                value="Upload"
                                className="w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 transition duration-200"
                            />
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Page;
