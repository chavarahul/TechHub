'use client'
import { della, poppin } from '@/app/constants'
import React, { useEffect } from 'react'
import gsap from 'gsap'
import { useRouter } from 'next/navigation'
import ScrollTrigger from 'gsap-trial/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
const End = () => {
    const router = useRouter()
    const words = "Unleash your potential"
    const letters = words.split("")
    useEffect(() => {
        const pin = gsap.to('.horLine', {
            height: '100%',
            ease: 'power4.out',
            duration: 2,
            scrollTrigger: {
                trigger: '.horLine',
                start: 'top 600px',
                scrub: true
            }
        })
        gsap.to(".Unleash", {
            y: 0,
            ease: 'power4.inOut',
            delay: 0.5,
            duration: 1,
            stagger: 0.08,
            // opacity: 1,
            scrollTrigger: {
                trigger: '.Unleash',
                start: 'top 90%',
                // markers: true,
                scrub: true
            }
        })

    }, [])
    return (
        <section className='w-full h-[80vh] '>
            <div className="w-full h-[15%] flex-center">
                <div className=" h-full w-[3%] flex-center">
                    <div className="w-[3px] h-0 bg-white horLine"></div>
                </div>
                <div className=" h-full flex-colm mx-4">
                    <div className="overflow-hidden">
                        <p className={`${poppin.className} text-xl textColorBg font-bold overflow-hidden Unleash`} style={{ transform: 'translateY(-90px)' }}>
                            {letters.map((letter: any, index: number) => (
                                <span key={index} className={`${poppin.className} mt-10 font-extrabold text-xl translate-y-48 h-full`} >{letter}</span>
                            ))
                            }
                        </p>
                    </div>
                    <p className={`${della.className} text-xl `}>Sign In for Full Access or Try Our Demo for a Sneak Peek</p>
                </div>
                <div className=" h-full w-[3%] flex-center">
                    <div className="w-[3px] h-0 bg-white horLine"></div>
                </div>
            </div>
            <div className=" h-[30%] flex-center">
                <button className="confirm mr-40" onClick={() => { router.push('/register') }}> REGISTER
                </button>
                <button className="confirm" onClick={() => { router.push('/Login') }}> LOGIN
                </button>
            </div>
        </section>
    )
}

export default End
