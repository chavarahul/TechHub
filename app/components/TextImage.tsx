'use client'
import React, { useEffect, useState } from 'react';
import { poppin } from '../constants';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import axios from 'axios';
import Image from 'next/image';
import toast from 'react-hot-toast';
import PreLoader from './common/PreLoader';

const TextImage = (props:any) => {
  const {texter} = props
  const [prompt, setPrompt] = useState<string>('');
  const [box, setBox] = useState<boolean>(true);
  const[images,setImages] =useState<any[]>([])
  const[load,setLoad] =useState(false)
  const handlePage = async (texts:string) => {
    console.log(prompt);
    setBox(false);
    setLoad(true)
    try {
      const res = await axios.post('/api/text', { prompts: texts });
      console.log(res.data.data); // Access asset_url directly from the object
      setImages(res.data.data);
      setLoad(false)
    } catch (error) {
      console.error('Error fetching images:', error);
      setImages([]); // Reset images to empty array if there's an error
    }
  };
  useEffect(()=>{
    if(texter!=='' && texter){
       setPrompt(texter)
       handlePage(texter)
    }
  },[texter])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    handlePage(prompt);
};
  const data = [
    { title: "A peaceful sunset over a calm lake" },
    { title: "A cozy cabin nestled in a snowy forest" },
    { title: "A bustling city skyline at night" },
    { title: "A serene beach with palm trees swaying in the breeze" }
  ];

  const handleData = (pro: string) => {
    setPrompt(pro);
    setBox(false);
  };

  const copyImageUrl = (imageUrl: any) => {
    navigator.clipboard.writeText(imageUrl);
    toast.success("Image Copied");
  };

  return (
    <div className="w-full h-screen relative mt-5">
      <div className=" w-full h-[6%] flex-center">
        <p className={`${poppin.className} font-normal text-xl`}>Transform your text into visually appealing and captivating images!</p>
      </div>
      <form className="w-full h-[20%] flex-center" method="post" onSubmit={handleSubmit}>
        <div className="relative rounded-lg w-[30%] overflow-hidden before:absolute before:w-12 before:h-12 before:content[''] before:right-0 before:bg-violet-500 before:rounded-full before:blur-lg after:absolute after:-z-10 after:w-20 after:h-20 after:content[''] after:bg-rose-300 after:right-12 after:top-3 after:rounded-full after:blur-lg">
          <input
            placeholder="Enter your prompt"
            className={`relative pr-20 bg-transparent ring-0 outline-none border border-neutral-500 text-white placeholder-white text-sm rounded-lg focus:ring-violet-500 placeholder-opacity-60 focus:border-violet-500 block w-full p-2.5 checked:bg-emerald-500 ${poppin.className}`}
            type="text"
            value={prompt}
            onChange={(e) => {
              console.log('Input value:', e.target.value);
              setPrompt(e.target.value);
            }}
          />
          <button type="submit" className="absolute right-4 top-1 text-2xl text-white cursor-pointer">
            <ArrowForwardIcon />
          </button>
        </div>
      </form>
      {
        box &&
        <div className=" h-[34%] flex justify-center items-center ">
          <div className="grid grid-cols-2 gap-4 w-[70%]  h-full">
            {
              data?.map((t, ind: number) => (
                <div className="h-[5em] w-[90%] border rounded-xl pt-2 pl-2 text-center cursor-pointer" key={ind} onClick={() => { handleData(t.title) }}>
                  <p className={`${poppin.className}`}>{t.title}</p>
                </div>
              ))
            }
          </div>
        </div>
      }
       {load && <PreLoader/>}
      {
        !box &&
        <div className=" h-[70%] overflow-y-scroll Scroller py-10">
          <div className="grid grid-cols-3 gap-4 full  h-full ml-10">
            {images.length > 0 &&
              images.map((t: any, ind: number) => (
                <div className="h-[20em] w-[70%] relative flex-center  rounded-xl pt-2 pl-2 text-center cursor-pointer " key={ind}>
                  <img src={`${t.asset_url}`} alt='Image' className='w-full h-full flex-center' />
                  <button onClick={() => copyImageUrl(t.asset_url)} className={`absolute right-3 bottom-3 z-[99999] font-medium bg-white rounded-xl text-black p-[0.43rem] ${poppin.className}`}>Copy</button>
                </div>
              ))
            }
          </div>

        </div>
      }
    </div>
  );
}

export default TextImage;
