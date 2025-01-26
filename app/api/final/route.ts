import { NextRequest, NextResponse } from "next/server";

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI('AIzaSyBjsFVUlaaffEHcH7UG_fY-b2RQkYFl_GI');
export const POST = async (request: NextRequest) => {
    const body = await request.json()
    console.log(body)
    const title: string = body.check
    console.log(title)
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Summarize the given text: ${title} in a simple and understandable in 2-3 lines which beginner can understand easily`
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    return NextResponse.json({ text })
}
