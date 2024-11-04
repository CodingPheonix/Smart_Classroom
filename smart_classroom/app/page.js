// "use client"
// import Web_logo from "./Components/Web_logo";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useRouter } from 'next/navigation'
// import { v4 as uuidv4 } from 'uuid';
// import { useSelector, useDispatch } from 'react-redux'
// import { setText, clearText } from "./redux/counter/counterSlice";
// import { FaEye } from "react-icons/fa";  // reveal password
// import { BiSolidHide } from "react-icons/bi"; // hide password

// export default function Home() {

//   const [islearnerlogin, setIslearnerlogin] = useState(false)
//   const [IsInstructorlogin, setIsInstructorlogin] = useState(false)
//   const [isLogin, setIsLogin] = useState(true);
//   const [message, setMessage] = useState("")

//   const router = useRouter()
//   const dispatch = useDispatch()

//   // store the id of the current user
//   const user_id = useSelector(state => state.counter.text)
//   console.log(user_id)
//   // API Routes
//   const upload_login_details = async (data) => {
//     const responce = await fetch('http://localhost:5000/upload_login_details', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(data)
//     })
//     // const result = await responce.json()
//     // console.log(result);
//     return responce
//   }

//   const verify_user_auth = async (data) => {
//     const responce = await fetch('http://localhost:5000/verify_user_auth', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(data)
//     })
//     // const result = await responce.json()
//     // console.log(result);
//     return responce
//   }

//   const { register, handleSubmit, errors, reset } = useForm()

//   // Form Submits
//   const LearnerOnSubmit = async (data) => {
//     console.log({ ...data, id: uuidv4(), hasAccount: isLogin });
//     let response;

//     if (isLogin) {
//       response = await verify_user_auth(data);
//     } else {
//       response = await upload_login_details({ ...data, id: uuidv4(), position: "Learner" });
//     }

//     const result = await response.json(); 

//     if (response.status === 200) {
//       setIslearnerlogin(!islearnerlogin);
//       reset();
//       if (isLogin) {
//         dispatch(setText(result.account.candidate_id))
//       }else{
//         dispatch(setText(result.data.candidate_id))
//       }
//       router.push('/Learner'); 
//     } else {
//       setMessage(result.message || "An error occurred");
//     }
//   }

//   const InstructorOnSubmit = async (data) => {
//     console.log({ ...data, id: uuidv4(), hasAccount: isLogin });
//     let response;

//     if (isLogin) {
//       response = await verify_user_auth(data);
//     } else {
//       response = await upload_login_details({ ...data, id: uuidv4(), position: "Instructor" });
//     }
//     const result = await response.json(); // Get the JSON response
//   console.log(result);

//     // Check for successful status code
//     if (response.status === 200) {
//       setIsInstructorlogin(!IsInstructorlogin);
//       reset();
//       if (isLogin) {
//         dispatch(setText(result.account.candidate_id))
//       }else{
//         dispatch(setText(result.data.candidate_id))
//       }
//       router.push('/Instructor'); // Navigate only on success
//     } else {
//       // Display the error message returned from the server
//       setMessage(result.message || "An error occurred");
//     }
//   }


//   return (
//     <>
//       <div className="h-full">
//         {/* <Learner_login /> */}
//         <div className="first_section flex flex-col justify-evenly items-center h-2/3 bg-green-200">
//           <div className="text-5xl">
//             <Web_logo />
//           </div>
//           <div>
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, reprehenderit?
//           </div>
//           <div className="buttons flex justify-around items-center gap-3">
//             <button onClick={() => { setIsInstructorlogin(!IsInstructorlogin) }} className="px-4 py-2 bg-green-600 text-white font-bold rounded-full hover:bg-green-700 active:bg-green-800">Instructor's Login</button>
//             <button onClick={() => { setIslearnerlogin(!islearnerlogin) }} className="px-4 py-2 bg-green-600 text-white font-bold rounded-full hover:bg-green-700 active:bg-green-800">Learner's Login</button>
//           </div>
//         </div>
//         <div className="partition h-1 bg-green-400"></div>
//         <div className="second_section flex flex-col justify-evenly items-center h-2/3 bg-green-200">
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, ipsa!
//         </div>
//         <div className="partition h-1 bg-green-400"></div>
//         <div className="third_section flex flex-col justify-evenly items-center h-2/3 bg-green-200">
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, ipsa!
//         </div>

//         {/* Login form for LEARNER */}
//         {islearnerlogin && (
//           <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-around items-center border-green-600 bg-green-400 px-8 py-6 rounded-lg shadow-lg'>
//             <h1 className='px-4 py-2 font-bold text-2xl mb-4 text-white'>
//               {isLogin ? 'Learner Login' : 'Learner Sign Up'}
//             </h1>

