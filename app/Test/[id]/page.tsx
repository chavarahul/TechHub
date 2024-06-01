'use client'
import React, { useContext, useEffect, useState } from 'react'
import { quizContest } from '@/app/components/context/QuizContext'
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import { poppin } from '@/app/constants';
import QuizIcon from '@mui/icons-material/Quiz';
const Page = ({id}:any) => {
    const { quizData }: any = useContext(quizContest);
    const { questions, totalMarks, level, data, negativeMarks } = quizData;
    const [newLevel, setNewLevel] = useState('');
    const[option,setOption]=useState<string|null>('')
    useEffect(()=>{
          const datas = localStorage.getItem('option')
          setOption(datas)
    },[])
    useEffect(() => {
        if (Number(level) === 0) {
            setNewLevel('Easy');
        } else if (Number(level) === 1) {
            setNewLevel('Medium');
        } else {
            setNewLevel('Hard');
        }
    }, [level]); 
    const Details = [
        { title: "Total marks : ", info: `${totalMarks ? totalMarks : '0'}` },
        { title: "Total Questions : ", info: `${questions ? questions : '0'}` },
        { title: "Negative Marking : ", info: `${negativeMarks ? negativeMarks : 'None'}` },
        { title: "Level : ", info: `${newLevel ? newLevel : 'None'}` }
    ]


    return (
        <section className='w-full mt-10 pb-10  min-h-[86vh] h-[85vh] relative flex-colm'>
            <div className="w-full h-1/2 relative  flex-center">
                <div className="w-[85%]  h-full relative flex-all">
                    <div className="w-[68%] borders h-full relative rounded-[10px]"></div>
                    <div className="w-[25%] borders h-full relative rounded-[10px] flex-colm SideEffect cursor-pointer">
                        <div className="w-full p-3 pl-5  h-[70%] flex-colm">
                            {
                                Details?.map((t: any, ind: number) => (
                                    <div className="w-full h-[12%]  flex Movable" key={ind}>
                                        <div className="w-auto  h-full relative">
                                            <DeviceHubIcon className='text-6xl font-thin' style={{ fontSize: '16px' }} />
                                            <span className={`${poppin.className} ml-2`}>{t.title}</span>
                                        </div>
                                        <p className={`${poppin.className} ml-3`}>{t.info}</p>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="w-[100%] p-3 pl-5 h-[20%] relative">
                            <div className="absolute borders -top-3 w-[80%] left-3"></div>
                            <div className="flex Movable">
                                <ImportContactsIcon />
                                <p className={`${poppin.className} ml-3`}>Details for the Quiz</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-1/2 mt-5 relative  flex-center">
                <div className="w-[85%]  h-full relative flex-all">
                    <div className="w-[25%] borders h-full relative rounded-[10px] flex-colm">
                        <div className="w-full p-3 h-[73%] grid grid-cols-3 gap-6 items-center Scroller overflow-y-scroll">
                            {Array.from({ length: parseInt(questions, 10) }).map((_, index) => (
                                <div className="rounded-full borders flex-center h-full py-1 cursor-pointer" key={index}>
                                    <p>{index + 1}</p>
                                </div>
                            ))}
                        </div>
                        <div className="w-full p-3 h-[20%]">
                            <div className="w-[100%] p-3 pl-1 h-[20%] relative">
                                {/* <div className="absolute borders top-0 w-[80%] left-3"></div> */}
                                <div className="flex Movable">
                                    <QuizIcon />
                                    <p className={`${poppin.className} ml-3`}>Choose required question.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-[68%] borders h-full relative rounded-[10px] flex-center leading-10">
                        <p className={`${poppin.className} w-full min-h-1/2 flex-center text-center px-20`}>
                            Here, you can access comprehensive solutions for your quiz questions. Our platform offers detailed explanations and step-by-step guidance to assist you in understanding each question thoroughly.
                        </p>
                    </div>
                </div>
            </div>

        </section>
    )
}

Page.getInitialProps = async (context:any) => {
    const { id } = context.query; // Fetching the ID dynamically

    // You can perform any necessary data fetching or processing here

    return { id };
};
export default Page;
