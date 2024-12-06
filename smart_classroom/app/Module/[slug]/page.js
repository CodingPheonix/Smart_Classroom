// // "use client";
// // import React, { useState, useEffect } from 'react';
// // import Link from 'next/link';

// // import { useForm, useFieldArray } from 'react-hook-form';
// // import { analytics } from '../../Firebase/firebase-config';
// // import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// // import Para_courses from '../../Components/Para_courses';
// // import File_card from '../../Components/File_card.js';

// // const Page = ({ params }) => {
// //     const module_id = params.slug.split('%40')[0];
// //     const course_id = params.slug.split('%40')[1];

// //     // State List
// //     const [module_data, setModule_data] = useState({});
// //     const [addFile, setAddFile] = useState(false);
// //     const [addParagraph, setAddParagraph] = useState(false);
// //     const [parapageData, setparaPageData] = useState([]);
// //     const [file_upload, setFile_upload] = useState(null)
// //     const [fileList, setFileList] = useState([])
// //     const [deletefile, setDeletefile] = useState(false)
// //     const [questions, setQuestions] = useState([
// //         { question: '', options: ['', '', '', ''], correctAnswer: '' }
// //     ]);

// //     // Useform and Usefield array
// //     const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
// //         defaultValues: {
// //             questions: [{ question: '', options: ['', '', '', ''], correctAnswer: '' }]
// //         }
// //     });

// //     const { fields: questionFields, append: appendQuestion, replace: replaceQuestions } = useFieldArray({
// //         control,
// //         name: 'questions'
// //     });

// //     // Fetch List
// //     const get_module_data = async () => {
// //         const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/courses/course/module/${course_id}/${module_id}`, {
// //             method: 'GET',
// //             headers: {
// //                 'Content-Type': 'application/json',
// //             }
// //         });
// //         const result = await response.json();
// //         console.log(result.data);
// //         setModule_data(result.data);
// //     };



// //     // const get_parapagedata = async () => {
// //     //     const responce = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getparapagedata/${module_id}`, {
// //     //         method: 'GET',
// //     //         headers: {
// //     //             'Content-Type': 'application/json',
// //     //         },
// //     //     })
// //     //     const result = await responce.json()
// //     //     console.log(result)
// //     //     console.log(result.data);

// //     //     // Map the fetched data to the expected format for Para_courses
// //     //     const formattedData = result.data.map(item => ({
// //     //         heading: item.theory_heading,
// //     //         explanation: item.theory_explanation
// //     //     }));

// //     //     // Update the state with the formatted data
// //     //     setparaPageData(formattedData);
// //     // }

// //     const get_parapagedata = async () => {
// //         try {
// //             const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getparapagedata/${module_id}`, {
// //                 method: 'GET',
// //                 headers: {
// //                     'Content-Type': 'application/json',
// //                 },
// //             });
// //             const result = await response.json();
// //             console.log(result);

// //             // Check if result.data exists and is an array
// //             if (Array.isArray(result.data)) {
// //                 // Map the fetched data to the expected format for Para_courses
// //                 const formattedData = result.data.map(item => ({
// //                     heading: item.theory_heading || "No heading",  // Provide a default value if heading is missing
// //                     explanation: item.theory_explanation || "No explanation",  // Provide a default value if explanation is missing
// //                 }));

// //                 // Update the state with the formatted data
// //                 setparaPageData(formattedData);
// //             } else {
// //                 console.log("No data or data is not in expected format");
// //                 setparaPageData([]); // Set an empty array if no data is available
// //             }
// //         } catch (error) {
// //             console.error("Error fetching parapage data:", error);
// //             setparaPageData([]); // Handle errors by setting an empty array
// //         }
// //     };

// //     // Post quiz questions to db
// //     const post_quiz_data = async (data) => {
// //         const responce = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/post_quiz_data/${module_id}`, {
// //             method: 'PUT',
// //             headers: {
// //                 'Content-Type': 'application/json',
// //             },
// //             body: JSON.stringify(data)
// //         })
// //         const result = await responce.json()
// //         console.log(result);
// //     }

