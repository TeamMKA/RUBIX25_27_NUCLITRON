import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const { imageUrl, styleImageUrl, textPrompt } = body;

        // Validate input
        if (!imageUrl || !styleImageUrl || !textPrompt) {
            return NextResponse.json(
                { error: 'Missing required parameters' },
                { status: 400 }
            );
        }

        const apiKey = process.env.NEXT_PUBLIC_LIGHTX_API_KEY;
        if (!apiKey) {
            return NextResponse.json(
                { error: 'API key not configured' },
                { status: 500 }
            );
        }

        const url = 'https://api.lightxeditor.com/external/api/v1/avatar';

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
            },
            body: JSON.stringify({
                imageUrl,
                styleImageUrl,
                textPrompt,
            }),
        };

        const response = await fetch(url, options);

        if (!response.ok) {
            return NextResponse.json(
                { error: `Request failed with status ${response.status}` },
                { status: response.status }
            );
        }        
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Avatar generation error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
