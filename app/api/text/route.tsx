// pages/api/imageGeneration.js

import { NextRequest, NextResponse } from 'next/server';
import fetch from 'node-fetch';

export const POST =async(req:NextRequest) =>{
    const body = await req.json()
    const title= body.prompts
    console.log(title)
  try {
    const resp = await fetch(
      `https://api.limewire.com/api/image/generation`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Version': 'v1',
          Accept: 'application/json',
          Authorization: `Bearer lmwr_sk_U0gvrvKyi1_YLf7PTAHFxoycSCqSK7gUPD5GR9O5Fz6bkh8V`
        },
        body: JSON.stringify({
          prompt: `${title}`,
          negative_prompt: 'darkness, fog',
          samples: 2 ,
          quality: 'LOW',
          guidance_scale: 50,
          aspect_ratio: '1:1',
          style: 'PHOTOREALISTIC'
        })
      }
    );

    const data = await resp.json();
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error:', error);
  }
}
