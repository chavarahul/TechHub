'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import tech2 from '@/public/tech2.png'
import { poppin } from '@/app/constants'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
const Navbar = () => {
    const router = useRouter()
    const [users, setUsers] = useState<boolean>(false)
    const { data: session } = useSession()
    useEffect(() => {
        session ? setUsers(true) : setUsers(false)
    }, [session])
    return (
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
                            <div className=" w-[35%] h-[40%] flex flex-col justify-evenly items-end">
                                <div className="w-full h-[1.5px] bg-white rounded-lg"></div>
                                <div className="w-[70%] h-[1.5px] bg-white rounded-lg"></div>
                                <div className="w-[30%] h-[1.5px] bg-white rounded-lg"></div>
                            </div>
                            </>
                        ) : (
                            <button className="confirm"onClick={()=>{router.push('/Login')}}> LOGIN
                            </button> 
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar
