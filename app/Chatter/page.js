'use client'
import { useState, useEffect } from "react";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { poppin } from "../constants";

export const Chats = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [chat, setChat] = useState(null);
  const [error, setError] = useState(null);
  const API = "AIzaSyA7AZZaiyMlv_JsLI3XUdAQ7Hfp1o7YTgU"; // Replace with your actual API key
  const MODEL_NAME = "gemini-pro";
  const genAI = new GoogleGenerativeAI(API);
  const generationConfig = {
    maxOutputTokens: 2048,
    temperature: 0.9,
    topP: 0.1,
    topK: 16,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  useEffect(() => {
    const initChat = async () => {
      try {
        const newChat = await genAI
          .getGenerativeModel({ model: MODEL_NAME })
          .startChat({
            generationConfig,
            safetySettings,
            history: messages.map((msg) => ({
              text: msg.text,
              role: msg.role,
            })),
          });
        setChat(newChat);
      } catch (err) {
        setError(err);
      }
    };
    initChat();
  }, []);

  const handleSendMessages = async () => {
    try {
      const userMessage = {
        text: userInput,
        role: "user",
        timeStamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);
      setUserInput("");
      if (chat) {
        const result = await chat.sendMessage(userInput);
        const botMessage = {
          text: result.response.text(),
          role: "bot",
          timestmap: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
      }
    } catch (err) {
      setError(err);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessages();
    }
  };

  return (
    <div className="w-full h-full relative overflow-y-scroll Scroller pb-10">
      <div className="rounded-md flex-1 px-3 ">
        {messages.map((msg, index) => (
          <div
            className={`relative flex items-center ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
            key={index}
          >
            <p className="absolute text-xs top-0 left-0 mb-1">
              {msg.role === "user" ? "User:" : "Model:"}
            </p>
            <div
              className={`${
                msg.role === "user" ? "bg-blue-500" : "bg-gray-300"
              } text-white rounded-lg mb-4 p-3 max-w-[70%]`}
            >
              <span>{msg.text}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-1 w-full">
        <div className="relative rounded-lg w-[60%] overflow-hidden">
          <input
            placeholder="Enter your prompt"
            className={`relative pr-20 bg-transparent ring-0 outline-none border border-gray-300 text-black placeholder-gray-500 text-sm rounded-lg focus:ring-blue-500 placeholder-opacity-60 focus:border-blue-500 block w-full p-2.5 ${poppin.className}`}
            type="text"
            onKeyDown={handleKeyPress}
            value={userInput}
            onChange={(e) => {
              setUserInput(e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Chats;
