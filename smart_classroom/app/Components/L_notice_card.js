import React, { useState } from 'react';

const L_notice_card = ({ instructor_name, heading, description }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className=" mx-2 p-4 bg-white shadow-lg rounded-lg my-4">
      {/* Header section */}
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg text-gray-700">{heading}</h3>
        <span className="text-sm text-gray-500">By {instructor_name}</span>
      </div>

      {/* Description section */}
      <div className={`overflow-hidden transition-max-height duration-500 ${isExpanded ? 'max-h-full' : 'max-h-16'}`}>
        <p className="mt-2 text-gray-600 whitespace-pre-wrap break-words">
          {description}
        </p>
      </div>

      {/* Expand/Collapse button */}
      <div className="flex justify-end mt-2">
        <button
          onClick={toggleExpand}
          className="text-blue-500 text-sm font-semibold hover:underline focus:outline-none"
        >
          {isExpanded ? 'Collapse' : 'Expand'}
        </button>
      </div>
    </div>
  );
};

export default L_notice_card;
