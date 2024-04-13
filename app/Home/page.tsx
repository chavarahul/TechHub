'use client'
import { signOut } from 'next-auth/react'
import React, { useEffect, useRef, useState } from 'react'
import { useSession } from 'next-auth/react'
import Navbar from '../components/common/Navbar'
import axios from 'axios'
import AddIcon from '@mui/icons-material/Add';
import Transition from '../components/effects/Transition'
import gsap from 'gsap'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { poppin } from '../constants'
import toast from 'react-hot-toast'
import Loader from '../components/common/Loader'
import SideBar from '../components/common/SideBar'
import Chats from '../Chatter/page'
import TextImage from '../components/TextImage'
import ImageText from '../components/ImageText'
import Image from 'next/image'
import Imager from '@/public/ai.png'
import Imager1 from '@/public/mul.png'
import Imager2 from '@/public/text.png'
import Imager3 from '@/public/ier.webp'
import te from '@/public/img.jpg'
const Page = () => {
  const [prompt, setPrompt] = useState<string>('')
  const [data, setData] = useState<string[]>([])
  const [pass, setPass] = useState(true)
  const [embeddedContent, setEmbeddedContent] = useState('');
  const [box, setBox] = useState<boolean>(true)
  const [selectSection, setSelectSection] = useState('')

  const handleSection = (section: string) => {
    setSelectSection(section)
  }

  const handlePage = async (e: any) => {
    console.log('Prompt:', prompt);
    setPass(false)
    setBox(false)
    e.preventDefault()
    console.log(prompt)
    const res = await axios.post('/api/prompt', { prompts: prompt })
    console.log(res)
    console.log(res?.data)
    let resp = res.data.text.replace(/\*/g, '');
    const formattedData = resp
      .split(/\d+\.\s+/)
      .filter(Boolean)
      .map((item: string) => item.trim().replace(/\./g, '.\n'));
    setPass(true)
    setData(formattedData)

  }
  const copyContent = (prompt: string) => {
    navigator.clipboard.writeText(prompt).then(() =>
      toast.success("Text Copied")
    ).catch(() => (
      toast.error("Not Copied")
    ))
  }
  const home = gsap.timeline()
  const { data: session } = useSession()
  const name = session?.user?.email

  const Dummy = [
    { title: "Make a night picture sticking a moon picture that looks like it's glowing in the sky." },
    { title: "Enhance your cooking blog with mouth-watering food photography and engaging recipe tutorials" },
    { title: "Elevate your travel blog with stunning landscape images and captivating travel diaries." },
    { title: "Transform your website's homepage with a vibrant color palette and an eye-catching logo design." }
  ]


  const Features = [
    { title: "Users have access to unlimited AI chat for solving doubts and queries.", img: Imager },
    { title: "Users can utilize multiple AI systems simultaneously for resolving various queries and tasks", img: Imager1 },
    { title: "users can also convert text to images seamlessly.", img: Imager2 },
    { title: "Users can convert images to text data effortlessly", img: Imager3 }
  ]
  const handleDummyData = (prompts: string, e: any) => {
    setPrompt(prompts);
    setBox(false)
    // console.log(prompts)
    // handlePage(e)
  }

  return (
    <>
      <Transition timeline={home} />
      <section className=' h-screen w-full relative'>
        <div className=" h-[20%] flex-colm">
          <h3 className={`${poppin.className} text-2xl font-medium`}>
            Empower Your AI with <span className=' textColorBg shadow'>Customized Prompts</span>
          </h3>
          <p className={`${poppin.className} text-lg`}>Our tool tailors prompts from your text, boosting performance across tasks. Say goodbye to generic inputs and welcome precise prompting.</p>
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
        <div className=" min-h-[50%] flex flex-wrap items-center justify-evenly">
          {
            pass ? (
              data.map((prompt, index) => (
                <div key={index} className={`border border-rose-300 relative h-[10em] w-[20%] rounded-[15px] p-3 Scroller overflow-y-scroll ${poppin.className} leading-7`}>
                  {prompt}
                  <div className="absolute bottom-2.5 rounded-[10px] right-3 bg-purple-300 w-[30px] h-[30px]  flex-center" onClick={() => copyContent(prompt)}>
                    <ContentCopyIcon className=' text-base text-gray-900 cursor-pointer ' />
                  </div>
                </div>
              ))
            ) : (
              <Loader />
            )
          }
          {
            box &&
            <div className=" w-[90%] min-h-[015em] flex items-center justify-evenly ">
              {
                Dummy?.map((t: any, index: number) => (
                  <div className="border cursor-pointer  border-rose-300 w-[20%] rounded-lg h-[9em] p-3 leading-7" key={index} onClick={(e: any) => { handleDummyData(t.title, e) }}>
                    <p>{t.title}</p>
                  </div>
                ))
              }

            </div>

          }
        </div>
      </section>
      <section className=' w-full h-[125vh] mb-5'>
        <div className=" w-full relative h-[28%] flex-colm ">
          <h3 className={`${poppin.className} text-[1.32rem] font-medium`}>Empowering <span className=' textColorBg shadow'>AI Fusion</span> with  Harnessing the Collective Power of AI Integration</h3>
          <p className={`${poppin.className} text-lg text-center leading-[40px]`}> Empowering AI fusion combines diverse AI technologies to enhance performance, enabling smarter solutions. This integration fosters innovation,<br /> driving growth in the digital era.</p>
          <div className=" w-full flex-center h-[13%]">
            <div className="w-[30px] h-[30px]  ml-4 rounded-full Add"></div>
          </div>
        </div>
        <div className="flex w-full h-[75%]">
          <SideBar onSelectSection={handleSection} />
          <div className=' border-red-400 h-[95%] w-full rounded-lg borders ml-2 p-4'>
            {selectSection === 'AI Chat & Assistant' && <Chats />}
            {selectSection === 'Text to Image' && <TextImage />}
            {selectSection === 'Image to text' && <ImageText />}
            {selectSection === '' &&
              <>
                <p className={`${poppin.className} font-bold w-full h-[10%]  flex-center mt-10 -ml-10`}>Unlocking AI Diversity: Multiple Technologies, One Line.</p>
                <div className={` h-[70%] leading-8 ${poppin.className} grid grid-cols-2  items-center justify-around  text-center text-md mt-10 ml-36`}>

                  {
                    Features?.map((t: any, index: number) => (
                      <div className="flex-colm w-[60%] rounded-lg h-[11em]  py-1 " key={index}>
                        <div className=" w-full h-[50%] flex-center">
                          <div className="w-[20%] rounded-[5px]  h-full glass shadow p-1 flex-center border border-violet-400">
                            <Image src={t.img} alt="Image" className={`${index >= 2 ? 'w-[75%] h-[80%]' : 'w-full h-full'} ${index == 3 && 'w-[65%] h-[70%]'}`} />
                          </div>
                        </div>
                        <div className=" cursor-pointer w-full h-full  p-3 leading-7 justify-evenly" onClick={(e: any) => { handleDummyData(t.title, e) }}>
                          <p>{t.title}</p>
                        </div>
                      </div>

                    ))
                  }
                </div>
              </>
            }
          </div>
        </div>
      </section>
      {/* <section className='w-screen h-screen overflow-x-scroll flex'> 
           <Chats/>
           <TextImage/>
      </section> */}
    </>
  )
}

export default Page
