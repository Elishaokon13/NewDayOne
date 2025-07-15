import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import User from "@/lib/models/User";
import { connectToDatabase } from "@/lib/mongodb";

cloudinary.config({
  cloud_name: process.env.NEXT_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    // Get the form data
    const formData = await req.formData();
    const username = formData.get("username") as string;
    const file = formData.get("profilePicture") as File;

    if (!username || !file) {
      return NextResponse.json(
        { error: "Username and profile picture are required" },
        { status: 400 }
      );
    }

    // Check file size (optional - client-side validation recommended)
    if (file.size > 10 * 1024 * 1024) {
      // 10MB limit
      return NextResponse.json(
        { error: "File too large. Maximum size is 10MB." },
        { status: 413 }
      );
    }

    // Convert file to base64 for Cloudinary
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString("base64");
    const dataURI = `data:${file.type};base64,${base64}`;

    // Upload to Cloudinary using base64
    const uploadResult = await cloudinary.uploader.upload(dataURI, {
      folder: "profile_pics",
      resource_type: "auto",
      transformation: [
        { width: 500, height: 500, crop: "limit" }, // Resize to reduce size
        { quality: "auto:good" }, // Optimize quality
      ],
    });

    // Store in MongoDB
    await connectToDatabase();
    const user = await User.create({
      username,
      imageUrl: uploadResult.secure_url,
    });

    return NextResponse.json({
      username: user.username,
      imageUrl: user.imageUrl,
      _id: user._id,
    });
  } catch (error) {
    console.error("Error in POST handler:", error);

    // Handle specific errors
    if (error instanceof Error) {
      if (error.message.includes("Body exceeded")) {
        return NextResponse.json(
          { error: "File too large. Please upload a smaller image." },
          { status: 413 }
        );
      }
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
