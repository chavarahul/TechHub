'use client'
import React, { useContext } from 'react'
import { quizContest } from '@/app/components/context/QuizContext'

const Page = () => {
    const { quizData }: any = useContext(quizContest);

    if (!quizData) {
        return <p>No quiz data available</p>;
    }

    const { questions, totalMarks, level, data } = quizData;

    return (
        <>
            <div>{totalMarks}</div>
            <p>{level}</p>
            <p>{questions}</p>
        </>
    )
}

export default Page;
