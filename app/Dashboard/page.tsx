'use client'
import React, { useState } from 'react';
import { userType } from '../constants/type';
import { useUser } from '../components/user/UserData';
import { poppin } from '../constants';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import ProgressCircle from '../components/effects/ProgressCircle';

const Page = () => {
  const[updateProfile,setUpdateProfile]=useState<boolean>(false)
  const userData: userType | null = useUser();
  const email = userData?.email || '';
  const id = userData?.id || '';
  const username = userData?.username || '';
  const userImage = userData?.Image || '';
  const router = useRouter()
  const [img, setImg] = useState<File | null>(null);
  const[section,setSection] = useState<string>('')

  
  const handleImage = async (e:any) => {
    e.preventDefault();
    if (!img || !id) {
      toast.error("Image or user ID not available");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = async () => {
      const imageData = reader.result as string;

      console.log(id);
      const formData = new FormData();
      formData.append('image', imageData);
      formData.append('name', email || "");
      formData.append('id', id);

      try {
        const res = await axios.post('/api/profiler', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
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
    <div className="min-h-screen  text-white p-4">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold">DASHBOARD</h1>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="col-span-2 w-[130%] lg:col-span-1 bg-gray-700 rounded-lg p-4 h-40 flex-all">
            <div className="w-[25%]">
            {!updateProfile ? (
              <>
                <div className="rounded-full h-[80px] w-[80px] flex-center">
                  <img src={userImage} className='w-full h-full ml-2 rounded-full' alt='UserImage' />
                </div>
              
              </>
            ) : (
              <>
                <form method='post' className='flex w-[150%] h-full'>
                  <div className="input-div flex-center z-[9999] mt-3">
                    <input className="input" name="file" type="file" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setImg(e.target.files ? e.target.files[0] : null) }} />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      fill="none"
                      stroke="currentColor"
                      className="icon"
                    >
                      <polyline points="16 16 12 12 8 16" />
                      <line y2={21} x2={12} y1={12} x1={12} />
                      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                      <polyline points="16 16 12 12 8 16" />
                    </svg>
                  </div>
                  {/* <input type="text" value={email} className={`${poppin.className} pl-4 bg-transparent flex-center ml-5 outline-none`} /> */}
                </form>
              </>
            )}
            </div>
            <div className="leading-9 w-[70%] flex-all">
            <div className="">
            <p className={`${poppin.className}`}>Username : <span className=' capitalize'>{username}</span></p>
            <p className={`${poppin.className}`}>Email : <span className=''>{email}</span></p>
            </div>
           <div className="">
           {!updateProfile ? (
              <section className="flex justify-center items-center">
                <button
                  onClick={() => { setUpdateProfile(true) }}
                  className="group flex justify-center p-3 rounded-md drop-shadow-xl hover:shadow shadow from-gray-800 to-black text-white font-semibold hover:rounded-[50%] transition-all duration-500 hover:from-[#331029] hover:to-[#310413]"
                >
                  <EditRoundedIcon />
                  <span
                    className="pointer-events-none absolute opacity-0 group-hover:opacity-100 group-hover:text-white group-hover:text-md group-hover:-translate-y-14 duration-700"
                  >
                    Update
                  </span>
                </button>
              </section>
            ) : (
              <button className="confirm" onClick={handleImage}> Submit
              </button>
            )}
           </div>
            </div>
          </div>
          <div className="col-span-2 relative w-[70%] ml-36 bg-gray-700 rounded-lg p-4 flex items-center justify-between">
           <div className=" w-[40%] h-full flex-colm relative">
           <h2 className={`text-xl ${poppin.className}`}>Overall Accuracy</h2>
           <p className={`${poppin.className} text-3xl text-left`}>78%</p>
           </div>
            {/* <div className="bg-black rounded-full h-24 w-24 ProgressCircle"> */}
           <div className="top-2 right-5  absolute ">
           <ProgressCircle percentage={78}/>
           </div>
            {/* </div> */}
          </div>
          <div className="bg-gray-700 rounded-lg p-4 lg:col-span-1 w-[75%] h-96 mt-3">
            <ul className='flex-colm w-full h-full'>
              <li className={`${poppin.className} py-2 cursor-pointer`}>Prompt</li>
              <li className={`${poppin.className} py-2 cursor-pointer`}>Image</li>
              <li className={`${poppin.className} py-2 cursor-pointer`}>Chat</li>
              <li className={`${poppin.className} py-2 cursor-pointer`}>Mock</li>
              <li className={`${poppin.className} py-2 cursor-pointer`}>Competitive</li>
            </ul>
          </div>
          <div className="bg-gray-700 rounded-lg p-4 w-[98%] lg:col-span-2 h-96 mt-3 -ml-24">
            {/* Placeholder for component */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
