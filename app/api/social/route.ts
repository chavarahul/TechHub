
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()
export const POST = async (request: NextRequest) => {
    const registerData = await request.json();
    console.log(registerData)
    const { message,userId } = registerData;

        const newUser = await prisma.social.create({
            data: {
             messages:message,
             user:{
                connect:{id:userId}
            }
            }
        })
        return NextResponse.json({ newUser}, { status: 201 })
    } 

