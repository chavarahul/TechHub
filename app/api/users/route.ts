import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server";

const prisma  = new PrismaClient();
export const GET = async() =>{
 try{
    const res = await prisma.user.findMany({
        select:{
            username:true
        }
    });
    return NextResponse.json({res})
 }catch(err){
    console.log(err)
 }
}