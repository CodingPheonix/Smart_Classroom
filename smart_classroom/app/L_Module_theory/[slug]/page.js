// "use client"
// import React from 'react'
// import { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import L_Para_courses from '../../Components/L_Para_courses';

// const page = ({ params }) => {
//     const module_id = params.slug.split('%40')[0];
//     const course_id = params.slug.split('%40')[1];
//     console.log(module_id + '+' + course_id)

//     const { register, handleSubmit, watch, formState: { errors } } = useForm();

//     //state list
//     const [module_data, setModule_data] = useState({})
//     const [paraPageData, setParaPageData] = useState([])
//     const [quizData, setQuizData] = useState([]);

//     //Fetch list 
//     const get_module_data = async () => {
//         const response = await fetch(`http://localhost:5000/courses/course/module/${course_id}/${module_id}`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             }
//         });
//         const result = await response.json();
//         console.log(result.data);
//         setModule_data(result.data);
//     };

//     const get_parapagedata = async () => {
//         const responce = await fetch(`http://localhost:5000/getparapagedata/${module_id}`, {
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
//         setParaPageData(formattedData);
//     }

//     const get_quiz_details = async () => {
//         const responce = await fetch(`http://localhost:5000/get_quiz_data/${module_id}`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         })
//         const result = await responce.json()
//         console.log(result.data);
//         setQuizData(result.data)
//     }

//     const upload_result_data = async (data) => {
//       const response = await fetch(`http://localhost:5000/post_student_marks/${course_id}/${module_id}`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data)
//       })
//       const result = await response.json()
//       console.log(result)
//     }

//     const get_quiz_data = async (id) => {
//       const responce = await fetch(`/fetch_student_quiz_data/${id}`, {
//         method: "GET",
//         headers: {
//             'Content-Type': 'application/json',
//         },
//       })
//       const result = await responce.json()
//       console.log(result)
//     }

//     //useEffects
//     useEffect(() => {
//         get_module_data()
//         if (module_data.content_type === "Content") {
//             get_parapagedata()
//         }else{
//             get_quiz_details()
//         }
//         get_quiz_data()
//     }, [])

//     //Submit functions
//     const onSubmit = (data) => {
//         let count = 0;
//         console.log(data); // Logging the submitted data
    
//         // Process the answers
//         const result = quizData.map((quiz, index) => {
//             if (quiz.correct_option === data[index]) {
//                 count++;
//             }
//             return data[index]; // Returning the selected option for each question
//         });
    
//         console.log(`You scored ${count} out of ${quizData.length}`);
    
//         // Prepare the final data for submission
//         const final_data = {
//             result: result, // Array of selected options
//             score: count, // The final score as an integer, not a string
//             id: "1234" // Example student ID
//         };
    
//         // Upload the result data
//         upload_result_data(final_data);
//     };
    


//     return (
//         <div className='min-h-screen w-full flex justify-center'>
//             {module_data.content_type === "Content" ? (

//                 // Content Section

//                 <div className='w-4/5 bg-slate-100'>
//                     <h1 className='text-3xl mt-3 font-bold text-center text-green-600'>{module_data.module_title}</h1>
//                     {paraPageData.length > 0 ? (
//                         paraPageData.map((data, index) => (
//                             <L_Para_courses
//                                 key={index}
//                                 heading={data.heading}
//                                 paragraph={data.explanation}
//                             />
//                         ))
//                     ) : (
//                         <p className='grid place-items-center'>No data available</p>
//                     )}
//                 </div>
//             ) : (

//                 //Quiz Section
//                 <form onSubmit={handleSubmit(onSubmit)} className="w-4/5 bg-slate-100 p-6 rounded-lg shadow-md">
//                     <h1 className="text-2xl font-bold text-center mb-6">Quiz</h1>

//                     {quizData.length > 0 ? (
//                         quizData.map((question, index) => (
//                             <div key={question._id} className="mb-6">
//                                 <h2 className="font-semibold text-lg mb-3">{index + 1}. {question.question_title}</h2>
//                                 <div className="space-y-2">
//                                     {question.options.map((option, optionIndex) => (
//                                         <label key={optionIndex} className="flex items-center space-x-3">
//                                             <input
//                                                 type="radio"
//                                                 {...register(`${index}`, { required: true })}
//                                                 value={optionIndex}
//                                                 className="form-radio h-4 w-4 text-green-600"
//                                             />
//                                             <span>{option}</span>
//                                         </label>
//                                     ))}
//                                 </div>
//                                 {errors[`${index}`] && (
//                                     <p className="text-red-600 mt-2">Please select an answer for this question.</p>
//                                 )}
//                             </div>
//                         ))
//                     ) : (
//                         <p>Loading quiz data...</p>
//                     )}

//                     <button type="submit" className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
//                         Submit Quiz
//                     </button>
//                 </form>
//             )}

