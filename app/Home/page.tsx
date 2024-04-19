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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import toast from 'react-hot-toast'
import annyang from 'annyang';
import Loader from '../components/common/Loader'
import SideBar from '../components/common/SideBar'
import Chats from '../components/pages/Chats'
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
  const [box, setBox] = useState<boolean>(true)
  const [selectSection, setSelectSection] = useState<string>('')
  const [textAi, setTextAi] = useState<string>('')
  const [selectedAi, setSelectedAi] = useState<string[]>([])
  const [checker, setChecker] = useState<boolean>(false)
  const [submit, setSubmit] = useState<boolean>(false)
  const [langs, setLangs] = useState('')
  const handleSection = (section: string) => {
    setSelectSection(section)
  }
  const handlePage = async (e: any) => {
    console.log('Prompt:', prompt);
    setPass(false)
    setBox(false)
    e.preventDefault()
    console.log(prompt)
    const res = await axios.post('/api/prompt', { prompts: prompt,lang:langs })
    console.log(res)
    console.log(res?.data)
    let resp = res.data.text.replace(/\*/g, '');
    const formattedData: any = resp
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
  useEffect(() => {
    const item = localStorage.getItem('lang');
    if (item) {
      setLangs(item)
    }
  }, [])
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
  }
  const getText = async () => {
    const text = await navigator.clipboard.readText()
    setTextAi(text)

  }
  const select = [
    { name: "AI Chat" }, { name: "Text to Image" }, { name: "Image to text" }
  ]


  const handleAiSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const aiName = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      setSelectedAi([...selectedAi, aiName]);
    } else {
      setSelectedAi(prevSelectedAi => prevSelectedAi.filter(ai => ai !== aiName));
    }
  };


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
              <ArrowForwardIcon style={{ fontSize: '1.7rem !important' }} />
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
        </div>
        <div className="flex w-full h-[75%] relative">
          {/* <SideBar onSelectSection={handleSection} /> */}
          <div className='h-[95%] w-full rounded-lg  ml-2 p-4'>
            <p className={`${poppin.className} font-bold w-full h-[10%]  flex-center mt-5 text-center`}>Unlocking AI Diversity: Multiple Technologies, One Line.</p>
            <div className=" h-[80%] w-full relative flex-center ">
              <div className={` h-full w-[60%]  leading-8 ${poppin.className} grid grid-cols-2  items-center justify-around  text-center text-md `}>

                {
                  Features?.map((t: any, index: number) => (
                    <div className="flex-colm w-[90%] rounded-lg h-[11em]  py-1  " key={index}>
                      <div className=" w-full h-[50%] flex-center">
                        <div className="w-[20%] rounded-[5px]  h-full glass shadow p-1 flex-center border border-violet-400">
                          <Image src={t.img} alt="Image" className={`${index >= 2 ? 'w-[75%] h-[80%]' : 'w-full h-full'} ${index == 3 && 'w-[65%] h-[70%]'}`} />
                        </div>
                      </div>
                      <div className=" cursor-pointer w-full h-full  p-3 leading-7 justify-evenly" onClick={(e: any) => { handleDummyData(t.title, e) }}>
                        <p className={`${poppin.className} mt-3`}>{t.title}</p>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="w-full h-[50vh] mb-10 ">
        <div className=" w-full relative h-[45%] flex-colm">
          <h3 className={`${poppin.className} text-[1.32rem] font-medium`}>Enabling Seamless Interaction, Integrating User Input with <span className='textColorBg shadow'>AI Selection</span></h3>
          <p className={`${poppin.className} text-lg text-center leading-[40px]`}>Effortlessly direct prompts to selected AI for tailored responses.
            Fosters efficiency, precision, and user-centric engagement,<br /> amplifying AI utility across domains.</p>
        </div>
        <div className="w-full h-[55%] flex items-center justify-evenly">
          <div className="item-hints mt-5 ">
            <div className="hint " data-position={4} onClick={getText}>
              <span className="hint-radius" />
              <span className="hint-dot">Click</span>
              <div className="hint-content do--split-children">
                <p>Use Navbar to navigate the website quickly and easily.</p>
              </div>
            </div>
          </div>
          <form className="w-[30%] h-[20%] flex-center  z-[999999] mt-5" method="post" onSubmit={handlePage}>
            <div className="relative rounded-lg w-[80%] overflow-hidden before:absolute before:w-12 before:h-12 before:content[''] before:right-0 before:bg-violet-500 before:rounded-full before:blur-lg after:absolute after:-z-10 after:w-20 after:h-20 after:content[''] after:bg-rose-300 after:right-12 after:top-3 after:rounded-full after:blur-lg">
              <input
                placeholder="Enter your prompt or copy"
                className={`relative pr-20 bg-transparent ring-0 outline-none border border-neutral-500 text-white placeholder-white text-sm rounded-lg focus:ring-violet-500 placeholder-opacity-60 focus:border-violet-500 block w-full p-2.5 checked:bg-emerald-500 ${poppin.className}`}
                type="text"
                value={textAi}
                onChange={(e) => { setTextAi(e.target.value) }}
              />
            </div>
          </form>
          <form className="w-[20%] borders h-[20%] z-[999999] cursor-pointer mt-5 Checker relative flex-bet rounded-md px-4" >
            <div className={`${poppin.className} text-lg`} onClick={() => { setChecker(!checker) }}>Select the  Ai{`\u0027`}s</div>
            <KeyboardArrowDownIcon className='cursor-pointer' onClick={() => { setChecker(!checker) }} />
            {
              checker && <div className='absolute w-full h-[200px] top-20 left-0'>
                {
                  select?.map((t: any, ind: number) => (
                    <div className="w-full px-4 h-[20%] relative flex items-center" key={ind}>
                      <label className="container">
                        <input type="checkbox"
                          value={t.name}
                          onChange={handleAiSelection}
                          checked={selectedAi.includes(t.name)}
                        />
                        <svg viewBox="0 0 64 64" height="1.3em" width="1.3em">
                          <path
                            d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                            pathLength="575.0541381835938"
                            className="path"
                          />
                        </svg>
                      </label>
                      <p className={`${poppin.className}`}>{t.name}</p>
                    </div>
                  ))
                }
              </div>
            }
          </form>
          <button className="confirm mt-5" onClick={() => { setSubmit(true); setTimeout(() => setSubmit(false), 0); }}>Submit
          </button>
        </div>
      </div>
      <Chats texter={submit && selectedAi.includes('AI Chat') ? textAi : ''} />
      <TextImage texter={submit && selectedAi.includes('Text to Image') ? textAi : ''} />
      <ImageText />
    </>
  )
}

export default Page