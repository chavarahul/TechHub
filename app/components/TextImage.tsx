'use client'
import React, { useState ,useEffect} from 'react';
import { poppin } from '../constants';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import axios from 'axios';
import toast from 'react-hot-toast';

const TextImage = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [box, setBox] = useState<boolean>(true);
  const [images, setImages] = useState<any[]>([]);
  const [datas, setDatas] = useState<string[]>([]);

  // Load stored images from local storage when component mounts
  useEffect(() => {
    const storedData = localStorage.getItem('datas');
    if (storedData) {
      setDatas(JSON.parse(storedData));
    }
  }, []);

  const handlePage = async (e: any) => {
    e.preventDefault();
    console.log(prompt);
    setBox(false);
    try {
      const res = await axios.post('/api/text', { prompts: prompt });
      console.log(res.data.data);
      const urls = res.data.data.map((item: any) => item.asset_url);
      console.log("Data", urls);
      setDatas(urls);
      localStorage.setItem('datas', JSON.stringify(urls));
      setImages(res.data.data);
    } catch (error) {
      console.error('Error fetching images:', error);
      setImages([]);
    }
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
    <div className="w-full h-full relative">
      <div className=" w-full h-[6%] flex-center">
        <p className={`${poppin.className} font-normal text-xl`}>Transform your text into visually appealing and captivating images!</p>
      </div>
      <form className="w-full h-[20%] flex-center" method="post" onSubmit={handlePage}>
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
        (box && datas.length ===0) &&
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
      {
        (!box || datas.length>=1) &&
        <div className="borders h-[70%] overflow-y-scroll Scroller py-10">
          <div className="grid grid-cols-3 gap-4 full  h-full ml-10">
            {datas.length > 0 &&
              datas.map((url: string, ind: number) => (
                <div className="h-[20em] w-[90%]  flex-center border rounded-xl pt-2 pl-2 text-center cursor-pointer relative" key={ind}>
                  <img src={url} alt='Image' className='w-full h-full' />
                  <button onClick={() => copyImageUrl(url)} className='absolute right-3 bottom-3 z-[99999]'>Copy</button>
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