// //     //get quiz details
// //     const get_quiz_details = async (data) => {
// //         const responce = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/get_quiz_data/${module_id}`, {
// //             method: 'GET',
// //             headers: {
// //                 'Content-Type': 'application/json',
// //             },
// //         })
// //         const result = await responce.json()
// //         console.log(result);

// //         if (result.data) {
// //             const formattedQuestions = result.data.map((q) => ({
// //                 question: q.question_title,
// //                 options: q.options,
// //                 correctAnswer: q.correct_option // Or index if needed
// //             }));

// //             // Use `replace` to update the `useFieldArray` with new questions
// //             replaceQuestions(formattedQuestions);
// //         }

// //     }

// //     const handle_delete_quiz = async () => {
// //         const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/handle_delete_quiz/${module_id}`, {
// //             method: 'PUT',
// //             headers: {
// //                 'Content-Type': 'application/json',
// //             }
// //         })
// //         const result = await response.json()
// //         console.log(result);
// //     }



// //     const get_files = async (data) => {
// //         const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/get_files/${module_id}`, {
// //             method: 'GET',
// //             headers: {
// //                 'Content-Type': 'application/json',
// //             },
// //         })
// //         const result = await response.json()
// //         console.log(result)
// //         setFileList(result.data)
// //     };


// //     //UseEffects
// //     useEffect(() => {
// //         get_module_data();
// //         get_parapagedata();
// //         get_quiz_details();
// //         get_files()
// //     }, []);

// //     // Functions
// //     const paragraphSubmit = (data) => {
// //         console.log(data);
// //         setparaPageData((prev) => [
// //             ...prev,
// //             { type: 'paragraph', heading: data.heading, explanation: data.explanation }
// //         ]);
// //         console.log(parapageData);

// //         reset();
// //         setAddParagraph(false);
// //     };

// //     //submit file
// //     const onFileSubmit = async (event) => {
// //         event.preventDefault();  // Prevent form submission default behavior
// //         if (!file_upload) {
// //             console.log("No file selected.");
// //             return;
// //         }
// //         console.log(file_upload);

// //         const result = await Promise.all(
// //             Array.from(file_upload).map((file, index) => {  // Convert FileList to Array
// //                 const file_ref = ref(analytics, `SmartSkill_courses/${file.name}`);
// //                 return uploadBytes(file_ref, file).then((data) => {
// //                     return getDownloadURL(data.ref).then((url) => {
// //                         return { 'url': url, "name": file.name, "type": file.type };  // Corrected dynamic key syntax
// //                     });
// //                 });
// //             })
// //         );

// //         console.log(result);
// //         setFileList((prev) => {
// //             const final_list = [...prev, ...result];
// //             // post_files(final_list);
// //             return final_list;
// //         });

// //         setAddFile(false);  // Close the file upload modal after submission
// //     };



// //     //submit Quiz data
// //     const onSubmit = (data) => {
// //         console.log(data.questions); // Handle form submission
// //         post_quiz_data(data.questions)
// //         // reset()
// //     };

// //     return (
// //         <div>
// //             <div className="max-w-5xl min-h-[calc(100vh-7rem)] mx-auto mt-5 p-6 bg-gray-100 rounded-lg shadow-md">
// //                 {module_data.content_type === "Content" ? (
// //                     <div>
// //                         <div className="relative pt-16"> {/* Add top padding to the container */}
// //                             <h1 className="text-3xl font-bold text-center text-green-600">{module_data.module_title}</h1>
// //                             <div className="btn absolute top-2 right-20 flex gap-2"> {/* Set top to a positive value */}
// //                                 <button
// //                                     onClick={() => setAddParagraph(!addParagraph)}
// //                                     className="px-4 py-2 rounded-full bg-green-400 text-white font-semibold">
// //                                     Add Text
// //                                 </button>
// //                                 <button
// //                                     onClick={() => setAddFile(!addFile)}
// //                                     className="px-4 py-2 rounded-full bg-green-400 text-white font-semibold">
// //                                     Add Files
// //                                 </button>
// //                             </div>

