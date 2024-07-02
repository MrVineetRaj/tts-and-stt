"use client";
// app/page.tsx
// pages/app/page.tsx

import { useEffect, useState } from "react";

export default function Home() {
  const text =
    "भगवद् गीता जीवन की रहस्योद्घाटन करने वाला, कर्म, ज्ञान और भक्ति के मार्गों का मार्गदर्शन करने वाला एक पवित्र ग्रंथ है।";

  const generateAudio = async () => {
    try {
      const response = await fetch("/api/stt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (response.ok) {
        console.log("Audio file generated successfully");
        const data = await response.json();
        console.log("Audio file URL:", data.url);
      } else {
        console.error("Failed to generate audio file");
      }
    } catch (error) {
      console.error("Error generating audio file:", error);
    }
  };

  return (
    <div>
      <h1>Generate and Save Audio in Next.js</h1>

      <br />
      <button onClick={generateAudio}>Generate Audio</button>
    </div>
  );
}
