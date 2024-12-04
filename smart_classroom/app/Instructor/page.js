"use client";
import React, { useEffect, useState } from "react";
import Instructor_nav from "../Components/Instructor_nav";
import Image from "next/image";
import { useForm, useFieldArray } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import { setText, clearText } from '../redux/counter/counterSlice'
import { analytics } from "../Firebase/firebase-config";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import dotenv from 'dotenv';

dotenv.config();

const page = () => {
  const dispatch = useDispatch();

  // Store the id of the current user
  const user_id = useSelector(state => state.counter.text);

  const [name, setName] = useState('[NAME]')
  const [title, setTitle] = useState("[TITLE]")
  const [Department, setDepartment] = useState("[DEPARTMENT]")
  const [contact, setContact] = useState(9999999999)
  const [aboutMe, setAboutMe] = useState("")
  const [achievements, setAchievements] = useState([])
  const [imageURL, setImageURL] = useState("")
  const [fileList, setFileList] = useState(null)
  const [course_list, setCourse_list] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const { register, handleSubmit, control, setValue, reset, formState: { errors } } = useForm();

  //API methods
  const get_courses = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/courses/getCourses/${user_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setCourse_list(data.data);
  };

  const get_current_user = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/get_current_user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const result = await response.json()
    console.log(result)
    return result
  };

  const upload_instructor_profile = async (data) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/upload_instructor_profile/${user_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const result = await response.json()
    console.log(result)
  };

  const fetch_instructor_profile = async (data) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/fetch_instructor_data/${user_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const result = await response.json()
    console.log(result)
    // setProfileData(result)
    setName(result.data.name)
    setAboutMe(result.data.aboutMe)
    setTitle(result.data.title)
    setDepartment(result.data.institution)
    setContact(result.data.contact)
    setAchievements(result.data.achievements)
    setImageURL(result.data.image)
    // console.log(profileData)
  };


  // UseEffects
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await get_current_user();
        if (result.data && result.data.length !== 0) {
          dispatch(setText(result.data[0].user_id));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    get_courses();
    fetch_instructor_profile()
  }, [user_id]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "achievements",
  });

  const handleImageUpload = async (file) => {
    try {
      const storageRef = ref(analytics, `SmartSkill_courses/${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setImageURL(downloadURL);
      return downloadURL // Set the image URL to be saved in the form
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const onSubmit = async (data) => {
    console.log(data)
    try {
      if (fileList) {
        const url = await handleImageUpload(fileList);
        const profileData = {
          name: data.name,
          title: data.title,
          institution: data.institution,
          contact: data.contact,
          aboutMe: data.aboutMe,
          achievements: data.achievements.map((ach) => ach.achievement),
          image: url
        };
        console.log(profileData)
        await upload_instructor_profile(profileData);
      }
      setName(data.name);
      setTitle(data.title);
      setDepartment(data.institution);
      setContact(data.contact);
      setAboutMe(data.aboutMe);
      setAchievements(data.achievements.map((ach) => ach.achievement));
      setIsEditing(false);
      reset();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <>
      <div className="flex bg-gradient-to-r from-green-100 to-white flex-col lg:flex-row max-w-[1860px] mx-auto relative">
        <div className="h-auto lg:h-[calc(100vh-112px)] w-full lg:w-1/5 border border-gray-300 shadow-lg rounded-lg p-4 bg-white m-4">
          <Instructor_nav />
        </div>
        <div className="min-h-[calc(100vh-230px)] lg:h-[calc(100vh-112px)] w-full lg:w-4/5 border border-gray-300 shadow-lg rounded-lg p-4 bg-white m-4 overflow-auto">
          <div className="h-full flex flex-col justify-between">
            {/* Header Section */}
            <div className="w-full flex justify-between items-center mb-6">
              <h1 className="font-bold text-4xl text-gray-800">My Profile</h1>
              <button
                className="py-2 px-6 border border-green-600 rounded-full font-bold text-xl text-green-600 hover:bg-green-600 hover:text-white transition-all ease-in-out duration-200 shadow-md"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? "Cancel" : "Edit"}
              </button>
            </div>

            <div className="flex-grow overflow-y-auto">
              {/* Profile Section */}
              <div className="flex flex-col lg:flex-row justify-between mb-6">
                <div className="flex-grow p-4">
                  <ul className="list-disc list-inside">
                    <li className="py-2"><strong>Name:</strong> {name}</li>
                    <li className="py-2"><strong>Title / Position:</strong> {title}</li>
                    <li className="py-2"><strong>Institution / Department:</strong> {Department}</li>
                    <li className="py-2"><strong>Contact Information:</strong> {contact}</li>
                  </ul>
                </div>
                <Image
                  src={imageURL}
                  width={600}
                  height={800}
                  alt="user image"
                  className="h-40 w-32 border border-gray-300 rounded-lg shadow-md m-4"
                />
              </div>

              {/* About Me Section */}
              <div className="my-6">
                <h1 className="font-bold text-3xl text-gray-800">About Me</h1>
                <p className="my-2 text-gray-700">{aboutMe}</p>
              </div>

              {/* My Courses Section */}
              <div className="my-6">
                <h1 className="font-bold text-3xl text-gray-800">My Courses</h1>
                <ul className="py-2">
                  {course_list.length === 0 ? (
                    <p className="text-gray-600">No courses available</p>
                  ) : (
                    course_list.map((course, index) => (
                      <div key={index} className="border-b border-gray-300 py-2">
                        <h2 className="text-lg text-gray-800">{index + 1}. {course.course_title}</h2>
                      </div>
                    ))
                  )}
                </ul>
              </div>

              {/* Achievements / Certifications Section */}
              <div className="my-6">
                <h1 className="font-bold text-3xl text-gray-800">Achievements / Certifications</h1>
                <ul>
                  {achievements ? (
                    achievements.map((achievement, index) => (
                      <li key={index} className="text-gray-600 py-1">{achievement}</li>
                    ))
                  ) : (
                    <p className="text-center">No Achievements available</p>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Profile Form */}
        {isEditing && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-5">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg mx-4 space-y-6 overflow-y-auto max-h-[90vh]"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Profile</h2>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter name"
                  {...register("name", { required: "Name is required" })}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-400 transition duration-150"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              </div>

              {/* Title/Position Input */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title/Position
                </label>
                <input
                  type="text"
                  id="title"
                  {...register("title", { required: "Title is required" })}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-400 transition duration-150"
                />
                {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
              </div>

              {/* Institution/Department Input */}
              <div>
                <label htmlFor="institution" className="block text-sm font-medium text-gray-700">
                  Institution/Department
                </label>
                <input
                  type="text"
                  id="institution"
                  {...register("institution", { required: "Institution is required" })}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-400 transition duration-150"
                />
                {errors.institution && <p className="text-red-500 text-sm">{errors.institution.message}</p>}
              </div>

              {/* Contact Information Input */}
              <div>
                <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
                  Contact Information
                </label>
                <input
                  type="text"
                  id="contact"
                  {...register("contact", { required: "Contact information is required" })}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-400 transition duration-150"
                />
                {errors.contact && <p className="text-red-500 text-sm">{errors.contact.message}</p>}
              </div>

              {/* About Me Textarea */}
              <div>
                <label htmlFor="aboutMe" className="block text-sm font-medium text-gray-700">
                  About Me
                </label>
                <textarea
                  id="aboutMe"
                  {...register("aboutMe", { required: "About Me is required" })}
                  rows="4"
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-400 transition duration-150"
                />
                {errors.aboutMe && <p className="text-red-500 text-sm">{errors.aboutMe.message}</p>}
              </div>

              {/* Achievements Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Achievements</label>
                {fields.map((field, index) => (
                  <div key={field.id} className="mb-2 flex items-center space-x-2">
                    <input
                      type="text"
                      {...register(`achievements.${index}.achievement`, { required: "Achievement is required" })}
                      className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-400 transition duration-150"
                      placeholder={`Achievement ${index + 1}`}
                    />
                    <button
                      type="button"
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                      onClick={() => remove(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => append({ achievement: "" })}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                  + Add Achievement
                </button>
              </div>

              {/* Image Upload Field */}
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="image">Image</label>
                <input
                  type="file"
                  {...register("file", {
                    onChange: (e) => {
                      const file = e.target.files[0];
                      if (file) setFileList(file);
                    },
                  })}
                />
                {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
              </div>


              {/* Submit Button */}
              <div>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Save
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>

  );
};

export default page;
