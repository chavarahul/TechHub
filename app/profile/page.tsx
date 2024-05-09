'use client'
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { poppin } from '../constants';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
const Page = () => {
  const { data } = useSession();
  const [profile, setProfile] = useState<string>('')
  const [img, setImg] = useState<File | null>(null);
  const name: any = data?.user?.email;
  const id: string | undefined = data?.user?.id;
  const [updateProfile, setUpdateProfile] = useState<boolean>(false)
  const [userMail,setUserMail]=useState<any>(name)

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
      formData.append('image', imageData); // Pass image data string
      formData.append('name', name || "");
      formData.append('id', id);

      try {
        const res = await axios.post('/api/profiler', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(res.data.profile);
        setProfile(res.data.profile.Image)
        setUpdateProfile(false)
        toast.success("Profile updated successfully");
      } catch (error) {
        console.error("Error updating profile:", error);
        toast.error("Failed to update profile");
      }
    };
    reader.readAsDataURL(img);
  };
  useEffect(() => {
    const str = async () => {
      const newProfile = await axios.get(`/api/profiler/${id}`);
      setProfile(newProfile.data.Image)
    }
    str()
  }, [id])

  return (
    <div className=" w-full p-5 min-h-[85vh] h-[85vh]">
      <div className=" w-1/2 h-full">
        <div className="w-full  h-[22%] flex-all">
          <div className={`h-full   flex-all w-1/2`}>
            {
              !updateProfile ? (
                <>
                  <div className=" rounded-full h-[70px] w-[70px] flex-center">
                    <img src={profile} className='w-full h-full rounded-full' alt='UserImage' />

                  </div>
                  <p className={`${poppin.className} `}>{name || ""}</p>
                </>
              ) : (
                <>
                  <form method='post' className='flex w-[150%]  h-full'>
                    
                    <div className="input-div flex-center z-[9999] mt-3">
                      <input className="input" name="file" type="file" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setImg(e.target.files ? e.target.files[0] : null) }}  />
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
                    <input type="text" value={name} className={`${poppin.className} pl-4 bg-transparent flex-center ml-5 outline-none`} />
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
      </div>
    </div>
  );
};

export default Page;
