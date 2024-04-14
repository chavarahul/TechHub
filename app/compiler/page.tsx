'use client'
import React from 'react'
import { poppin } from '../constants'
import AICompiler from '../components/AICompiler'
import gsap from 'gsap'
import Transition from '../components/effects/Transition'
const page = () => {
  const home = gsap.timeline()
  return (
    <>
     <Transition timeline={home} />
      <section className=' h-screen relative w-full'>
        <div className=" h-[20%] flex-colm">
          <h3 className={`${poppin.className} text-2xl font-medium`}>
            Compiler Enhanced with <span className=' textColorBg shadow'>AI Debugging and Explanation </span>
          </h3>
          <p className={`${poppin.className} text-lg text-center px-40 leading-10`}>
            The AI-powered compiler provides clear and concise code explanations, aiding developers in comprehending complex concepts and fostering learning through interactive exploration of code explanations.</p>
        </div>
        <div className=" h-[50%] relative w-full flex-center mt-16">
          <div className="w-[30%]  h-full flex flex-col justify-between relative">
            <div className="w-full  h-[15%] flex-center">Integrated Code Editor</div>
            <div className="w-full  h-[15%] flex items-center justify-between relative">
              <p>AI Debugging</p>
              <p>AI Explanation</p>
            </div>
            <div className="border textColorBg  shadow absolute h-[75%] top-12 left-[9.7rem] rotate-[30deg]"></div>
            <div className="border textColorBg  shadow absolute h-[75%] top-12 right-[9.7rem] rotate-[-30deg]"></div>
            <div className="border textColorBg  shadow absolute w-[35%] top-[13rem]  left-[9.3rem]"></div>
          </div>
          <div className="w-[20%]  h-full flex flex-col justify-between relative">
            <div className="w-full  h-[15%] flex-center">Code Execution</div>
            <div className="w-full  h-[15%] flex-center">Speech Interaction</div>
            <div className="absolute border  shadow top-16 left-36 h-[65%]"></div>
          </div>
        </div>
      </section>
      <AICompiler />
    </>
  )
}

export default page