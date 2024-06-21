"use client";
import React, { useState, useEffect } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import axios from 'axios';
import toast from 'react-hot-toast';
import { poppin } from '../constants';
import { userType } from '../constants/type';
import { useUser } from '../components/user/UserData';

const LOCAL_STORAGE_KEY = 'chat_messages';

const Page = () => {
    const userData: userType | null = useUser();
    const username = userData?.username || '';
    const [names, setNames] = useState<string[]>([]);
    const [msg, setMsg] = useState<string>('');
    const [messages, setMessages] = useState<{ user: string, message: string }[]>([]);
    const [chatInp, setChatInp] = useState<string>('');

    useEffect(() => {
        // Fetch initial users
        const fetchUsers = async () => {
            const res = await axios.get('/api/users');
            setNames(res.data.res);
        };
        fetchUsers();

        // Load messages from local storage
        const storedMessages = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
        setMessages(storedMessages);

        // Poll for changes in local storage
        const intervalId = setInterval(() => {
            const updatedMessages = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
            setMessages(updatedMessages);
        }, 1000); // Poll every second

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await axios.post("http://localhost:5000/api/chatroom", { msg });
        console.log(res?.data);
        if (res?.data.predicted_emotion === 'negative') {
            setMsg('');
            toast.error("Unparliamentary language");
            return;
        }
        // Add message to local storage
        const messageData = { user: username, message: msg };
        const updatedMessages = [...messages, messageData];
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedMessages));
        setMessages(updatedMessages);
        setMsg(''); // Clear message input
    };

    return (
        <div className="desktop-5 pl-5 p-5">
            <div className="background" />
            <main className="content">
                <div className="chat borders p-4 rounded-[10px]">
                    <div className="flex-center">
                        <ChatIcon />
                        <div className={`${poppin.className} ml-3 text-center`}>Chat room</div>
                    </div>
                    <div className="chat-background" />
                    <div className="room-list">
                        <div className="relative h-[60vh] w-full ">
                            <div className={`${poppin.className} available-now1 h-[10%]`}>All users</div>
                            <div className="relative w-full h-[90%] Scroller overflow-y-scroll">
                                {names.map((t: any, ind: number) => (
                                    <div className="borders mb-3 h-[45px] rounded-[10px] flex-all" key={ind}>
                                        <PersonIcon />
                                        <p className={`${poppin.className}`}>{t.username}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <section className="user-panel">
                    <div className="user borders h-[70vh] flex-colm rounded-[10px]">
                        <p className={`${poppin.className}`}>Available Users</p>
                        <button onClick={()=>{localStorage.clear()}}>wefw</button>
                        <div className="">
                        </div>
                    </div>
                    <div className="absolute top-20 left-[20.5%] MsgBox w-[58%] pr-20 h-[70%]">
                        <div className="messages-list h-full overflow-y-scroll Scroller">
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`message-item flex ${message.user === username ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`message-bubble mb-1 min-w-[20%] ${message.user === username ? 'bg-white text-black p-3 px-5 rounded-[15px] mb-3' : 'bg-gray-200 text-black'}`}>
                                        <span className={`${poppin.className} message-username`}>{message.user} :{"   "}</span>{message.message}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="contact-list">
                        <div className="contact mt-10">
                            <div className="flex-center w-full px-10">
                                <form className="h-full borders w-full px-5 py-3 rounded-[10px] flex" onSubmit={handleSubmit}>
                                    <input
                                        type='text'
                                        value={msg}
                                        onChange={(e) => setMsg(e.target.value)}
                                        className="start-messaging1 outline-none bg-transparent border-none w-full h-full"
                                        placeholder='Enter your message'
                                    />
                                    <button type='submit'><ArrowForwardIcon /></button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Page;
