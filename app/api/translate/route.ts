// Import the necessary modules
import { NextRequest, NextResponse } from 'next/server';
import { translate } from '@vitalets/google-translate-api';

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const text = body.trans;
  const targetLanguage = body.lang;

  try {
    // Perform translation using @vitalets/google-translate-api
    const result = await translate(text, { to: targetLanguage });
    return NextResponse.json({ result: result.text });
  } catch (error) {
    console.error('Error translating text:', error);
    // Handle errors here
    return NextResponse.json({ error: 'An error occurred during translation.' }, { status: 500 });
  }
};
