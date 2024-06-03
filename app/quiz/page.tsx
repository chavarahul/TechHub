'use client'
import React, { useEffect, useState } from 'react'
import Hero from '../components/effects/quiz/Preloader'
import { VortexDemoSecond } from '../components/ui/VortexDemo'
import { poppin } from '../constants'
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import ArrowForward from '@mui/icons-material/ArrowForward'
import Mock from '../components/QuizPages/Mock'
import Real from '../components/QuizPages/Real'
import Profressional from '../components/QuizPages/Profressional'

const Page = () => {
  const [option, setOption] = useState<string>(()=>{return localStorage.getItem('option')|| '';})
  const [input, setInput] = useState<string>(()=>{return localStorage.getItem('input')|| '';})
  const [checker, setChecker] = useState<boolean>(false)
  const [prompt,setPrompt] =useState<string>('')
  const Test: any = [
    { name: "Mock test" },
    { name: "Competitive test" },
    { name: "Professional test" }
  ]
  const handleOptionChange = (name: string) => {
    setOption(name);
  }
  const select: any = [
    { name: "Topic" },
    { name: "Content" },
    { name: "Upload" }
  ]
  
  useEffect(() => {
    localStorage.setItem('option', option);
  }, [option]);

  useEffect(() => {
    localStorage.setItem('input', input);
  }, [input]);

  
  return (
    <>
      <Hero />
      <div className=' w-full min-h-[86vh] relative bg-[black]'>
        <VortexDemoSecond />
        <div className='w-full relative min-h-screen'>
          <div className="w-full  min-h-[9rem] flex-colm leading-10 ">
            <p className={`${poppin.className} text-4xl capitalize`}>Design your own unique quiz</p>
            <p className={`${poppin.className} text-lg mt-2`}>
              Options for customizing the quiz will be provided. Please make your selections below.</p>
          </div>
          <div className=" min-h-[85vh] w-full relative" >
            <div className="h-[7%]  w-full relative flex-all mt-9">
              {
                Test.map((t: any, ind: number) => (
                  <div className=" h-full flex-all " key={ind}>
                    <input type="radio" name="quizOption" className=' cursor-pointer h-4 w-4 text-[#090909]' id={`${ind}`} onChange={() => handleOptionChange(t.name)} checked={t.name === option} />
                    <p className={`${poppin.className} ml-3`}>{t.name}</p>
                  </div>
                ))
              }
            </div>
            {
              option !== '' &&
              <div className=" w-full h-[7%] mt-14 flex-all">
                <div className="flex-all w-[20%] relative">
                  <p className={`${poppin.className} text-md cursor-pointer`} onClick={() => { setChecker(!checker) }}>Select your input type</p>
                  <KeyboardArrowDown className=' cursor-pointer text-3xl mt-1' onClick={() => setChecker(!checker)} />
                  {
                    checker && <div className='absolute w-full h-[200px] top-16 left-7 z-[999]'>
                      {
                        select?.map((t: any, ind: number) => (
                          <div className="w-full px-4 h-[20%] relative flex items-center" key={ind}>
                            <label className="container">
                              <input type="checkbox"
                                value={t.name}
                                onChange={() => { setInput(t.name) }}
                                checked={input === t.name}
                                // onClick={()=>setChecker(false)}
                              />
                              <svg viewBox="0 0 64 64" height="1.3em" width="1.3em">
                                <path
                                  d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                                  pathLength="575.0541381835938"
                                  className="path"
                                />
                              </svg>
                            </label>
                            <p className={`${poppin.className}`}>{t.name}</p>
                          </div>
                        ))
                      }
                    </div>
                  }
                </div>
                <div className="relative w-[20%] h-full">
                  {
                    (input === 'Topic' || input === 'Content') ?(<>
                      <input
                        placeholder={`Enter your ${input}`}
                        className={`relative pr-20 bg-transparent ring-0 outline-none border border-neutral-500 text-white placeholder-white text-sm rounded-lg focus:ring-violet-500 placeholder-opacity-60 focus:border-violet-500 block w-full p-2.5 checked:bg-emerald-500 ${poppin.className}`}
                        type="text"
                        value={prompt}
                        onChange={(e) => {
                          console.log('Input value:', e.target.value);
                          setPrompt(e.target.value);
                        }}
                      />
                      <button type="button" className=" absolute top-1 right-3 text-2xl text-white cursor-pointer">
                       <ArrowForward/>
                      </button>
                    </>):( input !== '' &&
                      <>
                      <input type="file" name="" id="" className='mt-2' />
                      <button type="submit" className=" absolute top-1 right-3 text-2xl text-white cursor-pointer">
                       <ArrowForward/>
                      </button>
                      </>
                    )
                  }
                </div>
              </div>
            }

           {(input!== '' && option=== 'Mock test')&& <Mock test={input||''} prompt={prompt} option={option}/>}
           {(input!== '' && option=== 'Competitive test')&& <Real test={input||''} prompt={prompt} option={option}/>}
           {(input!== '' && option=== 'Professional test')&& <Profressional test={input||''} prompt={prompt} option={option}/>}

          </div>
        </div>
        
      </div>
    </>
  )
}

export default Page