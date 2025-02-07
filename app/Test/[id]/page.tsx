'use client';
import React, { useContext, useEffect, useState } from 'react';
import { quizContest } from '@/app/components/context/QuizContext';
import { poppin } from '@/app/constants';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useRouter } from 'next/navigation';
import { QuizQuestion } from '@/app/constants/type';

const Page = ({ id }: any) => {
    const { quizData }: any = useContext(quizContest);
    const { questions = [], totalMarks, level, data, negativeMarks } = quizData;
    const [newLevel, setNewLevel] = useState('');
    const [option, setOption] = useState<string | null>('Mock test');
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
        if (option === 'Mock test') return;

        if (timeLeft) {
            const timer = setInterval(() => {
                setTimeLeft((prev) => {
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
                        handleSubmit();
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
        { title: 'Total marks : ', info: `${totalMarks ? totalMarks : '0'}` },
        { title: 'Total Questions : ', info: `${questions?.length ? questions.length : '0'}` },
        { title: 'Negative Marking : ', info: `${negativeMarks ? negativeMarks : 'None'}` },
        { title: 'Level : ', info: `${newLevel ? newLevel : 'None'}` },
        { title: 'Time Left : ', info: `${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s` },
    ];

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleOptionSelect = (ind: number, op: string) => {
        setSelectedOption((prev) => ({ ...prev, [ind]: op }));
    };
    const handleSubmit = () => {
        if (!questions || questions.length === 0) return;

        const totalQuestions = questions.length;
        let totalScore = 0;
        let wrongAnswers = 0;

        const questionDetails: {
            question: string;
            selectedOption: string;
            correctAnswer: string;
            options: string[]
        }[] = [];

        questions.forEach((question: QuizQuestion, index: number) => {
            const selectedOptionText = selectedOption[index]; // Example: "Option B"
            const selectedOptionLetter = selectedOptionText?.replace('Option ', '').trim().toUpperCase();
            const correctAnswer = String(question.correct_answer).trim().toUpperCase();

            console.log(`Comparing: "${selectedOptionLetter}" vs "${correctAnswer}"`);

            if (selectedOptionLetter === correctAnswer) {
                totalScore += totalMarks / totalQuestions; // ✅ Correct weightage calculation
            } else {
                wrongAnswers += 1;
            }

            questionDetails.push({
                question: question.question,
                selectedOption: selectedOptionLetter || "",
                correctAnswer: correctAnswer,
                options: [
                    question.options['A'],
                    question.options['B'],
                    question.options['C'],
                    question.options['D']
                ]
            });
        });

        totalScore -= (negativeMarks * wrongAnswers);

        totalScore = Math.max(0, totalScore);

        console.log("Final Score:", totalScore);

        localStorage.setItem('quizScore', totalScore.toFixed(2)); // Save as a fixed decimal
        localStorage.setItem('questionDetails', JSON.stringify(questionDetails));

        router.push('/results');
    };

    return (
        <section className="w-full mt-10 min-h-[90vh] h-[85vh] relative flex-center">
            <div className="w-[65%] h-full relative flex">
                <div className="w-full h-[90%] relative">
                    <div className="w-full min-h-[55%] h-[55%] flex-center">
                        <div className="h-full w-[5%] relative flex-center">
                            <div
                                className="rounded-full p-2 flex-center bg-white cursor-pointer z-[999]"
                                onClick={handlePreviousQuestion}
                            >
                                <ArrowBackIosIcon style={{ color: 'black', fontSize: '15px' }} />
                            </div>
                        </div>
                        <div className="min-h-[60vh] w-[90%] relative CauroselContainer overflow-hidden borders rounded-lg">
                            <div
                                className="h-full w-full relative CauroselBox"
                                style={{
                                    display: 'flex',
                                    transform: `translateX(-${currentQuestionIndex * 100}%)`,
                                    transition: 'transform 0.5s ease-in-out',
                                }}
                            >
                                {questions.map((item: QuizQuestion, index: number) => (
                                    <div
                                        className="w-full h-full relative rounded-[10px] flex-shrink-0 flex flex-col items-center justify-center"
                                        key={index}
                                        style={{ flexBasis: '100%' }}
                                    >
                                        <div className="w-full relative my-10 px-8 flex-center">
                                            <h4
                                                className={`${poppin.className} w-full h-full flex-center text-center Scroller overflow-y-scroll leading-8`}
                                            >
                                                {index + 1}) {item.question}
                                            </h4>
                                        </div>
                                        <div className="h-1/2 w-full relative flex-center">
                                            <div className="h-full w-[80%] min-w-[80%] max-w-full grid grid-rows-2 grid-cols-2 place-items-center items-center gap-2">
                                                {['A', 'B', 'C', 'D'].map((opt, i) => (
                                                    <div
                                                        className={`min-h-[40%] w-[80%] min-w-[80%] max-w-full flex-center ${selectedOption[index] === `Option ${opt}` ? 'selected' : ''
                                                            }`}
                                                        key={i}
                                                    >
                                                        <input
                                                            type="radio"
                                                            className="w-3 h-3 cursor-pointer checked:bg-blue"
                                                            id={`option${opt}_${index}`}
                                                            name={`question_${index}`}
                                                            value={`Option ${opt}`}
                                                            disabled={
                                                                option !== 'Mock test' &&
                                                                timeLeft &&
                                                                timeLeft.hours === 0 &&
                                                                timeLeft.minutes === 0 &&
                                                                timeLeft.seconds === 0
                                                            }
                                                            checked={selectedOption[index] === `Option ${opt}`}
                                                            onChange={() =>
                                                                handleOptionSelect(index, `Option ${opt}`)
                                                            }
                                                        />
                                                        <span className={`${poppin.className} ml-2`}>
                                                            {item.options[`${opt}`]}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="h-full w-[5%] relative flex-center">
                            <div
                                className="rounded-full p-2 flex-center bg-white cursor-pointer z-[999]"
                                onClick={handleNextQuestion}
                            >
                                <ArrowForwardIosIcon style={{ color: 'black', fontSize: '15px' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-[25%] h-full flex-bet relative">
                <div className="w-full h-[45%] relative">
                    <div
                        className="w-full h-full flex-center flex-col"
                        style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)' }}
                    >
                        {Details.map((item, index) => (
                            <div
                                className="w-[90%] h-[13%] min-h-[15%] flex-center mb-4"
                                key={index}
                            >
                                {
                                    // (option !== 'Mock test' && index === 4) && (
                                    <span
                                        className={`${poppin.className} text-center text-[14px] font-bold flex justify-between w-full`}
                                    >
                                        {item.title}
                                        <p>{item.info}</p>
                                    </span>
                                    // )
                                }
                            </div>
                        ))}
                    </div>
                </div>
                <div
                    className="h-[10%] w-full flex-center"
                    style={{
                        position: 'absolute',
                        bottom: '15%',
                        transform: 'translateY(50%)',
                    }}
                >
                    <div
                        className="rounded-full cursor-pointer flex-center border border-green-600 text-green-600 p-2 w-32"
                        onClick={handleSubmit}
                    >
                        Submit
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Page;
