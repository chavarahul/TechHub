'use client'
import { poppin } from "@/app/constants"
import { useEffect } from "react"
import gsap from "gsap"
import ScrollTrigger from "gsap-trial/ScrollTrigger"
import Image from "next/image"
import aiImage4 from '@/public/aiImage4.png'
gsap.registerPlugin(ScrollTrigger)
const About = () => {
    useEffect(() => {
        const startOffset = window.innerHeight * 0.8;
        console.log(window.innerHeight)
        const endOffset = window.innerHeight * 0.2;
        gsap.to('.Upper', {
            translateY: 0,
            opacity: 1,
            stagger: 0.06,
            duration: 0.05,
            ease: "power4.out",
            scrollTrigger: {
                trigger: '.Upper',
                scrub: true,
                start: `top ${startOffset}`,
                end: `top ${endOffset}`,
            }
        })
        gsap.to('.pyramid-loader',{
            y:0,
            opacity:1,
            duration:1,
            ease:'power4.out',
            // delay:2,
            // stagger:0.4,
            scrollTrigger:{
                trigger:'.pyramid-loader',
                scrub:true,
                start: `top 90%`,
                // end: `top ${endOffset}`,
                // markers:true
            }
        })
    }, [])
    const words: string[] = ["Empower creativity with code-free AI-driven development, shaping", " innovation effortlessly. Enhance productivity through intuitive tools,", " leveraging technology seamlessly. Join us in crafting the future of ", "digital transformation, where possibilities are limitless."]
    return (
        <section className="h-[60vh] w-full  relative flex justify-center items-end" id="about">
            <div className=" h-[70%] w-full relative flex-center">
                <div className="w-1/3 h-full relative  flex ml-4">
                    <div className="w-1/2 h-full relative flex items-center justify-start">
                        <div className="pyramid-loader" style={{transform:'translateY(-40px)',opacity:0}}>
                            <div className="wrapper">
                                <span className="side side1"></span>
                                <span className="side side2"></span>
                                <span className="side side3"></span>
                                <span className="side side4"></span>
                                <span className="shadow"></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-1/2 h-full flex items-start justify-center flex-col">
                    {
                        words.map((t: string, index: number) => (
                            <div className=" overflow-hidden relative h-[20%]" key={index}>
                                <p className={`${poppin.className} text-xl Upper leading-[3rem] relative`}>{t}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default About
