import { NextResponse } from "next/server";

// Access the in-memory cache from the `generate-image` route
export async function GET() {
  try {
    if (!global.latestImageUrl) {
      throw new Error("No image URL available. The cron job may not have run yet.");
    }

    return NextResponse.json({ success: true, imageUrl: global.latestImageUrl });
  } catch (error) {
    console.error("Error fetching cached image URL:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
