import Image from "next/image";
import Web_logo from "./Components/Web_logo";

export default function Home() {
  return (
    <>
      <div className="h-full">
        <div className="first_section flex flex-col justify-evenly items-center h-2/3 bg-green-200">
          <div className="text-5xl">
            <Web_logo />
          </div>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, reprehenderit?
          </div>
          <div className="buttons flex justify-around items-center gap-3">
            <button className="px-4 py-2 bg-green-600 text-white font-bold rounded-full hover:bg-green-700 active:bg-green-800">Instructor's Login</button>
            <button className="px-4 py-2 bg-green-600 text-white font-bold rounded-full hover:bg-green-700 active:bg-green-800">Learner's Login</button>
          </div>
        </div>
        <div className="partition h-1 bg-green-400"></div>
        <div className="second_section flex flex-col justify-evenly items-center h-2/3 bg-green-200">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, ipsa!
        </div>
        <div className="partition h-1 bg-green-400"></div>
        <div className="third_section flex flex-col justify-evenly items-center h-2/3 bg-green-200">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, ipsa!
        </div>
      </div>
    </>
  );
}
