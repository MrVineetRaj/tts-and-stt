"use client";
// app/page.tsx
import { useEffect, useState } from "react";

export default function Home() {
  const text =
    "भगवद् गीता जीवन की रहस्योद्घाटन करने वाला, कर्म, ज्ञान और भक्ति के मार्गों का मार्गदर्शन करने वाला एक पवित्र ग्रंथ है।";
  const handleSpeak = (voice: string = "Macedonian Male") => {
    if (typeof responsiveVoice !== "undefined") {
      responsiveVoice.speak(text, voice);
    } else {
      console.error("responsiveVoice is not defined");
    }
  };

  useEffect(() => {
    const checkResponsiveVoice = () => {
      if (typeof responsiveVoice === "undefined") {
        console.error("responsiveVoice is not loaded");
      } else {
        console.log("responsiveVoice is loaded");
      }
    };

    checkResponsiveVoice();

    // Optionally, add a small delay to ensure script loading
    const interval = setInterval(() => {
      if (typeof responsiveVoice !== "undefined") {
        clearInterval(interval);
        console.log("responsiveVoice is loaded");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>ResponsiveVoice with Next.js</h1>

      <br />
      <button
        onClick={() => {
          handleSpeak("Hindi Female");
        }}
      >
        Speak
      </button>
    </div>
  );
}
