"use client"
import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';

const CreateQuiz = () => {
    const { register, handleSubmit, control, reset } = useForm({
        defaultValues: {
            questions: [{ question: '', options: ['', '', '', ''], correctAnswer: '' }]
        }
    });

    const { fields: questionFields, append: appendQuestion } = useFieldArray({
        control,
        name: 'questions'
    });

    const onSubmit = (data) => {
    };

    return (
        <div className="min-h-screen bg-green-50 p-8">
            <h1 className="text-3xl font-bold text-green-700 mb-6">Create Quiz</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                {questionFields.map((question, qIndex) => (
                    <div key={question.id} className="mb-8 p-6 bg-white shadow rounded-lg">
                        <div className="mb-4">
                            <label className="block text-green-700 font-medium">Question {qIndex + 1}</label>
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
    );
};

export default CreateQuiz;
