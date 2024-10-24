"use client";
import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import Para_courses from '../../Components/Para_courses';

const Page = ({ params }) => {
    const module_id = params.slug.split('%40')[0];
    const course_id = params.slug.split('%40')[1];

    // State List
    const [module_data, setModule_data] = useState({});
    const [addFile, setAddFile] = useState(false);
    const [addParagraph, setAddParagraph] = useState(false);
    const [parapageData, setparaPageData] = useState([]);
    const [questions, setQuestions] = useState([
        { question: '', options: ['', '', '', ''], correctAnswer: '' }
    ]);

    // Useform and Usefield array
    const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
        defaultValues: {
            questions: [{ question: '', options: ['', '', '', ''], correctAnswer: '' }]
        }
    });

    const { fields: questionFields, append: appendQuestion, replace: replaceQuestions } = useFieldArray({
        control,
        name: 'questions'
    });

    // Fetch List
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
    }

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

    // Post quiz questions to db
    const post_quiz_data = async (data) => {
        const responce = await fetch(`http://localhost:5000/post_quiz_data/${module_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        const result = await responce.json()
        console.log(result);
    }

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

    const handle_delete_quiz = async () => {
        const response = await fetch(`http://localhost:5000/handle_delete_quiz/${module_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const result = await response.json()
        console.log(result);
    }

    //UseEffects
    useEffect(() => {
        get_module_data();
        get_parapagedata();
        get_quiz_details();
    }, []);

    // Functions
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

    //submit Quiz data
    const onSubmit = (data) => {
        console.log(data.questions); // Handle form submission
        post_quiz_data(data.questions)
        // reset()
    };

    return (
        <div>
            <div className="max-w-5xl min-h-[calc(100vh-7rem)] mx-auto mt-5 p-6 bg-gray-100 rounded-lg shadow-md">
                {module_data.content_type === "Content" ? (
                    <div>
                        <div className="relative pt-16"> {/* Add top padding to the container */}
                            <h1 className="text-3xl font-bold text-center text-green-600">{module_data.module_title}</h1>
                            <div className="btn absolute top-2 right-20 flex gap-2"> {/* Set top to a positive value */}
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

                            {parapageData.length > 0 ? (
                                parapageData.map((data, index) => (
                                    <Para_courses key={index} heading={data.heading} paragraph={data.explanation} />
                                ))
                            ) : (
                                <p className="grid place-items-center">No data available</p>
                            )}
                        </div>



                        {/* submit the format */}
                        <div className="absolute left-1/2 bottom-20 transform -translate-x-1/2">
                            <button onClick={() => handleModuleSubmit(parapageData)} className="py-2 px-4 rounded-full bg-green-400 text-white">Submit</button>
                        </div>

                    </div>
                ) : (
                    // Section for the quiz setting

                    <div className="min-h-screen bg-green-50 p-8">
                        <div className='flex justify-between items-center'>
                            <h1 className="text-3xl font-bold text-green-700 mb-6">Create Quiz</h1>
                            <button onClick={handle_delete_quiz} className='px-4 py-2 rounded-full border border-green-400 bg-white hover:text-green-500 text-black hover:border-green-600 font-semibold mb-6'>Delete All</button>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {questionFields.map((question, qIndex) => (
                                <div key={question.id} className="mb-8 p-6 bg-white shadow rounded-lg">
                                    <div className="mb-4">
                                        <div className='flex justify-between'>
                                            <label className="block text-green-700 font-medium">Question {qIndex + 1}</label>
                                            <p className='text-green-300'>Select the correct option</p>
                                        </div>
                                        <input
                                            type="text"
                                            {...register(`questions.${qIndex}.question`)}
                                            className="w-full mt-2 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
                                            placeholder="Enter your question"
                                        />
                                    </div>

                                    <div>
                                        {question.options.map((_, oIndex) => (
                                            <div key={oIndex} className="flex items-center mb-2">
                                                <input
                                                    type="radio"
                                                    {...register(`questions.${qIndex}.correctAnswer`)}
                                                    value={oIndex}
                                                    className="mr-2"
                                                />
                                                <input
                                                    type="text"
                                                    {...register(`questions.${qIndex}.options.${oIndex}`)}
                                                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
                                                    placeholder={`Option ${oIndex + 1}`}
                                                />
                                            </div>
                                        ))}

                                        <button
                                            type="button"
                                            onClick={() => {
                                                questionFields[qIndex].options.push('');
                                                reset();
                                            }}
                                            className="mt-2 text-green-700 font-medium hover:text-green-900"
                                        >
                                            + Add Option
                                        </button>
                                    </div>
                                </div>
                            ))}

                            <button
                                type="button"
                                onClick={() => appendQuestion({ question: '', options: ['', '', '', ''], correctAnswer: '' })}
                                className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
                            >
                                + Add Question
                            </button>

                            <button
                                type="submit"
                                className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                            >
                                Submit Quiz
                            </button>
                        </form>
                    </div>
                )}

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