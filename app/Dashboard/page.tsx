'use client'
import React, { useState, useEffect } from 'react';
import { userType } from '../constants/type';
import { useUser } from '../components/user/UserData';
import { poppin } from '../constants';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import ProgressCircle from '../components/effects/ProgressCircle';
import Chat from '../components/profilePages/Chat';
import Prompt from '../components/profilePages/Prompt';
import LineGraph from '../components/effects/LineGraph';

const Page = () => {
  const [updateProfile, setUpdateProfile] = useState<boolean>(false);
  const [img, setImg] = useState<File | null>(null);
  const [section, setSection] = useState<string>('');
  const [quizAccuracy, setQuizAccuracy] = useState<number>(0); // ✅ New state

  const userData: userType | null = useUser();
  const email = userData?.email || '';
  const id = userData?.id || '';
  const username = userData?.username || '';
  const userImage = userData?.Image || '';
  const router = useRouter();

  // ✅ Fetch quiz accuracy
  useEffect(() => {
    const storedQuizData = localStorage.getItem('questionDetails');
    if (storedQuizData) {
      const questions = JSON.parse(storedQuizData);
      const totalQuestions = questions.length;
      const correctAnswers = questions.filter((q: any) => q.selectedOption === q.correctAnswer).length;
      
      if (totalQuestions > 0) {
        const accuracy = (correctAnswers / totalQuestions) * 100;
        setQuizAccuracy(Math.round(accuracy)); // Round to nearest whole number
      }
    }
  }, []);

  const handleImage = async (e: any) => {
    e.preventDefault();
    if (!img || !id) {
      toast.error("Image or user ID not available");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const imageData = reader.result as string;

      const formData = new FormData();
      formData.append('image', imageData);
      formData.append('name', email || "");
      formData.append('id', id);

      try {
        await axios.post('/api/profiler', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setUpdateProfile(false);
        toast.success("Profile updated successfully");
        router.refresh();
      } catch (error) {
        console.error("Error updating profile:", error);
        toast.error("Failed to update profile");
      }
    };
    reader.readAsDataURL(img);
  };

  return (
    <div className="min-h-screen text-white p-4">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold">DASHBOARD</h1>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Profile Section */}
          <div className="col-span-2 w-[130%] lg:col-span-1 bg-gray-700 rounded-lg p-4 h-40 flex-all">
            <div className="w-[25%]">
              {!updateProfile ? (
                <div className="rounded-full h-[80px] w-[80px] flex-center">
                  <img src={userImage} className='w-full h-full ml-2 rounded-full' alt='UserImage' />
                </div>
              ) : (
                <form method='post' className='flex w-[150%] h-full'>
                  <input className="input" type="file" onChange={(e) => setImg(e.target.files ? e.target.files[0] : null)} />
                </form>
              )}
            </div>
            <div className="leading-9 w-[70%] flex-all">
              <div>
                <p className={`${poppin.className}`}>Username : <span className='capitalize'>{username}</span></p>
                <p className={`${poppin.className}`}>Email : <span className=''>{email}</span></p>
              </div>
              <div>
                {!updateProfile ? (
                  <button onClick={() => setUpdateProfile(true)} className="p-3 rounded-md text-white font-semibold transition-all duration-500">
                    <EditRoundedIcon />
                  </button>
                ) : (
                  <button className="confirm" onClick={handleImage}>Submit</button>
                )}
              </div>
            </div>
          </div>

          {/* Quiz Accuracy Section */}
          <div className="col-span-2 relative w-[70%] ml-36 bg-gray-700 rounded-lg p-4 flex items-center justify-between">
            <div className="w-[40%] h-full flex-colm relative">
              <h2 className={`text-xl ${poppin.className}`}>Quiz Accuracy</h2>
              <p className={`${poppin.className} text-3xl text-left`}>{quizAccuracy}%</p>
            </div>
            <div className="top-2 right-5 absolute">
              <ProgressCircle percentage={quizAccuracy} /> {/* ✅ Show actual accuracy */}
            </div>
          </div>

          {/* Sidebar for Sections */}
          <div className="bg-gray-700 rounded-lg p-4 lg:col-span-1 w-[75%] h-96 mt-3">
            <ul className='flex-colm w-full h-full'>
              <li className={`${poppin.className} py-2 cursor-pointer`} onClick={() => setSection('prompt')}>Prompt</li>
              <li className={`${poppin.className} py-2 cursor-pointer`} onClick={() => setSection('chat')}>Chat</li>
              <li className={`${poppin.className} py-2 cursor-pointer`} onClick={() => setSection('mock')}>Messages</li>
            </ul>
          </div>

          {/* Dynamic Content Section */}
          <div className="bg-gray-700 rounded-lg p-4 w-[98%] lg:col-span-2 h-96 mt-3 -ml-24 overflow-y-scroll Scroller">
            {section === 'chat' && <Chat />}
            {section === 'prompt' && <Prompt />}
            {/* {section === 'mock' && <LineGraph />} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
