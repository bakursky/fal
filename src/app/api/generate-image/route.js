import { NextResponse } from "next/server";
import { fal } from "@fal-ai/client";

export async function GET() {
  try {
    // Initiate the workflow
    const stream = await fal.stream("workflows/bakursky/landscape-image-generation", {
      input: {}
    });

    // Collect the stream output
    let imageLink = "";
    for await (const event of stream) {
      console.log(event); // Log event for debugging
      if (event.type === "output" && event.data.link) {
        imageLink = event.data.link;
      }
    }

    // Ensure stream is done
    await stream.done();

    // Log the result
    console.log("Generated Image Link:", imageLink);

    // Return the image link
    return NextResponse.json({ message: "Image generated successfully", imageLink });
  } catch (error) {
    console.error("Error generating image:", error);
    return NextResponse.json({ error: "Failed to generate image" }, { status: 500 });
  }
}
