import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const POST = async(req:NextRequest) => {
    const data = await req.json()
    const name = data.art
    console.log(name) 
    const res = await axios.get(`https://dev.to/api/articles?tag=${name}`)

    const datas = res.data.slice(0,5)
    const newsUpdates = await axios.get('https://newsapi.org/v2/everything', {
        params: {
            q: `${name}`,
            apiKey: 'dda8db681ab74cae8f51713585f96c33'
        }
    });
    console.log(newsUpdates?.data)
    return NextResponse.json({
        devToArticles:datas,
        newsUpdates:newsUpdates.data.slice(0,5)
    })

}