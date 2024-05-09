import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient()


export const POST = async (req: NextRequest) => {


    const body = await req.formData();

    const email: any = body.get('name')
    const Image: any = body.get('image')
    const id: any = body.get('id')
    // console.log(email, Image, id)

    const profileUpdate = await prisma.user.update({
        where: { id },
        data: {
            email, Image
        } as any
    })
    return NextResponse.json({ message: "Profile updated successfully", profile: profileUpdate })
}
