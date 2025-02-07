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

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const { userId } = await req.json(); 
        const prompt = await prisma.prompts.findUnique({
            where: { id },
            select: { userId: true },
        });

        if (!prompt) {
            return NextResponse.json({ error: 'Prompt not found' }, { status: 404 });
        }

        if (prompt.userId !== userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        await prisma.prompts.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Prompt deleted successfully' });
    } catch (error) {
        console.error('Error deleting prompt:', error);
        return NextResponse.json({ error: 'Error deleting prompt' }, { status: 500 });
    }
}
