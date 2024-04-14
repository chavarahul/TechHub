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

    const prompt = `give me only  the output of code ${title} in ${lang} language,if given code is not ${lang} programming then give output as incorrect programming language`
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    return NextResponse.json({ text })
}
