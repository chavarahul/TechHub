import { NextRequest, NextResponse } from "next/server";

const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// Converts local file information to a GoogleGenerativeAI.Part object.
function fileToGenerativePart(path:any, mimeType:any) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType
    },
  };
}

export const POST =async(req:NextRequest) =>{
     // Parse the incoming form data
  const formData = await req.formData();

  // Get the file from the form data
  const file = formData.get("file");

  // Check if a file is received
  if (!file) {
    // If no file is received, return a JSON response with an error and a 400 status code
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }
  

  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

  const prompt = "Describe the image";

  const imageParts = [
    fileToGenerativePart(`${file}`, "image/png"),
    // fileToGenerativePart("image2.jpeg", "image/jpeg"),
  ];

  const result = await model.generateContent([prompt, ...imageParts]);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}