//             <form className='flex flex-col justify-around items-start w-full' onSubmit={handleSubmit(LearnerOnSubmit)}>
//               {!isLogin && (
//                 <>
//                   <label className='text-white' htmlFor="name">Name</label>
//                   <input
//                     className='px-4 py-2 mb-2 w-full rounded-lg'
//                     type="text"
//                     {...register("name", { required: !isLogin })}
//                   />
//                 </>
//               )}

//               <label className='text-white' htmlFor="email">Email</label>
//               <input
//                 className='px-4 py-2 mb-2 w-full rounded-lg'
//                 type="email"
//                 {...register("email", { required: true })}
//               />

//               <label className='text-white' htmlFor="password">Password</label>
//               <input
//                 className='px-4 py-2 mb-2 w-full rounded-lg'
//                 type="password"
//                 {...register("password", { required: true })}
//               />

//               <input
//                 className='px-6 py-2 mt-2 rounded-full bg-green-500 text-white font-semibold w-full hover:bg-green-600 transition duration-300'
//                 type="submit"
//                 value={isLogin ? 'Login' : 'Sign Up'}
//               />
//             </form>

//             <p className='text-white mt-4'>
//               {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
//               <span
//                 onClick={() => setIsLogin(!isLogin)}
//                 className='underline cursor-pointer hover:text-gray-300 transition duration-300'>
//                 {isLogin ? 'Sign Up' : 'Login'}
//               </span>
//             </p>
//             <p className="text-red-600">*{message}</p>
//           </div>
//         )}
//         {/* Login form for Instructor */}
//         {IsInstructorlogin && (
//           <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-around items-center border-green-600 bg-green-400 px-8 py-6 rounded-lg shadow-lg'>
//             <h1 className='px-4 py-2 font-bold text-2xl mb-4 text-white'>
//               {isLogin ? 'Instructor Login' : 'Instructor Sign Up'}
//             </h1>

//             <form className='flex flex-col justify-around items-start w-full' onSubmit={handleSubmit(InstructorOnSubmit)}>
//               {!isLogin && (
//                 <>
//                   <label className='text-white' htmlFor="name">Name</label>
//                   <input
//                     className='px-4 py-2 mb-2 w-full rounded-lg'
//                     type="text"
//                     {...register("name", { required: !isLogin })}
//                   />
//                 </>
//               )}

//               <label className='text-white' htmlFor="email">Email</label>
//               <input
//                 className='px-4 py-2 mb-2 w-full rounded-lg'
//                 type="email"
//                 {...register("email", { required: true })}
//               />

//               <label className='text-white' htmlFor="password">Password</label>
//               <input
//                 className='px-4 py-2 mb-2 w-full rounded-lg'
//                 type="password"
//                 {...register("password", { required: true })}
//               />

//               <input
//                 className='px-6 py-2 mt-2 rounded-full bg-green-500 text-white font-semibold w-full hover:bg-green-600 transition duration-300'
//                 type="submit"
//                 value={isLogin ? 'Login' : 'Sign Up'}
//               />
//             </form>

//             <p className='text-white mt-4'>
//               {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
//               <span
//                 onClick={() => setIsLogin(!isLogin)}
//                 className='underline cursor-pointer hover:text-gray-300 transition duration-300'>
//                 {isLogin ? 'Sign Up' : 'Login'}
//               </span>
//             </p>
//             <p className="text-red-600">*{message}</p>
//           </div>
//         )}

//       </div>
//     </>
//   );
// }



"use client"
import { useState } from "react";
import { useRouter } from 'next/navigation'
import Image from "next/image";

import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux'
import { FaEye } from "react-icons/fa";  // reveal password
import { BiSolidHide } from "react-icons/bi"; // hide password

import { setText } from "./redux/counter/counterSlice";
import Web_logo from "./Components/Web_logo";
import logo from './Images/a logo for a web-based classroom app where students and teachers come together to study.png'

