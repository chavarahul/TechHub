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

    const prompt = `Debug the code ${title} written in ${lang} line by line. 
    Make sure your response doesnot exceed 6 lines.Avoid Special characters such as * , # , $ in the explanation.
    Do provide the expected output of the given code`
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    return NextResponse.json({ text })
}
