"use client"
import React from 'react'
import { useState, useEffect } from 'react'

const page = ({ params }) => {

    const module_id = params.slug.split('%40')[0]
    const course_id = params.slug.split('%40')[1]

    const [module_data, setModule_data] = useState({})
    const [paragraphs, setParagraphs] = useState(['']); // Initial empty paragraph
    const [files, setFiles] = useState([]);

    const get_module_data = async () => {
        const responce = await fetch(`http://localhost:5000/courses/course/module/${course_id}/${module_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const result = await responce.json()
        console.log(result.data)
        setModule_data(result.data)
    }

    useEffect(() => {
        const get_data = async () => {
            await get_module_data()
        }
        get_data()
    }, [])

    const handleAddParagraph = () => {
        setParagraphs([...paragraphs, '']); // Add an empty paragraph
      };
    
      const handleParagraphChange = (index, value) => {
        const newParagraphs = [...paragraphs];
        newParagraphs[index] = value;
        setParagraphs(newParagraphs);
      };
    
      const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        setFiles([...files, ...selectedFiles]);
      };

    return (
        <div>
            <div className="max-w-5xl mx-auto mt-5 p-6 bg-gray-100 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-center text-green-600">{module_data.module_title}</h1>

                <div className="my-6">
                    <h2 className="text-xl font-semibold">Paragraphs</h2>
                    {paragraphs.map((paragraph, index) => (
                        <textarea
                            key={index}
                            value={paragraph}
                            onChange={(e) => handleParagraphChange(index, e.target.value)}
                            className="w-full h-24 mt-2 p-2 border border-green-500 rounded-md"
                            placeholder="Write your paragraph here..."
                        />
                    ))}
                    <button
                        onClick={handleAddParagraph}
                        className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                    >
                        Add Paragraph
                    </button>
                </div>

                <div className="my-6">
                    <h2 className="text-xl font-semibold">Upload Files</h2>
                    <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="mt-2 p-2 border border-green-500 rounded-md"
                    />
                    {files.length > 0 && (
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold">Uploaded Files:</h3>
                            <ul className="list-disc list-inside">
                                {files.map((file, index) => (
                                    <li key={index} className="text-green-700">{file.name}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            );
        </div>
    )
}

export default page
