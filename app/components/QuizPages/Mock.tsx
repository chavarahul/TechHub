'use client';

import { poppin } from '@/app/constants';
import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { FormData, TestType } from '@/app/constants/type';
import { quizContest } from '../context/QuizContext';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const Mock = ({ test, prompt, option }: TestType) => {
  const [questions, setQuestions] = useState('');
  const [totalMarks, setTotalMarks] = useState('');
  const [level, setLevel] = useState('');
  const { setQuizData }: any = useContext(quizContest);
  const mainContent = useRef<HTMLDivElement | null>(null)
  const router = useRouter(); const [selectedText, setSelectedText] = useState('');

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
    };
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, formData: FormData) => {
    if (!formData.level || !formData.prompt || !formData.questions || !formData.type) {
        toast.error('Invalid details');
        return;
    }

    try {
        const difficultyMap = {
            '0': 'easy',
            '1': 'medium',
            '2': 'hard',
        };
        const difficulty = difficultyMap[formData.level as keyof typeof difficultyMap];

        const res = await axios.post(
            'http://127.0.0.1:5000/generate-quiz',
            {
                questions: formData.questions,
                difficulty,
                prompt: formData.prompt,
            },
            { headers: { 'Content-Type': 'application/json' } }
        );

        const quizDataToSet = {
            questions: res.data.questions || [], 
            level: formData.level,
            data: res.data,
            totalMarks: res.data.questions?.length || 0,
            negativeMarks: 0 
        };

        setQuizData(quizDataToSet);

        console.log(quizDataToSet)
        localStorage.setItem('quizData', JSON.stringify(quizDataToSet));

        toast.success('Test Started');
        router.push(`/Test/${option}`);
    } catch (error) {
        console.error('Error generating quiz:', error);
        toast.error('Failed to generate quiz');
    }
};
  
  

  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData: FormData = { type: test, questions, level, prompt };
    handleSubmit(e, formData);
  };


  useEffect(() => {
    const selection = window.getSelection();
    console.log(selection)
    if (selection) {
      const text = selection.toString();
      console.log(text);
      setSelectedText(text);
    } else {
      console.log('No text selected');
    }
  }, [selectedText]);
  return (
    <>
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
            Generate Quiz
          </button>
          <button onClick={() => { localStorage.removeItem('option'); localStorage.removeItem('input') }}>ddd</button>
        </div>
      </form>
    </>
  );
};

export default Mock;



// There are many ai’s which helps us to increase your productivity but it is limited to  only the user who know English and making non-English users as barrier to use ai’s ..the users who can understand English and can use ai’s but they don’t know how to use ai’s to increase their productivity , and nowadays most of the developers use ai’s to auto complete their code in compilers  by ai’s making them decreasing their logical building capabilities . user  
