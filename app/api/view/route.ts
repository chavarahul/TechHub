import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const POST = async(req:NextRequest) => {
    const data = await req.json()
    const name = data.art
    console.log(name) 
    const res = await axios.get(`https://dev.to/api/articles?tag=${name}`)
    return NextResponse.json(res.data)

}