// //                             {/* Render Lesson List  */}
// //                             {parapageData.length > 0 ? (
// //                                 parapageData.map((data, index) => (
// //                                     <Para_courses key={index} heading={data.heading} paragraph={data.explanation} />
// //                                 ))
// //                             ) : (
// //                                 <p className="grid place-items-center">No data available</p>
// //                             )}

// //                             <div className='flex justify-between items-center p-4'>
// //                                 <h3 className='font-bold text-xl'>Attached Files</h3>
// //                                 <button className='py-2 px-4 border border-black hover:border-green-400 rounded-full'>Delete</button>
// //                             </div>

// //                             {/* Render file list */}
// //                             {fileList.length > 0 ? (
// //                                 <div className='flex flex-wrap gap-4'>
// //                                     {fileList.map((file, index) => (
// //                                         deletefile ? (
// //                                             <div key={index}>
// //                                                 <File_card fileName={file.name} />
// //                                             </div>
// //                                         ) : (
// //                                             <Link key={index} href={file.url} target="_blank" rel="noopener noreferrer">
// //                                                 <File_card fileName={file.name} />
// //                                             </Link>
// //                                         )
// //                                     ))}
// //                                 </div>
// //                             ) : (
// //                                 <p className="text-center text-gray-500">No files available</p>
// //                             )}
// //                         </div>

// //                         {/* submit the format */}
// //                         <div className="absolute left-1/2 bottom-20 transform -translate-x-1/2">
// //                             <button onClick={() => handleModuleSubmit(parapageData)} className="py-2 px-4 rounded-full bg-green-400 text-white">Submit</button>
// //                         </div>

// //                     </div>
// //                 ) : (
// //                     // Section for the quiz setting

// //                     <div className="min-h-screen bg-green-50 p-8">
// //                         <div className='flex justify-between items-center'>
// //                             <h1 className="text-3xl font-bold text-green-700 mb-6">Create Quiz</h1>
// //                             <button onClick={handle_delete_quiz} className='px-4 py-2 rounded-full border border-green-400 bg-white hover:text-green-500 text-black hover:border-green-600 font-semibold mb-6'>Delete All</button>
// //                         </div>
// //                         <form onSubmit={handleSubmit(onSubmit)}>
// //                             {questionFields.map((question, qIndex) => (
// //                                 <div key={question.id} className="mb-8 p-6 bg-white shadow rounded-lg">
// //                                     <div className="mb-4">
// //                                         <div className='flex justify-between'>
// //                                             <label className="block text-green-700 font-medium">Question {qIndex + 1}</label>
// //                                             <p className='text-green-300'>Select the correct option</p>
// //                                         </div>
// //                                         <input
// //                                             type="text"
// //                                             {...register(`questions.${qIndex}.question`)}
// //                                             className="w-full mt-2 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
// //                                             placeholder="Enter your question"
// //                                         />
// //                                     </div>

// //                                     <div>
// //                                         {question.options.map((_, oIndex) => (
// //                                             <div key={oIndex} className="flex items-center mb-2">
// //                                                 <input
// //                                                     type="radio"
// //                                                     {...register(`questions.${qIndex}.correctAnswer`)}
// //                                                     value={oIndex}
// //                                                     className="mr-2"
// //                                                 />
// //                                                 <input
// //                                                     type="text"
// //                                                     {...register(`questions.${qIndex}.options.${oIndex}`)}
// //                                                     className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
// //                                                     placeholder={`Option ${oIndex + 1}`}
// //                                                 />
// //                                             </div>
// //                                         ))}

// //                                         <button
// //                                             type="button"
// //                                             onClick={() => {
// //                                                 questionFields[qIndex].options.push('');
// //                                                 reset();
// //                                             }}
// //                                             className="mt-2 text-green-700 font-medium hover:text-green-900"
// //                                         >
// //                                             + Add Option
// //                                         </button>
// //                                     </div>
// //                                 </div>
// //                             ))}

