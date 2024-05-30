import React from "react";
import { Vortex } from "./Vortex";
import { poppin } from "@/app/constants";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";

export function VortexDemoSecond() {
  return (
    <div className="w-[100%] mx-auto rounded-md  h-screen overflow-hidden bg-black z-[9999999] ">
      <Vortex
        backgroundColor=""
        rangeY={800}
        particleCount={500}
        baseHue={200}
        className="flex items-center flex-col justify-center px-2 md:px-10  py-4 w-full h-full"
      >
        <h2 className={`${poppin.className} text-white textColorBg text-2xl md:text-5xl pb-4 font-bold text-center -mt-10`}>
          Quiz Zynergy
        </h2>
        <p className={`text-white text-lg  max-w-[67rem] mt-6 text-center leading-8 space letter ${poppin.className}`}>
          An intelligent, <span className="highlight  pl-2"><span className="h-full w-0">multilingual quiz bot</span> </span> that generates unique quizzes based on user content or topics. It offers high-security systems, real-time doubt resolution, and <span className="highlight "><span className="h-full">customizable difficulty levels.</span></span> Detailed solutions for previous quizzes are stored, providing a comprehensive and secure learning experience.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-32">
          {/* <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]">
            Order now
          </button>
          <button className="px-4 py-2  text-white ">Watch trailer</button> */}
          <div className={`${poppin.className} w-full h-full`}>
            Scroll down
            <div className="inline">
              <KeyboardArrowDown />
            </div>
          </div>
        </div>
      </Vortex>
    </div>
  );
}
