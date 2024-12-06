import React from 'react';

import Image from 'next/image';
import pdf from '../Images/pdf_image.png'
import word from '../Images/word_logo.jpg'
import default_img from '../Images/default.png'
import ppt from '../Images/ppt_logo.jpg'

const File_card = ({ fileName }) => {
    // Determine file type based on extension
    const getFileIcon = () => {
        const extension = fileName.split('.').pop().toLowerCase();
        switch (extension) {
            case 'pdf':
                return pdf;
            case 'doc':
            case 'docx':
                return word;
            case 'pptx':
                return ppt;
            default:
                return default_img;
        }
    };

    return (
        <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md w-48 mx-auto">
            {/* File icon */}
            <Image
                src={getFileIcon()}
                width={100}
                height={100}
                alt={`${fileName} icon`}
                className="w-16 h-16 mb-4 mx-auto"
            />

            {/* File name */}
            <p className="text-sm font-medium text-gray-800 text-center break-words max-w-full px-2 max-h-12 overflow-hidden">
                {fileName}
            </p>

        </div>
    );
};

export default File_card;
