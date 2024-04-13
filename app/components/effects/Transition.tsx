import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap-trial/ScrollTrigger'
import { Power4 } from 'gsap'
const Transition = ({ timeline }: any) => {
    const trans = useRef(null)
    useEffect(() => {
        timeline.to(trans.current, {
            duration: 5,
            x: 2500,
            ease: Power4.easeOut,
            delay: 0.4
        })
    })
    return (
        <div>
            <div className="absolute z-[9999999] bg-white top-0 w-full h-screen" ref={trans}></div>
        </div>
    )
}

export default Transition
