"use client"
import React, { useState, useEffect } from 'react'
import L_Course_details_card from '../../Components/L_Course_details_card'
import { useSelector } from 'react-redux'

const page = ({ params }) => {

  const user_id = useSelector(state => state.counter.text)

  const [title, setTitle] = useState('')
  const [moduleList, setModuleList] = useState([])

  useEffect(() => {
    const fetchModulesWithMarks = async () => {
      try {
        const modules = await getModule();
        const modulesWithMarks = await Promise.all(
          modules.map(async (module) => {
            const mark = await getMark(module.module_id);
            return { ...module, mark };
          })
        );
        setModuleList(modulesWithMarks);
      } catch (error) {
        console.error("Error fetching modules or marks: ", error);
      }
    };

    fetchModulesWithMarks();
  }, []);

  console.log(moduleList)

  useEffect(() => {
    const fetchTitle = async () => {
      const response = await fetch(`http://localhost:5000/courses/course/get-title/${params.slug}`);
      const data = await response.json();
      setTitle(data.data.course_title);
    };
    fetchTitle();
  }, []);

  const getModule = async () => {
    try {
      const response = await fetch(`http://localhost:5000/courses/course/get-title/${params.slug}`);
      const result = await response.json();
      return result.data.course_details;
    } catch (error) {
      console.error("Failed to fetch course list: ", error.message);
      return [];
    }
  };

  const getMark = async (module_id) => {
    try {
      const response = await fetch(`http://localhost:5000/get_mark/${user_id}/${module_id}`);
      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error("Failed to fetch mark: ", error.message);
      return false;
    }
  };

  return (
    <div className='relative h-[calc(100vh-9rem)]'>
      <div className='flex justify-between items-center px-4 h-16 bg-green-200 '>
        <h1 className='font-bold text-xl'>{title}</h1>
      </div>

      <ol className="h-full">
        {moduleList.length > 0 ? (
          moduleList.map((module, index) => (
            <li key={index}>
              <L_Course_details_card
                course_id={params.slug}
                module_id={module.module_id}
                module_title={module.module_title}
                module_description={module.module_description}
                content_type={module.content_type}
                mark={module.mark} // Pass mark as a prop
              />
            </li>
          ))
        ) : (
          <p className="grid place-items-center h-full">No modules yet</p>
        )}
      </ol>
    </div>
  );
};

export default page;
