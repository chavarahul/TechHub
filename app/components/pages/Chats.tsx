'use client'
import { poppin } from '@/app/constants'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import PreLoader from '../common/PreLoader'

const Chats = (props:any) => {
    const {texter} = props
    const [prompt, setPrompt] = useState<string>('')
    const [box, setBox] = useState<boolean>(true)
    const[datas,setDatas]=useState([])
    const[load,setLoad] =useState(false)
    const handleData = (pro: string) => {
        setPrompt(pro);
        setBox(false);
    };

    useEffect(()=>{
        if(texter!== '' && texter){
            setPrompt(texter)
            // const syntheticEvent = { preventDefault: () => {} };
           handleSubmit(texter)
        } 
    },[texter])

    const data = [
        { title: "A peaceful sunset over a calm lake" },
        { title: "A cozy cabin nestled in a snowy forest" },
        { title: "A bustling city skyline at night" },
        { title: "A serene beach with palm trees swaying in the breeze" }
    ];
    const handlePage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent the default form submission behavior
        handleSubmit(prompt);
    };
    const handleSubmit = async (texts:string) => {
        console.log(prompt);
        setBox(false);
        setLoad(true)
        try {
          const res = await axios.post('/api/ai', { prompts: texts});
          console.log(res.data.text);
          let resp = res.data.text.replace(/\*/g, '');
          const formattedData:any = resp
            .split(/\d+\.\s+/)
            .filter(Boolean)
            .map((item: string) => item.trim().replace(/\./g, '.\n'));
          setDatas(formattedData)
          setLoad(false)
        } catch (error) {
          console.error('Error fetching images:', error);
          
        }
      };
    return (
        <section className=' w-full min-h-screen mb-10 '>
            <div className=" w-full relative min-h-[7rem] flex-colm">
                <h3 className={`${poppin.className} text-[1.32rem] textColorBg font-extrabold`}>AI Assistant</h3>
                <p className={`${poppin.className} text-lg text-center leading-[10px]`}>Please specify the nature of your query to facilitate AI-generated responses</p>
            </div>
            <div className="relative w-full flex-center mt-4">
                <form className="relative rounded-lg w-[30%] overflow-hidden flex " onSubmit={handlePage}>
                    <input
                        placeholder="Enter your prompt"
                        className={`relative pr-20 bg-transparent ring-0 outline-none border border-gray-300 text-white placeholder-white text-sm rounded-lg placeholder-opacity-60 block w-full p-2.5 ${poppin.className}`}
                        type="text"
                        value={prompt}
                        onChange={(e) => {
                            setPrompt(e.target.value);
                        }}
                    />
                    <button type='submit' className={`${poppin.className} absolute right-0 h-full w-[20%] bg-white text-black top-0 font-bold`}>Submit</button>
                </form>
            </div>
            {
                (box && datas.length <=0) &&
                <div className="min-h-[34%] flex justify-center items-center mt-20 ">
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
               ( datas.length>=1 && !box && !load ) &&
               <div className={` mt-10 min-h-[50%] flex-center`}>
                        <div className=" w-[80%]  h-full overflow-y-scroll Scroller  rounded-xl p-3">
                            <p className={`${poppin.className} leading-10 `}>{datas}</p>
                        </div>
                    </div>
            }
        </section>
    )
}

export default Chats