// //                             <button
// //                                 type="button"
// //                                 onClick={() => appendQuestion({ question: '', options: ['', '', '', ''], correctAnswer: '' })}
// //                                 className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
// //                             >
// //                                 + Add Question
// //                             </button>

// //                             <button
// //                                 type="submit"
// //                                 className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
// //                             >
// //                                 Submit Quiz
// //                             </button>
// //                         </form>
// //                     </div>
// //                 )}

// //             </div>


// //             {/* Form to Add paragraph in the Module */}
// //             {addParagraph && (
// //                 <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
// //                     <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
// //                         <h2 className="text-lg font-bold mb-4 text-green-600">Add Paragraph</h2>
// //                         <form onSubmit={handleSubmit(paragraphSubmit)}>
// //                             <label htmlFor="heading" className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
// //                             <input
// //                                 type="text"
// //                                 {...register("heading", { required: true })}
// //                                 className="border border-gray-300 rounded-md p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
// //                             />
// //                             {errors.heading && <p className="text-red-500 text-sm">Heading is required</p>}

// //                             <label htmlFor="explanation" className="block text-sm font-medium text-gray-700 mb-1">Explanation</label>
// //                             <textarea
// //                                 {...register("explanation", { required: true })}
// //                                 className="border border-gray-300 rounded-md p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
// //                                 rows="4"
// //                                 placeholder="Enter your explanation here..."
// //                             ></textarea>

// //                             {errors.explanation && <p className="text-red-500 text-sm">Explanation is required</p>}

// //                             <input
// //                                 type="submit"
// //                                 value="Submit"
// //                                 className="w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 transition duration-200"
// //                             />
// //                         </form>
// //                     </div>
// //                 </div>
// //             )}
// //             {/* Form to add Files in the Module */}
// //             {addFile && (
// //                 <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
// //                     <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
// //                         <h2 className="text-lg font-bold mb-4 text-green-600">Add Files</h2>
// //                         <form onSubmit={onFileSubmit}>  {/* Use the new `onFileSubmit` handler */}
// //                             <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-1">Select Files</label>
// //                             <input
// //                                 type="file"
// //                                 name="file"
// //                                 multiple
// //                                 onChange={(event) => setFile_upload(event.target.files)}
// //                                 className="border border-gray-300 rounded-md p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
// //                             />
// //                             <input
// //                                 type="submit"
// //                                 value="Upload"
// //                                 className="w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 transition duration-200"
// //                             />
// //                         </form>
// //                     </div>
// //                 </div>
// //             )}


// //         </div>
// //     );
// // };

// // export default Page;


"use client";
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useForm, useFieldArray } from 'react-hook-form';
import { analytics } from '../../Firebase/firebase-config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Para_courses from '../../Components/Para_courses';
import File_card from '../../Components/File_card.js';
import dotenv from 'dotenv';

