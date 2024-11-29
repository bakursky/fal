// app/api/generate-image/route.js
import { Fal } from "fal-js";

// Configure Fal.ai client
Fal.initialize({
  credentials: process.env.FAL_API_KEY
});

// Workflow ID from the provided link
const WORKFLOW_ID = 'bakursky/landscape-image-generation';

export async function GET() {
  try {
    // Execute the Fal.ai workflow
    const result = await Fal.run(WORKFLOW_ID, {
      // Add any required input parameters for your specific workflow
      // Example: 
      // input: {
      //   prompt: "A beautiful landscape at sunset",
      //   width: 1024,
      //   height: 768
      // }
    });

    // Log the generated image URL
    console.log('Generated Image URL:', result.images[0].url);

    // Return the image URL in the response
    return new Response(JSON.stringify({ 
      imageUrl: result.images[0].url 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Image generation failed:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to generate image' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}