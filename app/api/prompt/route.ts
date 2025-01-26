import { NextRequest, NextResponse } from "next/server";

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI('AIzaSyBjsFVUlaaffEHcH7UG_fY-b2RQkYFl_GI');
export const POST = async(request:NextRequest) => {
    const body =  await request.json()
    console.log(body)
    const title:string = body.prompts
    const lang:string = body.lang
    console.log(title)
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  
    const prompt =`Generate the top four prompts for the given text '${title} in the language ${lang}`
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    return NextResponse.json({text})
  }
