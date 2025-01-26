'use client';

import React, { createContext, useState, useEffect, useMemo } from 'react';
import { QuizContestType } from '@/app/constants/type';

export const quizContest = createContext<{
  quizData: QuizContestType | null;
  setQuizData: React.Dispatch<React.SetStateAction<QuizContestType | null>>;
} | undefined>(undefined);

const QuizContext = ({ children }: { children: React.ReactNode }) => {
  const [quizData, setQuizData] = useState<QuizContestType | null>(() => {
    try {
      const savedData = localStorage.getItem('quizData');
      return savedData ? (JSON.parse(savedData) as QuizContestType) : null;
    } catch (error) {
      console.error('Error parsing quizData from localStorage:', error);
      return null;
    }
  });

  useEffect(() => {
    if (quizData) {
      localStorage.setItem('quizData', JSON.stringify(quizData));
    }
  }, [quizData]);

  const contextValue = useMemo(() => ({ quizData, setQuizData }), [quizData]);

  return (
    <quizContest.Provider value={contextValue}>
      {children}
    </quizContest.Provider>
  );
};

export default QuizContext;
