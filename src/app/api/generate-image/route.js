// app/api/generate-image/route.ts
import { fal } from "@fal-ai/client";
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Configure fal.ai client (ensure you've set FAL_API_KEY in your environment)
    fal.config({
      apiKey: process.env.FAL_API_KEY
    });

    // Stream the workflow
    const stream = await fal.stream("workflows/bakursky/landscape-image-generation", {
      input: {} // Add any specific input parameters if required
    });

    // Collect the final result
    const result = await stream.done();

    // Log the image URL (assuming the result contains an image URL)
    console.log('Generated Image URL:', result.image?.url);

    // Optionally, you can save the image URL to a database or perform other actions
    return NextResponse.json({ 
      success: true, 
      imageUrl: result.image?.url 
    });

  } catch (error) {
    console.error('Image generation error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}

// Ensure this route is not cached
export const dynamic = 'force-dynamic';