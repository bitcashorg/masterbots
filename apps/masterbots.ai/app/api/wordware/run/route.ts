// app/api/wordware/run/route.ts

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const API_KEY = process.env.WORDWARE_API_KEY;

  if (!API_KEY) {
    return NextResponse.json({ error: 'Wordware API key is not set' }, { status: 500 });
  }

  try {
    const { promptId, inputs } = await req.json();

    const response = await fetch(`https://app.wordware.ai/api/prompt/${promptId}/run`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputs }),
    });

    if (!response.ok) {
      throw new Error(`Wordware API error: ${response.statusText}`);
    }

    // Instead of parsing JSON, we'll return the response as a stream
    return new NextResponse(response.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Error running Wordware prompt:', error);
    return NextResponse.json({ error: 'An error occurred while running the prompt' }, { status: 500 });
  }
}