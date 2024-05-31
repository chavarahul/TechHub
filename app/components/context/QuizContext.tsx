'use client'
import React, { createContext, useState, useEffect } from 'react'
import { QuizContestType } from '@/app/constants/type'

export const quizContest = createContext<QuizContestType | undefined>(undefined)

const QuizContext = ({ children }: { children: React.ReactNode }) => {
  const [quizData, setQuizData] = useState(() => {
    const savedData = localStorage.getItem('quizData');
    return savedData ? JSON.parse(savedData) : null;
  });
  useEffect(() => {
    if (quizData) {
      localStorage.setItem('quizData', JSON.stringify(quizData));
    }
  }, [quizData]);

  return (
    <quizContest.Provider value={{ quizData, setQuizData }}>
      {children}
    </quizContest.Provider>
  )
}

export default QuizContext;
