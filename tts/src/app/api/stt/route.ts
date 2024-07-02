// pages/api/speak.ts

import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import * as tts from "google-tts-api";
import { NextResponse } from "next/server";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  const data = await req.json();
  const { text } = data;

  const podcastTitle = "binodKaLife";
  const filePath = path.join(
    process.cwd(),
    "public",
    "audio",
    podcastTitle + ".mp3"
  );

  try {
    const url = tts.getAudioUrl(text, {
      lang: "hi", // Hindi language
      slow: false, // Normal speed
      host: "https://translate.google.com",
    });

    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    fs.writeFileSync(filePath, buffer);

    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "video", // For audio files, use 'video'
      public_id: `${"binod"}/audio/${path.parse(filePath).name}`, // Dynamic folder path
      overwrite: true,
      type: "authenticated", // Set to authenticated for private access
    });

    fs.unlinkSync(filePath);

    return NextResponse.json({
      message: "Audio file generated successfully",
      url: result.secure_url,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "Failed to generate audio file",
      error: "Error uploading file " + error,
    });
  }
}
