import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()
export const GET = async (req:NextRequest,{params}:any)=>{
 const {id} = params;
    try{
        const res = await prisma.chat.findMany({
            where:{
               userId: id
            }
        });
        return NextResponse.json({createPrompt:res})
    }catch(err){
        console.log(err)
    }
}


export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const { userId } = await req.json(); 

        const chat = await prisma.chat.findUnique({
            where: { id },
            select: { userId: true },
        });

        if (!chat) {
            return NextResponse.json({ error: 'Chat not found' }, { status: 404 });
        }

        if (chat.userId !== userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        await prisma.chat.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Chat deleted successfully' });
    } catch (error) {
        console.error('Error deleting chat:', error);
        return NextResponse.json({ error: 'Error deleting chat' }, { status: 500 });
    }
}