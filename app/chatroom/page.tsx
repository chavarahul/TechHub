"use client"
import React, { useState,useEffect } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io(); // Connect to socket.io server

const Page = () => {
    const [names, setNames] = useState<string[]>([]);
    const [msg, setMsg] = useState<string>('');
    const [messages, setMessages] = useState<{ user: string, message: string }[]>([]);
    const [username, setUsername] = useState<string>(''); 
    const[chatInp, setchatInp]= useState<string>('')

    useEffect(() => {
        // Fetch initial users
        const fetchUsers = async () => {
            const res = await axios.get('/api/users');
            setNames(res.data.res);
        };
        fetchUsers();

        // Listen for new messages from server
        socket.on('message', (message: { user: string, message: string }) => {
            setMessages(prevMessages => [...prevMessages, message]);
        });

        // Mock function to set the main user's username (replace with actual authentication logic)
        const storedUsername = prompt('Enter your username'); // For demo purposes
        if (storedUsername) {
            setUsername(storedUsername);
        }

        return () => {
            socket.disconnect(); // Cleanup on unmount
        };
    }, []);

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res= await axios.post("http://127.0.0.1:5000/api/chatroom",{msg})
        console.log(res?.data)
        // Emit message to server
        const messageData = { user: username, message: msg };
        socket.emit('sendMessage', messageData);
        setMessages(prevMessages => [...prevMessages, messageData]);
        setMsg(''); // Clear message input
    };

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
                        <div className="relative h-[60vh] w-full borders">
                            <div className="available-now1 h-[10%]">All users</div>
                            <div className="relative w-full borders h-[90%] Scroller overflow-y-scroll">
                                {names.map((t: any, ind: number) => (
                                    <div className="borders h-[45px] rounded-[10px] flex-all" key={ind}>
                                        <PersonIcon />
                                        <p>{t.username}</p>
                                    </div>
                                ))}
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
                                <div className="user-name">
                                    <a className="username1">{username}</a>
                                </div>
                            </div>
                            <div className="user-header">
                                <div className="available-now1">Available now</div>
                            </div>
                        </div>
                    </div>
                    <div className="border-[1px] absolute top-20 left-[20.5%] MsgBox border-red-500 w-[58%] h-[70%]">
                        <div className="messages-list h-full overflow-y-scroll">
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`message-item flex ${message.user === username ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`message-bubble ${message.user === username ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
                                        <span className="message-username font-bold">{message.user}:</span> {message.message}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="contact-list borders">
                        <div className="contact">
                            <div className="flex-center borders w-full px-10">
                                <form className="h-full borders w-full px-5 py-3 rounded-[10px] flex " onSubmit={handleSubmit}>
                                    <input
                                        type='text'
                                        value={msg}
                                        onChange={(e) => setMsg(e.target.value)}
                                        className="start-messaging1 outline-none bg-transparent border-none w-full h-full"
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