dotenv.config();

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
    const [isuploading, setIsuploading] = useState(false);
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

    const get_parapagedata = useCallback(async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getparapagedata/${module_id}`);
        const result = await response.json();

        if (result.data && Array.isArray(result.data)) {
            const formattedData = result.data.map(item => ({
                heading: item.theory_heading,
                explanation: item.theory_explanation,
                id: item._id,
            }));
            setparaPageData(formattedData);

        } else {
            console.error("Unexpected data format:", result);
        }
    }, []);


    const post_files = async (fileList) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/post_files/${module_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fileList),
        })
        const result = await response.json()
    };

    //submit file
    const onFileSubmit = async (event) => {
        event.preventDefault();  // Prevent form submission default behavior

        if (!file_upload) {
            return;
        }

        setIsuploading(true)

        const result = await Promise.all(
            Array.from(file_upload).map((file, index) => {  // Convert FileList to Array
                const file_ref = ref(analytics, `SmartSkill_courses/${file.name}`);
                return uploadBytes(file_ref, file).then((data) => {
                    return getDownloadURL(data.ref).then((url) => {
                        return { 'url': url, "name": file.name, "type": file.type };  // Corrected dynamic key syntax
                    });
                });
            })
        );

        setFileList((prev) => {
            const final_list = [...prev, ...result];
            // post_files(final_list);
            return final_list;
        });

        setAddFile(false);  // Close the file upload modal after submission
        setIsuploading(false);  // Stop loader here
    };


    const handleModuleSubmit = async (data) => {

        const responce = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/courses/course/module/${module_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        const result = await responce.json()

        await post_files(fileList);
        toast("Module Submitted", {
            position: "top-right",
            autoClose: 3000,
        })
    }

    const get_files = useCallback(async (data) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/get_files/${module_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const result = await response.json()
        setFileList(result.data)
    }, []);

    const handle_delete_quiz = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/handle_delete_quiz/${module_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const result = await response.json()
        toast("Quiz data deleted", {
            position: "top-right",
            autoClose: 3000,
        })
    }

    //get quiz details
    const get_quiz_details = useCallback(async (data) => {
        const responce = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/get_quiz_data/${module_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const result = await responce.json()

        if (result.data) {
            const formattedQuestions = result.data.map((q) => ({
                question: q.question_title,
                options: q.options,
                correctAnswer: q.correct_option // Or index if needed
            }));

            // Use `replace` to update the `useFieldArray` with new questions
            replaceQuestions(formattedQuestions);
        }

    }, [])

    // Function to delete a specific file
    const handleFileDelete = (index) => {
        const updatedFiles = fileList.filter((_, i) => i !== index);
        setFileList(updatedFiles);
    };

    // Fetch List
    const get_module_data = useCallback(async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/courses/course/module/${course_id}/${module_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const result = await response.json();
        setModule_data(result.data);
    }, []);

    // Post quiz questions to db
    const post_quiz_data = async (data) => {
        const responce = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/post_quiz_data/${module_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        const result = await responce.json()
    }

    //submit Quiz data
    const onSubmit = (data) => {
        post_quiz_data(data.questions)
        toast("Quiz date Submitted", {
            position: "top-right",
            autoClose: 3000,
        })
        // reset()
    };

    const paragraphSubmit = (data) => {
        setparaPageData((prev) => [
            ...prev,
            { type: 'paragraph', heading: data.heading, explanation: data.explanation }
        ]);

        reset();
        setAddParagraph(false);
    };

    // UseEffects
    useEffect(() => {
        const fetchData = async () => {
            await get_module_data();
        };

        fetchData();
    }, [get_module_data]); // Runs on component mount

    useEffect(() => {
        if (module_data.content_type === 'Content') {
            get_parapagedata();
        } else if (module_data.content_type) {
            get_quiz_details();
        }
        get_files();
    }, [module_data, get_parapagedata, get_quiz_details, get_files]); // Runs when `module_data` changes





    return (
        <div>
            <ToastContainer />
            <div className="max-w-5xl min-h-[calc(100vh-7rem)] mx-auto mt-5 p-6 bg-gray-100 rounded-lg shadow-md">
                {module_data.content_type === "Content" ? (
                    <div>
                        <div className="relative pt-16">
                            <h1 className="text-3xl font-bold text-center text-green-600">{module_data.module_title}</h1>
                            <div className="btn absolute top-2 right-20 flex gap-2">
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

                            {/* submit the format */}
                            <div className="fixed left-1/2 bottom-20 transform -translate-x-1/2">
                                <button onClick={() => handleModuleSubmit(parapageData)} className="py-2 px-4 rounded-full bg-green-400 text-white">Submit</button>
                            </div>


                            {/* Render Lesson List */}
                            {parapageData.length > 0 ? (
                                parapageData.map((data, index) => (
                                    <Para_courses key={index} module_id={module_id} id={data.id} heading={data.heading} paragraph={data.explanation} />
                                ))
                            ) : (
                                <p className="grid place-items-center">No data available</p>
                            )}

                            <div className='flex justify-between items-center p-4'>
                                <h3 className='font-bold text-xl'>Attached Files</h3>
                                <button
                                    onClick={() => setDeletefile(!deletefile)}
                                    className='py-2 px-4 border border-black hover:border-green-400 rounded-full'>
                                    {deletefile ? "Cancel" : "Delete"}
                                </button>
                            </div>

                            {/* Render file list with delete mode */}
                            {fileList.length > 0 ? (
                                <div className="flex flex-wrap gap-4">
                                    {fileList.map((file, index) => (
                                        <div
                                            key={index}
                                            className={`p-2 ${deletefile ? "bg-green-200 cursor-pointer" : ""}`}
                                            onClick={() => deletefile && handleFileDelete(index)}
                                        >
                                            {deletefile ? (
                                                <File_card fileName={file.name} />
                                            ) : (
                                                <Link href={file.url} target="_blank" rel="noopener noreferrer">
                                                    <File_card fileName={file.name} />
                                                </Link>
                                            )}
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
                    // Section for the quiz setting

                    <div className="min-h-screen bg-green-50 p-8">
                        <div className='flex justify-between items-center'>
                            <h1 className="text-3xl font-bold text-green-700 mb-6">Create Quiz</h1>
                            <button onClick={handle_delete_quiz} className='px-4 py-2 rounded-full border border-green-400 bg-white hover:text-green-500 text-black hover:border-green-600 font-semibold mb-6'>Delete All</button>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {questionFields ? (
                                questionFields.map((question, qIndex) => (
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
                                ))
                            ) : (
                                <div className='w-full text-center'> No Questions Added</div>
                            )}

                            <div className='w-full flex justify-around items-center'>

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
                            </div>
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
                        <form onSubmit={onFileSubmit}>  {/* Use the new `onFileSubmit` handler */}
                            <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-1">Select Files</label>
                            <input
                                type="file"
                                name="file"
                                multiple
                                onChange={(event) => setFile_upload(event.target.files)}
                                className="border border-gray-300 rounded-md p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            {isuploading && (
                                <div className=' w-full flex justify-center items-center p-2'>
                                    <div className="loader"></div>
                                </div>
                            )}
                            <input
                                type="submit"
                                value="Upload"
                                onClick={() => { setIsuploading(true); }}
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







// "use client";
// import React, { useState, useEffect } from 'react';
// import { useForm, useFieldArray } from 'react-hook-form';
// import Para_courses from '../../Components/Para_courses';

// const Page = ({ params }) => {
//     const module_id = params.slug.split('%40')[0];
//     const course_id = params.slug.split('%40')[1];

//     // State List
//     const [module_data, setModule_data] = useState({});
//     const [addFile, setAddFile] = useState(false);
//     const [addParagraph, setAddParagraph] = useState(false);
//     const [parapageData, setparaPageData] = useState([]);
//     const [questions, setQuestions] = useState([
//         { question: '', options: ['', '', '', ''], correctAnswer: '' }
//     ]);

//     // Useform and Usefield array
//     const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
//         defaultValues: {
//             questions: [{ question: '', options: ['', '', '', ''], correctAnswer: '' }]
//         }
//     });

//     const { fields: questionFields, append: appendQuestion, replace: replaceQuestions } = useFieldArray({
//         control,
//         name: 'questions'
//     });

//     // Fetch List
//     const get_module_data = async () => {
//         const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/courses/course/module/${course_id}/${module_id}`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             }
//         });
//         const result = await response.json();
//         console.log(result.data);
//         setModule_data(result.data);
//     };

