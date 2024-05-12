import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from 'next-auth/react';

const prisma = new PrismaClient()
export const POST = async (req:NextRequest,res:NextResponse)=>{
 const cData = await req.json();
 const prompt = cData.prompt;
 const data = cData.data;
 const userId = cData.id
 console.log(prompt,data,userId)
 try{
    const createPrompt = await prisma.chat.create({
        data:{
           prompt,
            data,
            user:{
                connect:{id:userId}
            }
        }
    })
    return NextResponse.json({createPrompt})
 }catch(err){
  console.log(err)
 }

}
