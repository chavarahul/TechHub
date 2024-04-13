import { NextApiRequest, NextApiResponse } from "next"
import { NextResponse } from "next/server"
import axios from "axios"
export const GET = async (request: NextApiRequest,res:NextApiResponse) => {
    
    try {
        const url: string = request.query.url as string;
        const response = await axios.get(url); // Fetch website content
        res.send(response.data);
       
    } catch (err) {
        return NextResponse.json({ status: 500 })
    }
}