//     const handleModuleSubmit = async (data) => {
//         console.log(data);

//         const responce = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/courses/course/module/${module_id}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(data)
//         })
//         const result = await responce.json()
//         console.log(result);
//     }

//     const get_parapagedata = async () => {
//         const responce = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getparapagedata/${module_id}`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         })
//         const result = await responce.json()
//         console.log(result)
//         console.log(result.data);

//         // Map the fetched data to the expected format for Para_courses
//         const formattedData = result.data.map(item => ({
//             heading: item.theory_heading,
//             explanation: item.theory_explanation
//         }));

//         // Update the state with the formatted data
//         setparaPageData(formattedData);
//     }

//     // Post quiz questions to db
//     const post_quiz_data = async (data) => {
//         const responce = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/post_quiz_data/${module_id}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(data)
//         })
//         const result = await responce.json()
//         console.log(result);
//     }

//     //get quiz details
//     const get_quiz_details = async (data) => {
//         const responce = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/get_quiz_data/${module_id}`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         })
//         const result = await responce.json()
//         console.log(result);

//         if (result.data) {
//             const formattedQuestions = result.data.map((q) => ({
//                 question: q.question_title,
//                 options: q.options,
//                 correctAnswer: q.correct_option // Or index if needed
//             }));

//             // Use `replace` to update the `useFieldArray` with new questions
//             replaceQuestions(formattedQuestions);
//         }

