'use client'
import { della, poppin } from '@/app/constants'
import React, { useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap-trial/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
const Features = () => {
    const word = "Our Services"
    const letters = word.split("")
    useEffect(() => {
        gsap.to(('.Liners'), {
            y: 0,
            ease: 'power4.out',
            duration: 8,
            delay: 2,
            scrollTrigger: {
                trigger: '.Liners',
                scrub: true,
                start: "top 600px",
            }
        })
        gsap.to(('.Real'), {
            width: '88%',
            ease: 'power4.out',
            duration: 8,
            delay: 1,
            scrollTrigger: {
                trigger: '.Real',
                scrub: true,
                start: "top 600px",
            }
        })
        gsap.to(('.SideDiv'), {
            x: 0,
            ease: 'power4.out',
            duration: 5,
            stagger: 1.2,
            opacity: 1,
            scrollTrigger: {
                trigger: '.SideDiv',
                scrub: true,
                start: "top 98%",
                // markers: true
            }
        })
    }, [])
    const data: { title: string }[] = [
        { title: "AI Compiler " },
        { title: "Language Independency" },
        { title: "Use Multiple ai's with one Click " },
        { title: "Convert to pdf/word document " },
    ]
    return (
        <div className="h-[100vh] w-full  flex items-end justify-center">
            <div className="relative w-full h-[85%]">
                <div className="w-full h-1/5 px-10 flex-center relative  ">
                    <div className="overflow-hidden relative flex-center  z-10 bg-[#090909] px-10">
                        <h3 className={`${poppin.className} text-[2.5rem] textColorBg Liners font-bold l overflow-hidden `} style={{ transform: 'translateY(-80px)' }}>
                            {
                                letters?.map((t: string, index: number) => (
                                    <span className={`${poppin.className}`} key={index}>{t}</span>
                                ))
                            }
                        </h3>

                    </div>
                    <div className="h-[2px] w-10 Real bg-white absolute -z-1">

                    </div>
                </div>
                <div className=" h-[70vh] flex ">
                    {/* <div className="h-full w-1/12 flex-center">
                        <div className="w-[3px] h-[85%]  flex-center rounded-md bg-gray-700">
                            <div className="bg-white w-full h-0 rounded-md">
                            </div>
                        </div>
                    </div> */}
                    <div className=" w-3/4  h-[90%] ">
                        <div className="w-full h-[70vh] relative   flex-center ">
                            <div className="w-full h-[80%] relative  flex-center flex-col">
                                <div className=" w-[80%] h-[90%] relative  flex-col pt-10 overflow-hidden leading-8" >
                                    {
                                        data?.map((t: any, index: number) => (
                                            <div className="w-full h-[10%]  flex SideDiv items-center my-5" key={index} style={{ transform: 'translateX(-350px)', opacity: 0 }}>
                                                {/* <div className="w-[12px] h-[12px] rounded-full" style={{ backgroundImage: 'linear-gradient(74deg, var(--bard-color-brand-text-gradient-stop-1) 0, var(--bard-color-brand-text-gradient-stop-2) 9%, var(--bard-color-brand-text-gradient-stop-3) 20%, var(--bard-color-brand-text-gradient-stop-3) 24%, var(--bard-color-brand-text-gradient-stop-2) 35%, var(--bard-color-brand-text-gradient-stop-1) 44%, var(--bard-color-brand-text-gradient-stop-2) 50%, var(--bard-color-brand-text-gradient-stop-3) 56%, #ffffffda 75%, #ffffffce 100%)' }}></div> */}
                                                <p className={`${poppin.className} ml-5 text-lg`}>{index+1+". "}{t.title}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" w-1/3 h-[90%] flex-center ">
                        <div className="cube-loader">
                            <div className="cube-top"></div>
                            <div className="cube-wrapper">
                                <span style={{ '--i': 0 } as React.CSSProperties} className="cube-span"></span>
                                <span style={{ '--i': 1 } as React.CSSProperties} className="cube-span"></span>
                                <span style={{ '--i': 2 } as React.CSSProperties} className="cube-span"></span>
                                <span style={{ '--i': 3 } as React.CSSProperties} className="cube-span"></span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Features
