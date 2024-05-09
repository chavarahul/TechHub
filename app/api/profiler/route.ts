import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient()
export const POST = async (req: NextRequest) => {


    const body = await req.formData();

    // Access form fields
    const email: any = body.get('name')
    const Image: any = body.get('image')
    const userId: any = body.get('id')
    console.log(email, Image, userId)

    const profileUpdate = await prisma.profile.update({
        where: { userId },
        data: {
            email, Image
        }
    })
    return NextResponse.json({ message: "Profile updated successfully", profile: profileUpdate })
}