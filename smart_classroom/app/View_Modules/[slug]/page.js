"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useForm, useFieldArray } from 'react-hook-form';
import { analytics } from '../../Firebase/firebase-config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import Para_courses from '../../Components/Para_courses';
import File_card from '../../Components/File_card.js';

const Page = ({ params }) => {
    const module_id = params.slug.split('%40')[0];
    const course_id = params.slug.split('%40')[1];

    // State List
    const [module_data, setModule_data] = useState({});
    const [addFile, setAddFile] = useState(false);
    const [addParagraph, setAddParagraph] = useState(false);
    const [parapageData, setparaPageData] = useState([]);
    const [file_upload, setFile_upload] = useState(null)
    const [fileList, setFileList] = useState([])
    const [deletefile, setDeletefile] = useState(false)
    const [questions, setQuestions] = useState([
        { question: '', options: ['', '', '', ''], correctAnswer: '' }
    ]);

    const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
        defaultValues: {
            questions: [{ question: '', options: ['', '', '', ''], correctAnswer: '' }]
        }
    });

    const { fields: questionFields, append: appendQuestion, replace: replaceQuestions } = useFieldArray({
        control,
        name: 'questions'
    });

    const get_parapagedata = async () => {
        const responce = await fetch(`http://localhost:5000/getparapagedata/${module_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const result = await responce.json()
        console.log(result)
        console.log(result.data);

        // Map the fetched data to the expected format for Para_courses
        const formattedData = result.data.map(item => ({
            heading: item.theory_heading,
            explanation: item.theory_explanation
        }));

        // Update the state with the formatted data
        setparaPageData(formattedData);
    }

    const post_files = async (fileList) => {
        const response = await fetch(`http://localhost:5000/post_files/${module_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fileList),
        })
        const result = await response.json()
        console.log(result)
    };

    const handleModuleSubmit = async (data) => {
        console.log(data);

        const responce = await fetch(`http://localhost:5000/courses/course/module/${module_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        const result = await responce.json()
        console.log(result);

        await post_files(fileList);
    }

    const get_files = async (data) => {
        const response = await fetch(`http://localhost:5000/get_files/${module_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const result = await response.json()
        console.log(result)
        setFileList(result.data)
    };

    //get quiz details
    const get_quiz_details = async (data) => {
        const responce = await fetch(`http://localhost:5000/get_quiz_data/${module_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const result = await responce.json()
        console.log(result);

        if (result.data) {
            const formattedQuestions = result.data.map((q) => ({
                question: q.question_title,
                options: q.options,
                correctAnswer: q.correct_option // Or index if needed
            }));

            // Use `replace` to update the `useFieldArray` with new questions
            replaceQuestions(formattedQuestions);
        }

    }

    // Function to delete a specific file
    const handleFileDelete = (index) => {
        const updatedFiles = fileList.filter((_, i) => i !== index);
        setFileList(updatedFiles);
    };

    // Fetch List
    const get_module_data = async () => {
        const response = await fetch(`http://localhost:5000/courses/course/module/${course_id}/${module_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const result = await response.json();
        setModule_data(result.data);
    };

    // More functions (e.g., get_parapagedata, get_quiz_details, handleModuleSubmit, etc.) remain unchanged.

    // UseEffects
    useEffect(() => {
        get_module_data();
        get_parapagedata();
        get_quiz_details();
        get_files()
    }, []);

    return (
        <div>
            <div className="max-w-5xl min-h-[calc(100vh-7rem)] mx-auto mt-5 p-6 bg-gray-100 rounded-lg shadow-md">
                {module_data.content_type === "Content" ? (
                    <div>
                        <div className="relative">
                            <h1 className="text-3xl font-bold text-center text-green-600">{module_data.module_title}</h1>
                            {/* Render Lesson List */}
                            {parapageData.length > 0 ? (
                                parapageData.map((data, index) => (
                                    <Para_courses key={index} heading={data.heading} paragraph={data.explanation} />
                                ))
                            ) : (
                                <p className="grid place-items-center">No data available</p>
                            )}

                            {/* Render file list with delete mode */}
                            {fileList.length > 0 ? (
                                <div className="flex flex-wrap gap-4">
                                    {fileList.map((file, index) => (
                                        <div
                                            key={index}
                                            className={`p-2`}
                                        >
                                            <File_card fileName={file.name} />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center text-gray-500">No files available</p>
                            )}

                            <div className='h-36'></div>
                        </div>
                    </div>
                ) : (
                    // Quiz setting section
                    <div className="min-h-screen bg-green-50 p-8">
                        {/* Quiz Form */}
                    </div>
                )}
            </div>
            {/* Forms for adding paragraph and files */}
        </div>
    );
};

export default Page;
