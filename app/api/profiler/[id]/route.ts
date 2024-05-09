import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient()


export const GET = async (req: NextRequest,{params}:any) => {
    const {id}= params;
    console.log(id)
    if(id){
        const DeletePost = await prisma.user.findUnique({
            where:{
                id
            }
         })
         return NextResponse.json(DeletePost)
        }
};