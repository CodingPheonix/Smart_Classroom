import React from 'react';
import Image from 'next/image';
import pdf from '../Images/pdf_image.png'
import word from '../Images/word_logo.jpg'
import default_img from '../Images/default.png'

const File_card = ({ fileName }) => {
    console.log(fileName)
    // Determine file type based on extension
    const getFileIcon = () => {
        const extension = fileName.split('.').pop().toLowerCase();
        switch (extension) {
            case 'pdf':
                return pdf;
            case 'doc':
            case 'docx':
                return word;
            default:
                return default_img;
        }
    };

    return (
        <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md w-48">
            {/* File icon */}
            <Image 
                src={getFileIcon()} 
                width={100}
                height={100}
                alt={`${fileName} icon`} 
                className="w-16 h-16 mb-4"
            />

            {/* File name */}
            <p className="text-sm font-medium text-gray-800 text-center truncate px-2">
                {fileName}
            </p>
        </div>
    );
};

export default File_card;