//     }

//     const handle_delete_quiz = async () => {
//         const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/handle_delete_quiz/${module_id}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//             }
//         })
//         const result = await response.json()
//         console.log(result);
//     }

//     //UseEffects
//     useEffect(() => {
//         get_module_data();
//         get_parapagedata();
//         get_quiz_details();
//     }, []);

//     // Functions
//     const paragraphSubmit = (data) => {
//         console.log(data);
//         setparaPageData((prev) => [
//             ...prev,
//             { type: 'paragraph', heading: data.heading, explanation: data.explanation }
//         ]);
//         console.log(parapageData);

//         reset();
//         setAddParagraph(false);
//     };

//     const onSubmitFile = (data) => {
//         console.log(data);
//         reset()
//         setAddFile(false)
//     }

//     //submit Quiz data
//     const onSubmit = (data) => {
//         console.log(data.questions); // Handle form submission
//         post_quiz_data(data.questions)
//         // reset()
//     };

//     return (
//         <div>
//             <div className="max-w-5xl min-h-[calc(100vh-7rem)] mx-auto mt-5 p-6 bg-gray-100 rounded-lg shadow-md">
//                 {module_data.content_type === "Content" ? (
//                     <div>
//                         <div className="relative">
//                             <h1 className="text-3xl font-bold text-center text-green-600">{module_data.module_title}</h1>
//                             <div className="btn absolute top-3 right-20 flex gap-2">
//                                 <button
//                                     onClick={() => setAddParagraph(!addParagraph)}
//                                     className="px-4 py-2 rounded-full bg-green-400 text-white font-semibold">
//                                     Add Text
//                                 </button>
//                                 <button
//                                     onClick={() => setAddFile(!addFile)}
//                                     className="px-4 py-2 rounded-full bg-green-400 text-white font-semibold">
//                                     Add Files
//                                 </button>
//                             </div>

//                             {parapageData.length > 0 ? (
//                                 parapageData.map((data, index) => (
//                                     <Para_courses key={index} heading={data.heading} paragraph={data.explanation} />
//                                 ))
//                             ) : (
//                                 <p className='grid place-items-center'>No data available</p>
//                             )}
//                         </div>

//                         {/* submit the format */}
//                         <div className="absolute left-1/2 bottom-20 transform -translate-x-1/2">
//                             <button onClick={() => handleModuleSubmit(parapageData)} className="py-2 px-4 rounded-full bg-green-400 text-white">Submit</button>
//                         </div>

//                     </div>
//                 ) : (
//                     // Section for the quiz setting

