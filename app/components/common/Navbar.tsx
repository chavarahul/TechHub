'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import tech2 from '@/public/tech2.png'
import { poppin } from '@/app/constants'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link'
import gsap from 'gsap'
import { Power4 } from 'gsap'

const Navbar = () => {
    const router = useRouter()
    const [users, setUsers] = useState<boolean>(false)
    const { data: session } = useSession()
    const [box, setBox] = useState<boolean>(false)
    useEffect(() => {
        session ? setUsers(true) : setUsers(false)
    }, [session])
    const handleMenu = () => {
        setBox(false)
        console.log(box)
    }
    useEffect(() => {
        const t1 = gsap.timeline();
        t1.to(".Toppr", {
            y: 0,
            ease: Power4.easeOut,
            duration: 1.5,
            delay:0.04
        }).to(".Siders", {
            x: 0,
            ease: Power4.easeOut,
            duration: 1,
            stagger: 0.6,
        })
    })
    const data: any = [
        { title: "Home", hrefs: "/Home" },
        { title: "Compiler", hrefs: "/compiler" },
        { title: "Profile", hrefs: "/profile" },
    ]
    return (
        <>
            <div className="relative h-[12vh] flex flex-center">
                <div className="w-full  h-full flex-bet px-10">
                    <div className=" w-[7%]  h-full flex-center">
                        <Image src={tech2} alt='Logo' />
                    </div>
                    <div className="w-1/12 h-full flex-all">
                        {
                            users ? (
                                <>
                                    <p className={` capitalize font-medium ${poppin.className}`}>menu</p>
                                    <div className=" w-[35%] h-[40%] z-10 cursor-pointer flex flex-col justify-evenly items-end" onClick={() => { setBox(true) }}>
                                        <div className="w-full h-[1.5px] bg-white rounded-lg"></div>
                                        <div className="w-[70%] h-[1.5px] bg-white rounded-lg"></div>
                                        <div className="w-[30%] h-[1.5px] bg-white rounded-lg"></div>
                                    </div>
                                </>
                            ) : (
                                <button className="confirm" onClick={() => { router.push('/Login') }}> LOGIN
                                </button>
                            )
                        }
                    </div>
                </div>
            </div>
            {
                box &&
                <section className='bg-[#090909] w-screen h-screen z-[999999] fixed top-0 left-0 Toppr' style={{transform:"translateY(-140vh)"}}>
                    <div className=" w-full h-[10%] flex-bet relative">
                        <div className=" w-[10%] h-full absolute right-0 top-0 flex-center" onClick={() => { setBox(false) }}>
                            <CloseIcon className='cursor-pointer' />
                        </div>
                    </div>
                    <div className="h-[90%] w-full relative flex">
                        <div className="w-[40%] h-full  flex items-end justify-end">
                            <div className="w-[70%] h-full relative overflow-hidden  flex-colm">
                                <div className="w-full h-[50%]  relative overflow-hidden flex items-start flex-col justify-evenly">
                                    {
                                        data?.map((t: any, ind: number) => (
                                            <Link className="button Siders" data-text="Awesome" key={ind} href={t.hrefs}  style={{ transform: "translateX(-200px)" }} onClick={handleMenu}>
                                                <span className="actual-text">&nbsp;{t.title}&nbsp;</span>
                                                <span aria-hidden="true" className="hover-text">&nbsp;{t.title}&nbsp;</span>
                                            </Link>
                                        ))
                                    }
                                </div>
                                <div className="w-full h-[10%]  relative overflow-hidden cursor-pointer" onClick={() => { signOut() }}>
                                    <p className={`${poppin.className} text-4xl Siders letters font-medium`} style={{ transform: "translateX(-160px)" }} >SignOut</p>
                                </div>
                            </div>
                        </div>
                        <div className=" w-[40%] h-full relative">
                           <div className=" w-full h-[90%] relative -mt-10">
                           {/* <Image src={tech2} alt='Logo' className='w-full h-full'/> */}
                           </div>
                        </div>
                    </div>
                </section>
            }
        </>
    )
}

export default Navbar
