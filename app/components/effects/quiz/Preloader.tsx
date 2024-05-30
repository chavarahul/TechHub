'use client'
import { poppin } from '@/app/constants'
import React, { useEffect } from 'react'
import gsap from 'gsap';
import { Power4 } from 'gsap';
import CallMadeIcon from '@mui/icons-material/CallMade';
import ScrollTrigger from 'gsap-trial/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger)
import { useRouter } from 'next/navigation';
const Hero = () => {
  const router = useRouter();
  const words: string = "Quiz"; const words2: String = "Zynergy";
  const wordsArray: string[] = ["Empower users with code-free application", "development using AI-driven tools, enhancing", "productivity and efficiency in leveraging", "technology"]
  useEffect(() => {
    const t1 = gsap.timeline();

    t1.to('.Intro p', {
      y: 0,
      delay: 0.1,
      opacity: 1,
      duration: 0.7,
      // ease: Power4.easeInOut,
      stagger: 0.4
    })
      .to('.Intro p', {
        y: 200,
        delay: 0.2,
        duration: 0.8,
        opacity: 0
      })
      .to(".Split span", {
        y: 0,
        ease: 'back.out',
        delay: 0.5,
        duration: 1,
        stagger: 0.02,
        opacity: 1
      })
      .fromTo('#side',
        { translateX: 0 },
        { translateX: "-900px", ease: Power4.easeInOut, duration: 2 }
      )
      .fromTo('.Spliter',
        { translateX: 0 },
        { translateX: "1200px", ease: Power4.easeInOut, duration: 2 },
        "<"
      ).to('.EmptyUP', {
        opacity: 0,
        display: 'none'
      }).to('.highlight span', { width: '100%', backgroundColor: '#fff', color: '#090909', duration: 1, delay: 1.7, ease: 'back.inOut' },)
      .to('.err span', { width: '100%', backgroundColor: '#fff', color: '#090909', duration: 1, delay: 0.4, ease: 'back.inOut' },)
      

  }, []);
  const letters = words.split("");
  const letters2 = words2.split("");
  return (
    <section className='absolute top-0 left-0 w-full h-screen flex flex-col Sizer  bg-[#090909] z-[999999] EmptyUP'>
      <div className="absolute top-56 w-full h-[40%] text-center overflow-hidden Intro">
        <p className={`${poppin.className} font-extrabold fonter textColorBg capitalize flex Split text-center flex-center  w-full h-full `} style={{ transform: 'translateY(-200px)', opacity: 0 }}>
          Introducing
        </p>
      </div>
      <div className=" w-full  min-h-[25%] max-h-[60%] flex mt-20">
        <div className=" w-[69%] Charitha  h-full relative overflow-hidden">
          <p className={`${poppin.className} font-extrabold fonter textColorBg flex Split`} id="side">
            {/* <span className=" absolute top-10 left-40  w-[50px] h-[50px] rounded-full  flex-center">
                            <p className={`${poppin.className} flex-center bg-white rounded-full text-sm AI text-black`}>AI</p>
                        </span> */}
            {letters.map((letter: string, index: number) => (
              <span key={index} className={`${poppin.className} font-extrabold textColorBg`}>{letter}</span>
            ))
            }
          </p>
        </div>
      </div>
      <div className=" w-full min-h-[25%] max-h-[60%] flex justify-end SidersBall">
        <div className=" w-[65%] Charitha h-full relative flex-center overflow-hidden ">
          <p className={`${poppin.className} font-extrabold  textColorBg Split fonter Spliter  flex-center`}>
            {
              letters2.map((letter: string, index: number) => (
                <span key={index} className={`${poppin.className}  font-extrabold  textColorBg`}>{letter}</span>
              ))
            }
          </p>
        </div>
      </div>
    </section>
  )
}

export default Hero
