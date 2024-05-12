import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()
export const GET = async (req:NextRequest,{params}:any)=>{
 const {id} = params;
    try{
        const res = await prisma.prompts.findMany({
            where:{
               userId: id
            }
        });
        return NextResponse.json({createPrompt:res})
    }catch(err){
        console.log(err)
    }
}