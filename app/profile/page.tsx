'use client'
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import EastIcon from '@mui/icons-material/East';
import { poppin } from '../constants';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import Prompt from '../components/profilePages/Prompt';
import Chat from '../components/profilePages/Chat';
import Imagers from '../components/profilePages/Imagers';
import { useUser } from '../components/user/UserData';
import { userType } from '../constants/type';
import { useRouter } from 'next/navigation';
const Page = () => {
  const [img, setImg] = useState<File | null>(null);
  const [updateProfile, setUpdateProfile] = useState<boolean>(false)
  const [section, setSection] = useState<string>('')
  const router = useRouter()
  const userData: userType | null = useUser();
  const email = userData?.email || '';
  const id = userData?.id || ''
  const Image = userData?.Image || ''
  const handleImage = async (e: FormEvent) => {
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
        setUpdateProfile(false)
        toast.success("Profile updated successfully");
        router.refresh();
      } catch (error) {
        console.error("Error updating profile:", error);
        toast.error("Failed to update profile");
      }
    };
    reader.readAsDataURL(img);
  };
  // useEffect(() => {
  //   const str = async () => {
  //     const newProfile = await axios.get(`/api/profiler/${id}`);
  //     console.log(newProfile)
  //     setProfile(newProfile.data.Image)
  //   }
  //   str()
  // }, [id])

  const allData = [
    { title: "Prompts" },
    { title: "AI Assistant" },
    { title: "Images" }
  ]
  const handleSection = (name: string) => {
    setSection(name)
  }

  return (
    <div className=" w-full p-5 min-h-[85vh] h-[85vh] flex">
      <div className=" w-1/2 h-full">
        <div className="w-full  h-[22%] flex-all">
          <div className={`h-full   flex-all w-1/2`}>
            {
              !updateProfile ? (
                <>
                  <div className=" rounded-full h-[80px] w-[80px] flex-center">
                    <img src={Image} className='w-full h-full rounded-full ' alt='UserImage' />

                  </div>
                  <p className={`${poppin.className} `}>{email || ""}</p>
                </>
              ) : (
                <>
                  <form method='post' className='flex w-[150%]  h-full'>

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
                    <input type="text" value={email} className={`${poppin.className} pl-4 bg-transparent flex-center ml-5 outline-none`} />
                    {/* <input type="file" className='' /> */}
                  </form>
                </>
              )
            }
          </div>
          <div className=" w-1/4 h-full flex-center ">
            {
              !updateProfile ? (
                <section className="flex justify-center items-center">
                  <button
                    onClick={() => { setUpdateProfile(true) }}
                    className="group flex justify-center p-3 rounded-md drop-shadow-xl hover:shadow shadow   from-gray-800 to-black text-white font-semibold hover:rounded-[50%] transition-all duration-500 hover:from-[#331029] hover:to-[#310413]"
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
              )
            }
          </div>
        </div>
        <div className=" h-[80%] relative w-full flex-center flex-col">
          {
            allData?.map((t: any, index: number) => (
              <div className={`TextEffect h-[23%] flex w-full cursor-pointer ${index >= 1 ? " border-b border-white" : "border-y border-white"}`} key={index} onClick={() => { handleSection(t.title) }}>
                <div className="er1 w-[10%]  h-full flex justify-center">
                  <p className={`${poppin.className} mt-2`}>0{index + 1}</p>
                </div>
                <div className="er1 flex-center h-full w-[78%]">
                  <p className={`${poppin.className} mt-2 uppercase text-5xl font-light cursor-pointer`}>{t.title}</p>
                </div>
                <div className="w-[10%]  h-full flex-center overflow-hidden">
                  <EastIcon className='text-5xl -translate-x-20 IconMove' />
                </div>
              </div>
            ))
          }

        </div>
      </div>
      <div className='w-1/2 relative h-full px-5  overflow-y-scroll'>
        {section === "Prompts" && <Prompt />}
        {section === "AI Assistant" && <Chat />}
        {section === "Images" && <Imagers />}
      </div>
    </div>
  );
};

export default Page;
