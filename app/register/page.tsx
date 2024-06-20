'use client'
import Image from 'next/image'
import React, { useState, ChangeEvent } from 'react'
import tech2 from '@/public/tech2.png'
import { della, poppin } from '../constants'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'
const Login = () => {
    const router = useRouter()
    const [showPassword, setshowPassword] = useState<Boolean>(false)
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
        username:''
    })
    const shPassword = (): void => {
        setshowPassword(!showPassword)
        console.log(showPassword)
    }
    const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log('handleLoginChange called:', e.target.name, e.target.value);
        const name = e.target.name;
        const value = e.target.value;
        setLoginData((d: any) => ({ ...d, [name]: value }));
    }
    const handleLogin = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(loginData)
        axios.post('/api/register', loginData).then(() => {

        }).catch((err: any) => {
            console.log(err);
        }).finally(() => {
            console.log("fff")
        })
    };
    return (
        <div className="w-screen h-screen  flex-colm">
            <div className="w-full h-[20%]  flex-colm">
                <div className="w-full h-1/2 flex justify-center items-end">
                    <p className={`${della.className} font-extrabold text-3xl textColorBg`}>Sign Up Now</p>
                </div>
                <div className="w-full h-1/2 flex justify-center items-end">
                    <p className={`${della.className} font-bold text-3xl `}>Create your account to get started</p>
                </div>
            </div>
            <div className="w-full h-[80%]  flex">
                <div className="w-1/2 h-full flex-center">
                    <div className="w-full h-[60%] relative flex-center border-r border-white">
                        <div className="w-1/2 h-full">
                            <Image src={tech2} alt='Logo' />
                        </div>
                    </div>
                </div>
                <div className="w-1/2 h-full relative flex-center">
                    <div className="form-container">
                        <form className="form" onSubmit={handleLogin}>
                            <div className="form-group">
                                <label htmlFor="email" className={`${poppin.className}`}>Email</label>
                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    placeholder='Enter your email'
                                    onChange={handleLoginChange}
                                    value={loginData.email.toString()}
                                    maxLength={30}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className={`${poppin.className}`}>Password</label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    id="password"
                                    placeholder='Enter your password'
                                    onChange={handleLoginChange}
                                    value={loginData.password.toString()}
                                    autoComplete='current-password'
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="username" className={`${poppin.className}`}>Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    placeholder='Enter your username'
                                    onChange={handleLoginChange}
                                    value={loginData.username.toString()}
                                    maxLength={10}
                                />
                            </div>
                            <div className=" flex items-center">
                                <input type="checkbox" onClick={shPassword} name="" id="" />
                                <label htmlFor="Show" className={`${poppin.className} text-[#717171] text-[15px] ml-2`}>Show {" "}Password</label>
                            </div>
                            <div className=" flex items-center">
                                <p className={`${poppin.className} text-[#717171] text-[15px]`}>Do you have an account? <span> <Link href="/Login" className='text-white ml-2 text-sm'> Login</Link></span></p>
                            </div>
                            <button type="submit" className="form-submit-btn">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Login
