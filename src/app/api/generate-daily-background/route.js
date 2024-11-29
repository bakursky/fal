// app/api/generate-daily-background/route.ts
import { fal } from "@fal-ai/client";
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // Ensure dynamic rendering

export async function GET() {
  try {
    const stream = await fal.stream("workflows/bakursky/landscape-image-generation", {
    });

    // Process the stream
    for await (const event of stream) {
      console.log("Streaming event:", event);
    }

    // Get final result
    const result = await stream.done();

    // Extract image URL
    if (result.output && result.output.images && result.output.images.length > 0) {
      const imageUrl = result.output.images[0].url;
      
      // Optionally, you could save this URL to a database or file
      return NextResponse.json({ 
        imageUrl, 
        generatedAt: new Date().toISOString() 
      });
    } else {
      throw new Error("No image generated");
    }
  } catch (error) {
    console.error("Image generation error:", error);
    return NextResponse.json({ 
      error: "Failed to generate image", 
      details: error.message 
    }, { status: 500 });
  }
}