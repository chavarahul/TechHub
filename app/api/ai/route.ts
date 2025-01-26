import { NextRequest, NextResponse } from "next/server";

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI('AIzaSyBjsFVUlaaffEHcH7UG_fY-b2RQkYFl_GI');
export const POST = async (request: NextRequest) => {
    const body = await request.json()
    console.log(body)
    const tell = body.lang
    const title: string = body.prompts
    console.log(title)
    console.log(tell)
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `explain about ${title} in ${tell} language`
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    return NextResponse.json({ text })
}
