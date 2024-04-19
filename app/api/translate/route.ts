// Import NextResponse from next/server
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export const POST = async (req: NextRequest) => {
  try {
    // Parse the JSON body from the request
    const body = await req.json();
    const text = body.trans;
    const targetLanguage = body.lang;

    const apiKey = 'YOUR_LINGVANEX_API_KEY'; // Replace with your Lingvanex API key
    const url = 'https://api-b2b.lingvanex.com/v1/translate';
    const payload = {
      text: text,
      targetLang: targetLanguage
    };

    const response = await axios.post(url, payload, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    const translatedText = response.data.translation_result.translations[0].text;

    // Return the translated text as a JSON response
    return NextResponse.json({ translatedText });
  } catch (error) {
    // If an error occurs, return a 500 Internal Server Error response
    return NextResponse.json(new Error('Translation request failed'));
  }
};
