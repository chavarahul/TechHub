import { NextRequest, NextResponse } from "next/server";

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
export const POST = async (request: NextRequest) => {
    const body = await request.json()
    console.log(body)
    const title: string = body.check
    const lang: string = body.langs
    console.log(title, lang)
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Performing a code review of the code is ${title} written in ${lang}.
    Identify basic errors without focusing on complex issues and list them in 5-8 lines. If the code "${title}" is not written in ${lang}, indicate that the programming language is incorrect.`
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    return NextResponse.json({ text })
}
