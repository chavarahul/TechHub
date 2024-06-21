import React from "react"

export interface userType {
    id: string
    password: string
    email: string
    Image: string
    createdAt: string
    updatedAt: string
    username?:string
}

export interface FormData {
    type: string;
    questions: string;
    level?: string;
    prompt: string;
    monitering?: boolean;
    negativeMarks? : string
}

export interface QuizContestType {
    quizData: any,
    setQuizData: React.Dispatch<React.SetStateAction<any>>
}

export interface childrenType {
    children: React.ReactNode
}

export interface TestType {
    test: string;
    prompt: string;
    option: string
}