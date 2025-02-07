'use client';
import React, { useEffect, useState } from 'react';

const Results = () => {
    const [score, setScore] = useState<number | null>(null);
    const [questionDetails, setQuestionDetails] = useState<
        { question: string, selectedOption: string, correctAnswer: string, options: string[] }[] | null
    >(null);

    useEffect(() => {
        const storedScore = localStorage.getItem('quizScore');
        const storedQuestionDetails = localStorage.getItem('questionDetails');

        if (storedScore) setScore(Number(storedScore));
        if (storedQuestionDetails) setQuestionDetails(JSON.parse(storedQuestionDetails));
    }, []);

    return (
        <section className="w-full mt-10 min-h-[90vh]  relative flex-center flex-col my-40">
            <div className="w-[65%] h-full relative flex flex-col items-center justify-center">
                <h2>Your Score: {score}</h2>
                <div className="mt-5 w-full">
                    <h3>Review Your Answers:</h3>
                    {questionDetails?.map((item, index) => (
                        <div key={index} className="mt-4 p-4 border-b border-gray-300">
                            <p><strong>{index + 1}. {item.question}</strong></p>
                            <div className="mt-2">
                                <p><strong>Your Answer:</strong> {item.selectedOption}</p>
                                <p><strong>Correct Answer:</strong> {item.correctAnswer}</p>
                            </div>
                            <div className="mt-2">
                                <p><strong>Options:</strong></p>
                                <ul>
                                    {item.options.map((option, i) => (
                                        <li key={i}>
                                            <strong>{['A', 'B', 'C', 'D'][i]}:</strong> {option}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className={`mt-2 ${item.selectedOption === item.correctAnswer ? 'text-green-600' : 'text-red-600'}`}>
                                {item.selectedOption === item.correctAnswer ? 'Correct' : 'Incorrect'}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <button className='py-3 px-8 bg-white text-black mt-9 rounded-full'
            onClick={() => window.location.href = '/quiz'}
            >Home</button>
        </section>
    );
};

export default Results;
