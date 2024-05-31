'use client';

import { poppin } from '@/app/constants';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { FormData, TestType } from '@/app/constants/type';
import { quizContest } from '../context/QuizContext';
import { useRouter } from 'next/navigation';
const Mock = ({ test, prompt,option }:TestType) => {
  const [questions, setQuestions] = useState('');
  const [totalMarks, setTotalMarks] = useState('');
  const [level, setLevel] = useState('');
  const {setQuizData}:any = useContext(quizContest);
  const router = useRouter();

  const handleNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
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
  };

  const handleSubmit = async (formData: FormData) => {
    try {
      const res = await axios.post(
        'http://127.0.0.1:5000/mock',
        {
          type: formData.type,
          questions: formData.questions,
          level: formData.level,
          prompt: formData.prompt,
        },
        { headers: { 'Content-Type': 'application/json' } }
      ).finally(()=>{
        setQuestions('');
        setTotalMarks('')
        setLevel('')
      })
      setQuizData({ questions, totalMarks, level, data: res?.data });
      router.push(`/Test/${option}`)
      console.log(res.data);
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
  };

  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData: FormData = { type: test, questions, level, prompt };
    handleSubmit(formData);
  };

  return (
    <form className='w-full h-full relative' autoComplete='on' onSubmit={formSubmitHandler} method='post'>
      <div className='w-full h-[10%] flex-center mt-16'>
        <p className={`${poppin.className} text-md`}>Customize the format of your questions according to your preferences</p>
      </div>
      <div className='w-full h-[10%] relative flex-all mt-16'>
        <div className='flex w-[20%] flex-center relative'>
          <p className={`${poppin.className} text-md mr-2`}>Number Of Questions:</p>
          <input
            type='text'
            className='inputs'
            value={questions}
            onChange={(e) => handleNumberChange(e, setQuestions)}
            required
            inputMode='numeric'
            pattern='[0-9]*'
          />
        </div>
        <div className='flex w-[20%] flex-center relative'>
          <p className={`${poppin.className} text-md mr-2`}>Total Marks:</p>
          <input
            type='text'
            className='inputs'
            value={totalMarks}
            onChange={(e) => handleNumberChange(e, setTotalMarks)}
            required
            inputMode='numeric'
            pattern='[0-9]*'
          />
        </div>
      </div>
      <div className='flex-center h-[15%] w-full py-10 mt-5 mb-1'>
        <p className={`${poppin.className} text-md mr-2`}>Levels of Medium ({" "}Easy - 0 | Medium - 1 | Hard - 2 {" "}) {" "}:{" "}</p>
        <input
          type='text'
          inputMode='numeric'
          required
          max={1}
          value={level}
          pattern='[0-2]'
          onChange={handleLevel}
          className='ml-5 w-20 bg-transparent border-b-2 outline-none flex-center px-1 pl-8'
        />
      </div>
      <div className='flex-center h-[15%] w-full mt-5 relative'>
        <button className={`confirm ${poppin.className}`} type='submit'>
          Generate {`${test === 'Content' ? 'Quiz' : 'Content'}`}
        </button>
      </div>
    </form>
  );
};

export default Mock;
