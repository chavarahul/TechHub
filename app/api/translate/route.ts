import { NextRequest } from "next/server";
import axios from "axios";
import { headers } from "next/headers";
export const POST = async(req:NextRequest) =>{

const body = await req.json()
const title = body.trans
try {
	const response = await axios.post('https://google-translate1.p.rapidapi.com/language/translate/v2/detect',{headers:{
        'content-type': 'application/x-www-form-urlencoded',
        'Accept-Encoding': 'application/gzip',
        'X-RapidAPI-Key': 'ac168204efmshc8eb66d389d0fe1p1a66fejsn303d29acb0c9',
        'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'  
    }},{data:title});
	console.log(response.data);
} catch (error) {
	console.error(error);
}
}