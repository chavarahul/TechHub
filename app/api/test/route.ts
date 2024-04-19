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

    const prompt = `give me the errors in the code ${title} if executed in programming language ${lang}
    and generate a response as the output of the code ${title} if executed in the selected language - not the expected language!
    provide the line in which the error is the spotted(if any)!
    Crisp your entire response to only 3 - 4 lines!`
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    return NextResponse.json({ text })
}
