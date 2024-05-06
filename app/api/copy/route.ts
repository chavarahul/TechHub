
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()
export const POST = async (request: NextRequest) => {
    const registerData = await request.json();
    const rester:string = registerData.rest;
    console.log(rester)

    try {
        console.log("dfd")
        const newUser = await prisma.posts.create({
            data: {
                data: rester
            }
        })
        console.log("fff")
        return NextResponse.json({ newUser }, { status: 201 })
    } catch (err) {
        return NextResponse.json({ status: 500 })
    }
}

export const GET = async() =>{
    console.log("df")
    const daat  = await prisma.posts.findMany()
    console.log("df")
    return NextResponse.json(daat)
}