export default function Home() {
  const [islearnerlogin, setIslearnerlogin] = useState(false)
  const [IsInstructorlogin, setIsInstructorlogin] = useState(false)
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");

  // Password visibility states
  const [showLearnerPassword, setShowLearnerPassword] = useState(false);
  const [showInstructorPassword, setShowInstructorPassword] = useState(false);

  const router = useRouter()
  const dispatch = useDispatch()

  const user_id = useSelector(state => state.counter.text)

  // API Routes
  const upload_login_details = async (data) => {
    const response = await fetch('http://localhost:5000/upload_login_details', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return response
  }

  const verify_user_auth = async (data) => {
    const response = await fetch('http://localhost:5000/verify_user_auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return response
  }

  const { register, handleSubmit, reset } = useForm()

  // Form submits for learners
  const LearnerOnSubmit = async (data) => {
    let response;

    if (isLogin) {
      response = await verify_user_auth(data);
    } else {
      response = await upload_login_details({ ...data, id: uuidv4(), position: "Learner" });
    }

    const result = await response.json();

    if (response.status === 200) {
      setIslearnerlogin(!islearnerlogin);
      reset();
      dispatch(setText(result.account.candidate_id));
      router.push('/Learner');
    } else {
      setMessage(result.message || "An error occurred");
    }
  }

  // Form submits for instructors
  const InstructorOnSubmit = async (data) => {
    let response;

    if (isLogin) {
      response = await verify_user_auth(data);
    } else {
      response = await upload_login_details({ ...data, id: uuidv4(), position: "Instructor" });
    }

    const result = await response.json();

    if (response.status === 200) {
      setIsInstructorlogin(!IsInstructorlogin);
      reset();
      dispatch(setText(result.account.candidate_id));
      router.push('/Instructor');
    } else {
      setMessage(result.message || "An error occurred");
    }
  }

  // This will run after the page loads
  window.addEventListener("load", () => {
    document.querySelector(".logo").classList.add("show");
    document.querySelector(".logo_text").classList.add("show");
    document.querySelector(".logo_image1").classList.add("show");

    document.querySelectorAll(".buttons").forEach(button => {
      button.classList.add("show");
    });
  });



  return (
    <>
      <div className="h-full relative">
        {/* <div className="first_section flex flex-col justify-evenly items-center h-[calc(100vh-5rem)] bg-green-200">
          <div className="text-5xl">
            <Web_logo />
          </div>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, reprehenderit?
          </div>
          <div className="buttons flex justify-around items-center gap-3">
            <button onClick={() => { setIsInstructorlogin(!IsInstructorlogin) }} className="px-4 py-2 bg-green-600 text-white font-bold rounded-full hover:bg-green-700 active:bg-green-800">Instructor's Login</button>
            <button onClick={() => { setIslearnerlogin(!islearnerlogin) }} className="px-4 py-2 bg-green-600 text-white font-bold rounded-full hover:bg-green-700 active:bg-green-800">Learner's Login</button>
          </div>
        </div>
        <div className="partition h-1 bg-green-400"></div>
        <div className="second_section flex flex-col justify-evenly items-center h-2/3 bg-green-200">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, ipsa!
        </div>
        <div className="partition h-1 bg-green-400"></div>
        <div className="third_section flex flex-col justify-evenly items-center h-2/3 bg-green-200">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, ipsa!
        </div> */}

        <div className="flex flex-col-reverse md:flex-row justify-around items-center overflow-hidden h-[calc(100vh-5rem)] relative">
          <div className="relative z-10 flex flex-col gap-11">
            <div className="bg1 absolute bg-green-200 md:h-[150vh] md:w-[150vh] h-[200vh] w-[200vh] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:rotate-45 rounded-3xl z-0"></div>
            <div className="bg2 absolute bg-green-300 md:h-[150vh] md:w-[150vh] h-[200vh] w-[200vh] left-1/2 top-1/2 -translate-x-[60%] -translate-y-1/2 md:rotate-45 rounded-3xl z-0"></div>
            <div className="bg3 absolute bg-green-400 md:h-[150vh] md:w-[150vh] h-[200vh] w-[200vh] left-1/2 top-1/2 -translate-x-[70%] -translate-y-1/2 md:rotate-45 rounded-3xl z-0"></div>

            <div className="">
              <div className="logo text-6xl relative z-20 py-4">
                <Web_logo />
              </div>
              <p className="logo_text relative z-20 px-4">Where Learning Connects....</p>
            </div>
            <div className="relative z-20 flex lg:flex-row flex-col gap-4">
              <button onClick={() => { setIsInstructorlogin(!IsInstructorlogin) }} className="buttons px-6 py-3 rounded-full border-2 border-white text-white font-bold bg-green-600 hover:bg-green-700 shadow-lg transform hover:scale-105 transition-all ease-in-out duration-300">
                Instructor's Login
              </button>
              <button onClick={() => { setIslearnerlogin(!islearnerlogin) }} className="buttons px-6 py-3 rounded-full border-2 border-white text-white font-bold bg-green-600 hover:bg-green-700 shadow-lg transform hover:scale-105 transition-all ease-in-out duration-300">
                Learner's Login
              </button>

            </div>
          </div>
          <Image src={logo} height={300} width={300} alt="Picture of the author" className="logo_image1 relative md:-right-20 z-20 shadow-2xl shadow-slate-500 rotate-3" />
        </div>

        <div className="h-[60vh] p-3 text-center flex justify-center items-center bg-green-500 text-white text-3xl font-bold shadow-md">
          Empower Learning Anytime, Anywhere!
        </div>
        <div className="h-[60vh] p-3 text-center flex justify-center items-center bg-green-600 text-white text-3xl font-bold shadow-md">
          Streamline Collaboration for a Brighter Future!
        </div>
        <div className="h-[60vh] p-3 text-center flex justify-center items-center bg-green-700 text-white text-3xl font-bold shadow-md">
          Organize, Engage, Succeed!
        </div>



        {/* Login form for LEARNER */}
        {islearnerlogin && (
          <div className='absolute lg:w-1/2 w-3/4 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-around items-center border-white bg-green-400 px-8 py-6 rounded-lg shadow-lg z-30'>
            <h1 className='px-4 py-2 font-bold text-2xl mb-4 text-white'>
              {isLogin ? 'Learner Login' : 'Learner Sign Up'}
            </h1>

            <form className='flex flex-col justify-around items-start w-full' onSubmit={handleSubmit(LearnerOnSubmit)}>
              {!isLogin && (
                <>
                  <label className='text-white' htmlFor="name">Name</label>
                  <input
                    className='px-4 py-2 mb-2 w-full rounded-lg'
                    type="text"
                    {...register("name", { required: !isLogin })}
                  />
                </>
              )}

              <label className='text-white' htmlFor="email">Email</label>
              <input
                className='px-4 py-2 mb-2 w-full rounded-lg'
                type="email"
                {...register("email", { required: true })}
              />

              <label className='text-white' htmlFor="password">Password</label>
              <div className="relative w-full">
                <input
                  className='px-4 py-2 mb-2 w-full rounded-lg'
                  type={showLearnerPassword ? "text" : "password"}
                  {...register("password", { required: true })}
                />
                <button
                  type="button"
                  onClick={() => setShowLearnerPassword(!showLearnerPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  {showLearnerPassword ? <BiSolidHide /> : <FaEye />}
                </button>
              </div>

              <input
                className='px-6 py-2 mt-2 rounded-full bg-green-500 text-white font-semibold w-full hover:bg-green-600 transition duration-300'
                type="submit"
                value={isLogin ? 'Login' : 'Sign Up'}
              />
            </form>

            <p className='text-white mt-4'>
              {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
              <span
                onClick={() => setIsLogin(!isLogin)}
                className='underline cursor-pointer hover:text-gray-300 transition duration-300'>
                {isLogin ? 'Sign Up' : 'Login'}
              </span>
            </p>
            <p className="text-red-600">*{message}</p>
          </div>
        )}

        {/* Login form for Instructor */}
        {IsInstructorlogin && (
          <div className='absolute lg:w-1/2 w-3/4 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-around items-center border-white bg-green-400 px-8 py-6 rounded-lg shadow-lg z-30'>
            <h1 className='px-4 py-2 font-bold text-2xl mb-4 text-white'>
              {isLogin ? 'Instructor Login' : 'Instructor Sign Up'}
            </h1>

            <form className='flex flex-col justify-around items-start w-full' onSubmit={handleSubmit(InstructorOnSubmit)}>
              {!isLogin && (
                <>
                  <label className='text-white' htmlFor="name">Name</label>
                  <input
                    className='px-4 py-2 mb-2 w-full rounded-lg'
                    type="text"
                    {...register("name", { required: !isLogin })}
                  />
                </>
              )}

              <label className='text-white' htmlFor="email">Email</label>
              <input
                className='px-4 py-2 mb-2 w-full rounded-lg'
                type="email"
                {...register("email", { required: true })}
              />

              <label className='text-white' htmlFor="password">Password</label>
              <div className="relative w-full">
                <input
                  className='px-4 py-2 mb-2 w-full rounded-lg'
                  type={showInstructorPassword ? "text" : "password"}
                  {...register("password", { required: true })}
                />
                <button
                  type="button"
                  onClick={() => setShowInstructorPassword(!showInstructorPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  {showInstructorPassword ? <BiSolidHide /> : <FaEye />}
                </button>
              </div>

              <input
                className='px-6 py-2 mt-2 rounded-full bg-green-500 text-white font-semibold w-full hover:bg-green-600 transition duration-300'
                type="submit"
                value={isLogin ? 'Login' : 'Sign Up'}
              />
            </form>

            <p className='text-white mt-4'>
              {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
              <span
                onClick={() => setIsLogin(!isLogin)}
                className='underline cursor-pointer hover:text-gray-300 transition duration-300'>
                {isLogin ? 'Sign Up' : 'Login'}
              </span>
            </p>
            <p className="text-red-600">*{message}</p>
          </div>
        )}
      </div>
    </>
  );
}
