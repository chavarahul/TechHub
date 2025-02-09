'use client'
import { poppin } from '@/app/constants'
import React, { useContext, useState } from 'react'
import { FormData, TestType } from '@/app/constants/type'
import axios from 'axios';
import { quizContest } from '../context/QuizContext';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
const Real = ({ test, prompt, option }: TestType) => {
  const [questions, setQuestions] = useState('');
  const [totalMarks, setTotalMarks] = useState('');
  const [negativeMarks, setNegativeMarks] = useState('')
  const [level, setLevel] = useState('')
  const { setQuizData }: any = useContext(quizContest);

  const router = useRouter();
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>, setState: React.Dispatch<React.SetStateAction<string>>) => {
    const value = e.target.value;
    if (value === '' || (/^\d{1,3}$/.test(value) && Number(value) >= 1 && Number(value) <= 999)) {
      setState(value);
    }
  };
  const handleLevel = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '' || (/^\d{0,1}$/.test(val) && Number(val) >= 0 && Number(val) <= 2)) {
      setLevel(val);
    }
  }
  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fromData: FormData = { type: test, questions, level, prompt, negativeMarks };
    handleSubmit(e, fromData);
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, fromData: FormData) => {
    if (!fromData.level || !fromData.prompt || !fromData.questions || !fromData.type) {
      toast.error('Invalid details');
      return;
    }

    try {
      const difficultyMap = {
        '0': 'easy',
        '1': 'medium',
        '2': 'hard',
      };
      const difficulty = difficultyMap[fromData.level as keyof typeof difficultyMap];

      const res = await axios.post(
        'http://127.0.0.1:5000/generate-quiz',
        {
          questions: fromData.questions,
          difficulty,
          prompt: fromData.prompt,
        },
        { headers: { 'Content-Type': 'application/json' } }
      );
      if (option !== 'Mock test') {
        const hours = (document.getElementById('hours') as HTMLInputElement).value;
        const minutes = (document.getElementById('minutes') as HTMLInputElement).value;
        const seconds = (document.getElementById('seconds') as HTMLInputElement).value;
        localStorage.setItem('quizTime', JSON.stringify({ hours, minutes, seconds }));
      }
      const quizDataToSet = {
        questions: res.data.questions || [],
        level: fromData.level,
        data: res.data,
        totalMarks: res.data.questions?.length || 0,
        negativeMarks: negativeMarks
      };
      setQuizData(quizDataToSet);
      toast.success("Test Started");
      router.push(`/Test/${option}`)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error('Response error:', error.response.data);
        } else if (error.request) {
          console.error('Request error:', error.request);
        } else {
          console.error('Error:', error.message);
        }
      } else {
        console.error('Unexpected error:', error);
      }
    }
  }

  return (
    <form className='w-full  h-full relative' autoCorrect='yes' autoComplete='on' onSubmit={formSubmit}>
      <div className="w-full h-[10%]  flex-center mt-16" >
        <p className={`${poppin.className} text-md`}>Customize the format of your questions according to your preferences</p>
      </div>
      <div className="w-full h-[10%] relative  flex-all mt-12">
        <div className="flex w-[20%] flex-center relative">
          <p className={`${poppin.className} text-md`}>Number Of Questions :</p>
          <input
            type="text"
            className="inputs"
            value={questions}
            onChange={(e) => handleNumberChange(e, setQuestions)}
            required
            inputMode="numeric"
            pattern="[0-9]*"
          />
        </div>
        <div className="flex w-[20%] flex-center relative">
          <p className={`${poppin.className} text-md`}>Total Marks : </p>
          <input
            type="text"
            className="inputs"
            value={totalMarks}
            onChange={(e) => handleNumberChange(e, setTotalMarks)}
            required
            inputMode="numeric"
            pattern="[0-9]*"
          />
        </div>
        <div className="flex w-[20%] flex-center relative">
          <p className={`${poppin.className} text-md`}>Negative Marks : </p>
          <input
            type="text"
            className="inputs"
            value={negativeMarks}
            onChange={(e) => handleNumberChange(e, setNegativeMarks)}
            required
            inputMode="numeric"
            pattern="[0-9]*"
          />
        </div>
      </div>
      <div className="flex-center h-[15%] w-full mt-16  relative">
        <p className={`${poppin.className} text-md mr-2`}>Set time for Quiz{"         "} : {"  "}</p>
        <input type="text" name="text" className="inputs" required inputMode='numeric' id="hours" /><span className={`${poppin.className} text-md ml-2 mr-5`}>hr</span>
        <input type="text" name="text" className="inputs" required inputMode='numeric' id="minutes" /><span className={`${poppin.className} text-md ml-2 mr-5`}>min</span>
        <input type="text" name="text" className="inputs" required inputMode='numeric' id="seconds" /><span className={`${poppin.className} text-md ml-2 mr-5`}>sec</span>
      </div>
      <div className="flex-center h-[15%] w-full  py-10 mt-5">
        <p className={`${poppin.className} text-md mr-2`}>Levels of Medium ({" "}Easy - 0 | Medium - 1 | Hard - 2 {" "}) {" "}:{" "}</p>
        <input type="text" inputMode='numeric' required max={1} value={level} pattern='[0-2]' onChange={(e) => { handleLevel(e) }} className='ml-5 w-20 bg-transparent border-b-2 outline-none flex-center px-1 pl-8' />
      </div>
      <div className="flex-center h-[15%] w-full mt-5  relative">
        <button className={`confirm ${poppin.className}`} type='submit'>Generate {`${test === 'Content' ? 'Quiz' : 'Content'}`}</button>
      </div>
    </form>
  )
}

export default Real



