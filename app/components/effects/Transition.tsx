import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap-trial/ScrollTrigger'
import { Power4 } from 'gsap'
import { poppin } from '@/app/constants'
const Transition = ({ timeline }: any) => {
    const trans = useRef(null)
    const words: string = "AIFLEXI GENIUS";
    const letters = words.split("");
    useEffect(() => {
        const t1 = gsap.timeline();
        t1.to(".circle1", {
            y: 0,
            ease: Power4.easeOut,
            delay: 0.4,
            duration: 2,
            opacity: 1
        }).to(".circle2", {
            y: 0,
            ease: Power4.easeOut,
            duration: 1,
            opacity: 1
        })
            .to(".Splits", {
                y: 0,
                ease: Power4.easeOut,
                duration: 1,
                opacity: 1
            }).to(".mainer", {
                display:'none',
                ease: Power4.easeOut,
                duration: 0.01,
                opacity: 1
            })
    })
    return (
        <div className='mainer'>
            <div className="absolute z-[9999999] bg-[#090909] top-0 w-full h-screen  overflow-hidden" ref={trans}>
                <div className="borders w-[1050px] h-[1050px] rounded-full shadow absolute -bottom-[30rem] left-[16%] circle1 opacity-0" style={{ transform: "translateY(300px)" }}></div>
                <div className="borders w-[1350px] h-[1350px] rounded-full shadow absolute -bottom-[40rem] left-[7%] opacity-0 circle2" style={{ transform: "translateY(100px)" }}></div>
                <div className="absolute top w-full h-full flex-center">
                    <div className="w-full h-[10%] relative overflow-hidden flex-center">
                        <p className={`${poppin.className} text-[2.5rem] ml-10  font-medium  textColorBg Splits`} style={{transform:"translateY(100px)"}}>
                            {letters.map((letter: string, index: number) => (
                                <span key={index} className={`${poppin.className} font-extrabold text-[2.6rem] `}>{letter}</span>
                            ))
                            }
                        </p>
                    </div>
                </div>
            </div>
        </div>

    )

}

export default Transition