//         </div>

//     )
// }

// export default page





"use client"
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import L_Para_courses from '../../Components/L_Para_courses';

const Page = ({ params }) => {
    const module_id = params.slug.split('%40')[0];
    const course_id = params.slug.split('%40')[1];
    console.log(module_id + '+' + course_id);

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    // States
    const [module_data, setModule_data] = useState({});
    const [paraPageData, setParaPageData] = useState([]);
    const [quizData, setQuizData] = useState([]);
    const [submittedAnswers, setSubmittedAnswers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [score, setScore] = useState(0);

    // Fetch module data
    const get_module_data = async () => {
        const response = await fetch(`http://localhost:5000/courses/course/module/${course_id}/${module_id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        const result = await response.json();
        console.log(result.data);
        setModule_data(result.data);
    };

    const get_parapagedata = async () => {
        const response = await fetch(`http://localhost:5000/getparapagedata/${module_id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        const result = await response.json();
        const formattedData = result.data.map(item => ({
            heading: item.theory_heading,
            explanation: item.theory_explanation
        }));
        setParaPageData(formattedData);
    };

    const get_quiz_details = async () => {
        const response = await fetch(`http://localhost:5000/get_quiz_data/${module_id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        const result = await response.json();
        console.log(result.data);
        setQuizData(result.data);
    };

    const upload_result_data = async (data) => {
        const response = await fetch(`http://localhost:5000/post_student_marks/${course_id}/${module_id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        console.log(result);
    };

    // Fetch quiz data
    useEffect(() => {
        get_module_data();
        if (module_data.content_type === "Content") {
            get_parapagedata();
        } else {
            get_quiz_details();
        }
    }, []);

    // Submit function
    const onSubmit = (data) => {
        let count = 0;
        const answers = quizData.map((quiz, index) => {
            const isCorrect = quiz.correct_option === data[index];
            if (isCorrect) count++;
            return { question: quiz.question_title, selectedOption: data[index], correctOption: quiz.correct_option, options: quiz.options };
        });

        setSubmittedAnswers(answers);
        setScore(count);
        setShowModal(true); // Show modal on submission

        const final_data = {
            result: answers.map(answer => answer.selectedOption),
            score: count,
            id: "1234" // Example student ID
        };

        upload_result_data(final_data);
    };

    return (
        <div className='min-h-screen w-full flex justify-center'>
            {module_data.content_type === "Content" ? (
                // Content Section
                <div className='w-4/5 bg-slate-100'>
                    <h1 className='text-3xl mt-3 font-bold text-center text-green-600'>{module_data.module_title}</h1>
                    {paraPageData.length > 0 ? (
                        paraPageData.map((data, index) => (
                            <L_Para_courses
                                key={index}
                                heading={data.heading}
                                paragraph={data.explanation}
                            />
                        ))
                    ) : (
                        <p className='grid place-items-center'>No data available</p>
                    )}
                </div>
            ) : (
                // Quiz Section
                <form onSubmit={handleSubmit(onSubmit)} className="w-4/5 bg-slate-100 p-6 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold text-center mb-6">Quiz</h1>
                    {quizData.length > 0 ? (
                        quizData.map((question, index) => (
                            <div key={question._id} className="mb-6">
                                <h2 className="font-semibold text-lg mb-3">{index + 1}. {question.question_title}</h2>
                                <div className="space-y-2">
                                    {question.options.map((option, optionIndex) => (
                                        <label key={optionIndex} className="flex items-center space-x-3">
                                            <input
                                                type="radio"
                                                {...register(`${index}`, { required: true })}
                                                value={optionIndex}
                                                className="form-radio h-4 w-4 text-green-600"
                                            />
                                            <span>{option}</span>
                                        </label>
                                    ))}
                                </div>
                                {errors[`${index}`] && (
                                    <p className="text-red-600 mt-2">Please select an answer for this question.</p>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>Loading quiz data...</p>
                    )}
                    <button type="submit" className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
                        Submit Quiz
                    </button>
                </form>
            )}

            {/* Modal Section */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg w-4/5 max-w-3xl">
                        <h2 className="text-xl font-bold mb-4">Quiz Results</h2>
                        {submittedAnswers.map((answer, index) => (
                            <div key={index} className="mb-4">
                                <h3 className="font-semibold">{index + 1}. {answer.question}</h3>
                                <p className={`mt-2 ${answer.selectedOption === answer.correctOption ? 'text-green-600' : 'text-red-600'}`}>
                                    Your answer: {answer.options[answer.selectedOption]} <br />
                                    Correct answer: {answer.options[answer.correctOption]}
                                </p>
                            </div>
                        ))}
                        <h3 className="text-lg font-bold">Your score: {score} / {quizData.length}</h3>
                        <button
                            onClick={() => setShowModal(false)}
                            className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Page;