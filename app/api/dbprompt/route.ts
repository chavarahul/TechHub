import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()
export const POST = async (req:NextRequest,res:NextResponse)=>{
 const cData = await req.json();
 const prompt = cData.prompt;
 const data = cData.data;
 console.log(prompt,data)
 try{
    const createPrompt = await prisma.prompts
 }

 return NextResponse.json({data})
}