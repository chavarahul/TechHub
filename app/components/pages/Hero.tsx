'use client'
import { poppin } from '@/app/constants'
import React, { useEffect } from 'react'
import gsap from 'gsap';
import CallMadeIcon from '@mui/icons-material/CallMade';
import ScrollTrigger from 'gsap-trial/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger)
import { useRouter } from 'next/navigation';
const Hero = () => {
    const router = useRouter();
    const words: string = "AIFlEXI"; const words2: String = "GENIUS";
    const wordsArray: string[] = ["Empower users with code-free application", "development using AI-driven tools, enhancing", "productivity and efficiency in leveraging", "technology"]
    useEffect(() => {
        const t1 = gsap.timeline();
        t1.to(".Split span", {
            y: 0,
            ease: 'back.out',
            delay: 0.5,
            duration: 1,
            stagger: 0.02,
            opacity: 1
        }).to('.SideCircle', {
            opacity: 1,
            duration: 1,
            delay: 0.1
        }).to('.LineBox p', {
            y: 0,
            duration: 0.5,
            delay: 0.2,
            ease: 'back.out',
            opacity: 1,
            stagger: 0.09
        })

         gsap.fromTo('#side',{translateX:0},{translateX:"-900px",ease:"power4.out",duration:0.0001,scrollTrigger:{
            trigger:'#side',
            start:"top 10%",
            end:'4000 top',
            scrub:true,
            
         }})
         gsap.fromTo('.Spliter',{translateX:0},{translateX:"1000px",ease:"power4.out",duration:0.0001,scrollTrigger:{
            trigger:'.Spliter',
            start:"top 50%",
            end:'4000 top',
            scrub:true
         }})
         gsap.fromTo('.LineBox p',{translateY:0},{translateY:"-200px",ease:"power3.out",duration:1,delay:1,scrollTrigger:{
            trigger:'.LineBox p',
            start:"top 60%",
            end:'4000 top',
            scrub:true
         }})
        
    });
    const letters = words.split("");
    const letters2 = words2.split("");
    return (
        <section className='relative w-full h-[88vh] ml-10 flex flex-col '>
            <div className=" w-full h-1/2 relative flex">
                <div className=" w-[69%] h-full relative overflow-hidden">
                    <p className={`${poppin.className} font-extrabold text-[13rem] textColorBg flex Split`} id="side">
                        {/* <span className="borders absolute top-10 left-40 borders w-[50px] h-[50px] rounded-full  flex-center">
                            <p className={`${poppin.className} flex-center bg-white rounded-full text-sm AI text-black`}>AI</p>
                        </span> */}
                        {letters.map((letter:string, index:number) => (
                            <span key={index} className={`${poppin.className} font-extrabold text-[13rem] textColorBg`}>{letter}</span>
                        ))
                        }
                    </p>
                </div>
                <div className=" h-full w-[35%] relative flex-center" onClick={()=>{router.push('/#about')}}>
                    <div className="rounded-full w-1/2 h-[70%] borders CircleFull SideCircle relative overflow-hidden borders flex-center">
                        <CallMadeIcon className="text-white z-10 text-[6.5rem] icon" />
                    </div>
                </div>
            </div>
            <div className=" w-full h-[40%] relative flex">
                <div className="w-[35%] h-full relative flex items-center mt-8">
                    <div className="w-full h-full flex items-start justify-center flex-col ">
                        {
                            wordsArray?.map((t:string,index:number) => (
                                <div key={index} className='overflow-hidden LineBox mb-2'>
                                    <p className={`${poppin.className} text-xl leading-9`}>{t}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className=" w-[65%] h-full relative flex-center overflow-hidden ">
                    <p className={`${poppin.className} font-extrabold text-[12rem] textColorBg Split Spliter flex-center`}>
                        {
                            letters2.map((letter:string, index:number) => (
                                <span key={index} className={`${poppin.className}  font-extrabold text-[13rem] textColorBg`}>{letter}</span>
                            ))
                        }
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Hero
