'use client'
import React, { useEffect, useState } from 'react'
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import axios from 'axios';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
const Page = () => {
    const[names,setNames] = useState<string[]>()
    const [msg,setMsg]=useState<string>('')
    useEffect(()=>{
       const UserNames = async() =>{
        const res = await axios.get('/api/users');
        setNames(res?.data.res)
        console.log(res?.data.res)
       }
       UserNames();
    },[])
    return (
        <div className="desktop-5 borders pl-5 p-5">
            <div className="background" />
            <main className="content">
                <div className="chat borders p-4">
                    <div className="flex">
                        <ChatIcon />
                        <div className="ml-3">Chat room</div>
                    </div>
                    <div className="chat-background" />
                    <div className="room-list">
                        <div className="relative h-[60vh]  w-full borders">
                            <div className="available-now1 h-[10%]">All users</div>
                            <div className="relative w-full borders h-[90%] Scroller overflow-y-scroll">
                               {
                                names?.map((t:any,ind:number)=>(
                                    <div className="borders h-[45px] rounded-[10px] flex-all" key={ind}>
                                    <PersonIcon/>
                                    <p>{t.username}</p>
                                </div>
                                ))
                               }
                            </div>
                        </div>
                    </div>
                </div>
                <section className="user-panel borders">
                    <div className="user borders">
                        <div className="user-child" />
                        <div className="user-info">
                            <div className="user-name-area">
                                <div className="user-name-area-child" />
                                {/* <img
                                    className="user-avatar-icon"
                                    loading="lazy"
                                    alt=""
                                    src="./public/rectangle-22@2x.png"
                                /> */}
                                <div className="user-name">
                                    <a className="username1">username</a>
                                </div>
                            </div>
                            <div className="user-header">
                                <div className="available-now1">Available now</div>
                            </div>
                        </div>

                    </div>
                    <div className="border-[1px] absolute top-20 left-[20.5%] MsgBox border-red-500 w-[58%] h-[70%] "></div>
                    <div className="contact-list borders">
                        <div className="contact">
                            <div className="flex-center borders w-full px-10">
                                <form className="h-full borders w-full px-5 py-3 rounded-[10px] flex ">
                                    <input type='text' value={msg} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setMsg(e.target.value)}} className="start-messaging1 outline-none bg-transparent border-none w-full h-full"/>
                                    <ArrowForwardIcon/>
                                </form>
                                <div className="contact-add">
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>

    )
}

export default Page