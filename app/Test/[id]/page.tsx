'use client'
import React, { useContext, useEffect, useState } from 'react';
import { quizContest } from '@/app/components/context/QuizContext';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import { poppin } from '@/app/constants';
import QuizIcon from '@mui/icons-material/Quiz';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useRouter } from 'next/navigation';

const Page = ({ id }: any) => {
    const { quizData }: any = useContext(quizContest);
    const { questions, totalMarks, level, data, negativeMarks } = quizData;
    const [newLevel, setNewLevel] = useState('');
    const [option, setOption] = useState<string | null>('');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number } | null>(null);
    const [selectedOption, setSelectedOption] = useState<{ [key: number]: string }>({});
    const router = useRouter();

    useEffect(() => {
        const storedTime = localStorage.getItem('quizTime');
        if (storedTime) {
            const { hours, minutes, seconds } = JSON.parse(storedTime);
            setTimeLeft({ hours: Number(hours), minutes: Number(minutes), seconds: Number(seconds) });
        }
    }, []);

    useEffect(() => {
        if (option === 'Mock test') {
            return;
        }
        if (timeLeft) {
            const timer = setInterval(() => {
                setTimeLeft(prev => {
                    if (!prev) return null;
                    let { hours, minutes, seconds } = prev;

                    if (seconds > 0) {
                        seconds--;
                    } else if (minutes > 0) {
                        minutes--;
                        seconds = 59;
                    } else if (hours > 0) {
                        hours--;
                        minutes = 59;
                        seconds = 59;
                    } else {
                        clearInterval(timer);
                        localStorage.setItem('quizTime', JSON.stringify({ hours: 0, minutes: 0, seconds: 0 }));
                    }

                    return { hours, minutes, seconds };
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [timeLeft, router]);

    useEffect(() => {
        if (Number(level) === 0) {
            setNewLevel('Easy');
        } else if (Number(level) === 1) {
            setNewLevel('Medium');
        } else {
            setNewLevel('Hard');
        }
    }, [level]);

    useEffect(() => {
        const datas = localStorage.getItem('option');
        setOption(datas);
    }, []);

    if (!timeLeft) return null;

    const Details = [
        { title: "Total marks : ", info: `${totalMarks ? totalMarks : '0'}` },
        { title: "Total Questions : ", info: `${questions ? questions : '0'}` },
        { title: "Negative Marking : ", info: `${negativeMarks ? negativeMarks : 'None'}` },
        { title: "Level : ", info: `${newLevel ? newLevel : 'None'}` }
    ];

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleShift = (ind: number) => {
        setCurrentQuestionIndex(ind);
    }

    const handleOptionSelect = (ind: number, op: string) => {
        setSelectedOption((prev) => ({ ...prev, [ind]: op }));
        console.log(selectedOption);
    }

    return (
        <>
            <section className="w-full mt-10 min-h-[90vh] h-[85vh] relative flex-center">
                <div className="w-[65%] h-full relative flex">
                    <div className="w-full h-[90%] relative">
                        <div className="h-[5%] w-full relative"></div>
                        <div className="w-full min-h-[55%] h-[55%] flex-center">
                            <div className="h-full w-[5%] relative flex-center">
                                <div className="rounded-full p-2 flex-center bg-white cursor-pointer z-[999]" onClick={handlePreviousQuestion}>
                                    <ArrowBackIosIcon style={{ color: "black", fontSize: '15px' }} />
                                </div>
                            </div>
                            <div className="h-full w-[90%] relative CauroselContainer overflow-hidden">
                                <div className="h-full w-full relative CauroselBox" style={{ display: 'flex', transform: `translateX(-${currentQuestionIndex * 100}%)`, transition: 'transform 0.5s ease-in-out' }}>
                                    {Array.from({ length: questions }).map((_, index) => (
                                        <div className="w-full h-full relative rounded-[10px] flex-shrink-0 flex flex-col items-center justify-center" key={index} style={{ flexBasis: '100%' }}>
                                            <div className="w-full relative h-[25%] px-8 flex-center">
                                                <h4 className={`${poppin.className} w-full h-full flex-center text-center Scroller overflow-y-scroll leading-8`}>
                                                    Question {index + 1}
                                                </h4>
                                            </div>
                                            <div className="h-1/2 w-full relative flex-center">
                                                <div className="h-full w-[80%] min-w-[80%] max-w-full grid grid-rows-2 grid-cols-2 place-items-center items-center gap-2">
                                                    {['A', 'B', 'C', 'D'].map((opt, i) => (
                                                        <div className={`h-[40%] w-[80%] min-w-[80%] max-w-full flex-center ${selectedOption[index] === `Option ${opt}` ? 'selected' : ''}`} key={i}>
                                                            <input
                                                                type="radio"
                                                                className='w-3 h-3 cursor-pointer checked:bg-blue'
                                                                id={`option${opt}_${index}`}
                                                                name={`question_${index}`}
                                                                value={`Option ${opt}`}
                                                                disabled={option != 'Mock test' && timeLeft && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0}
                                                                checked={selectedOption[index] === `Option ${opt}`}
                                                                onChange={() => handleOptionSelect(index, `Option ${opt}`)}
                                                            />
                                                            <span className={`${poppin.className} ml-2`}>Option {opt}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            {
                                                option === 'Mock test' &&
                                                <div className="h-[20%] w-full relative flex-center mt-2">
                                                    <button className="btn-17 ">
                                                        <span className="text-container">
                                                            <span className={`${poppin.className} text`}>Ok</span>
                                                        </span>
                                                    </button>
                                                </div>
                                            }
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="h-full w-[5%] relative flex-center">
                                <div className="rounded-full p-2 flex-center bg-white cursor-pointer z-[999]" onClick={handleNextQuestion}>
                                    <ArrowForwardIosIcon style={{ color: "black", fontSize: '15px' }} />
                                </div>
                            </div>
                        </div>
                        <div className="w-full min-h-[40%] h-[40%] flex-all mt-5">
                            <div className="w-[70%] h-full relative rounded-[10px] flex-center borders">
                                {
                                    option === 'Mock test' ? (
                                        <p className={`${poppin.className} w-full h-full flex-center text-center leading-8 px-4`}>You have a question?
                                            Great! This is the spot to solve it.
                                            Whatever you seek,
                                            The answer{" '"}s here, no need to fret.
                                            Look no further, dig right in!
                                        </p>
                                    ) : (
                                        <div className="borders h-full w-full flex-colm px-7">
                                            <p className={`${poppin.className} text-md  flex-center text-center leading-8`}>Take your time, but keep an eye on the clock! This quiz has a time limit displayed in the box below</p>
                                            <p>Time left: {`${timeLeft.hours.toString().padStart(2, '0')}:${timeLeft.minutes.toString().padStart(2, '0')}:${timeLeft.seconds.toString().padStart(2, '0')}`}</p>
                                        </div>
                                    )
                                }
                            </div>
                            <div className="w-[25%] h-full relative rounded-[10px] borders">
                                <p className={`${poppin.className} w-full h-[60%] leading-8 flex-center px-4 text-center`}>
                                    Finished the Quiz{" "}? Click Me for Results!
                                </p>
                                <div className="flex-center h-[20%] w-full relative">
                                    <button className="btn-17 ">
                                        <span className="text-container">
                                            <span className={`${poppin.className} text`}>Submit</span>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-[25%] h-full flex-bet relative flex-colm px-9">
                    <div className="w-full h-[40%] rounded-[10px] p-3 flex-colm SideEffect borders">
                        <div className="w-full h-[70%] relative flex-colm pl-5 Movable cursor-pointer">
                            {Details.map((t: any, ind: number) => (
                                <div className="w-full h-[12%] flex Movable" key={ind}>
                                    <div className="w-auto h-full relative">
                                        <DeviceHubIcon className='text-6xl font-thin' style={{ fontSize: '16px' }} />
                                        <span className={`${poppin.className} ml-2`}>{t.title}</span>
                                    </div>
                                    <p className={`${poppin.className} ml-3`}>{t.info}</p>
                                </div>
                            ))}
                        </div>
                        <div className="w-full h-[15%] p-3 pl-5 relative">
                            <div className="absolute borders -top-3 w-[80%] left-3"></div>
                            <div className="flex Movable">
                                <ImportContactsIcon />
                                <p className={`${poppin.className} ml-3`}>Details for the Quiz</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-[42%] rounded-[10px] p-3 pb-5 SideEffect borders">
                        <div className="w-full p-3 h-[89%] grid grid-cols-3 gap-6 items-center Scroller overflow-y-scroll">
                            {Array.from({ length: questions }).map((_, index) => (
                                <div className={`rounded-full flex-center w-12 h-12 py-1 borders cursor-pointer ${currentQuestionIndex === index && 'BgColor'}`} key={index} onClick={() => { handleShift(index) }}>
                                    <p>{index + 1}</p>
                                </div>
                            ))}
                        </div>
                        <div className="w-full p-3 h-[10%] pb-4">
                            <div className="flex Movable">
                                <QuizIcon />
                                <p className={`${poppin.className} ml-3`}>Choose required question.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Page;
