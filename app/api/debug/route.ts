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

    const prompt = `Debug the given code ${title} in the language ${lang} line by line
    If the ${title} is spotted to be in some other langauge then , specify the language.
    Give the expected output for the given code , if it is an error - explain why it is an error!
    If the code has syntax errors , give how to fix those errors 
    Crisp your response to only 7 to 8 lines!
    Format the response neatly and provide it point-wise!`
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    return NextResponse.json({ text })
}