//                     <div className="min-h-screen bg-green-50 p-8">
//                         <div className='flex justify-between items-center'>
//                             <h1 className="text-3xl font-bold text-green-700 mb-6">Create Quiz</h1>
//                             <button onClick={handle_delete_quiz} className='px-4 py-2 rounded-full border border-green-400 bg-white hover:text-green-500 text-black hover:border-green-600 font-semibold mb-6'>Delete All</button>
//                         </div>
//                         <form onSubmit={handleSubmit(onSubmit)}>
//                             {questionFields.map((question, qIndex) => (
//                                 <div key={question.id} className="mb-8 p-6 bg-white shadow rounded-lg">
//                                     <div className="mb-4">
//                                         <div className='flex justify-between'>
//                                             <label className="block text-green-700 font-medium">Question {qIndex + 1}</label>
//                                             <p className='text-green-300'>Select the correct option</p>
//                                         </div>
//                                         <input
//                                             type="text"
//                                             {...register(`questions.${qIndex}.question`)}
//                                             className="w-full mt-2 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
//                                             placeholder="Enter your question"
//                                         />
//                                     </div>

//                                     <div>
//                                         {question.options.map((_, oIndex) => (
//                                             <div key={oIndex} className="flex items-center mb-2">
//                                                 <input
//                                                     type="radio"
//                                                     {...register(`questions.${qIndex}.correctAnswer`)}
//                                                     value={oIndex}
//                                                     className="mr-2"
//                                                 />
//                                                 <input
//                                                     type="text"
//                                                     {...register(`questions.${qIndex}.options.${oIndex}`)}
//                                                     className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
//                                                     placeholder={`Option ${oIndex + 1}`}
//                                                 />
//                                             </div>
//                                         ))}

//                                         <button
//                                             type="button"
//                                             onClick={() => {
//                                                 questionFields[qIndex].options.push('');
//                                                 reset();
//                                             }}
//                                             className="mt-2 text-green-700 font-medium hover:text-green-900"
//                                         >
//                                             + Add Option
//                                         </button>
//                                     </div>
//                                 </div>
//                             ))}

//                             <button
//                                 type="button"
//                                 onClick={() => appendQuestion({ question: '', options: ['', '', '', ''], correctAnswer: '' })}
//                                 className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
//                             >
//                                 + Add Question
//                             </button>

//                             <button
//                                 type="submit"
//                                 className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//                             >
//                                 Submit Quiz
//                             </button>
//                         </form>
//                     </div>
//                 )}

//             </div>


//             {/* Form to Add paragraph in the Module */}
//             {addParagraph && (
//                 <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//                     <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
//                         <h2 className="text-lg font-bold mb-4 text-green-600">Add Paragraph</h2>
//                         <form onSubmit={handleSubmit(paragraphSubmit)}>
//                             <label htmlFor="heading" className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
//                             <input
//                                 type="text"
//                                 {...register("heading", { required: true })}
//                                 className="border border-gray-300 rounded-md p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
//                             />
//                             {errors.heading && <p className="text-red-500 text-sm">Heading is required</p>}

//                             <label htmlFor="explanation" className="block text-sm font-medium text-gray-700 mb-1">Explanation</label>
//                             <textarea
//                                 {...register("explanation", { required: true })}
//                                 className="border border-gray-300 rounded-md p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
//                                 rows="4"
//                                 placeholder="Enter your explanation here..."
//                             ></textarea>

//                             {errors.explanation && <p className="text-red-500 text-sm">Explanation is required</p>}

//                             <input
//                                 type="submit"
//                                 value="Submit"
//                                 className="w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 transition duration-200"
//                             />
//                         </form>
//                     </div>
//                 </div>
//             )}
//             {/* Form to add Files in the Module */}
//             {addFile && (
//                 <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//                     <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
//                         <h2 className="text-lg font-bold mb-4 text-green-600">Add Files</h2>
//                         <form onSubmit={onSubmitFile}>
//                             <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-1">Select Files</label>
//                             <input
//                                 type="file"
//                                 name="file"
//                                 multiple
//                                 className="border border-gray-300 rounded-md p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
//                             />

//                             <input
//                                 type="submit"
//                                 value="Upload"
//                                 className="w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 transition duration-200"
//                             />
//                         </form>
//                     </div>
//                 </div>
//             )}

//         </div>
//     );
// };
