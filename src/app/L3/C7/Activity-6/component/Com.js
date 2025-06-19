"use client";

import React, { useState, useRef } from "react";
import jsPDF from "jspdf";

const questions = [
  "Introduce Yourself. Present Your Product with an attention getter (something unique about it)",
  "Explain how your product solves a problem with clarity, precision, and confidence",
  "Describe your Product and How It Works: Show your ad poster to explain how your product works. Point to the parts inspired by nature to explain why they’re smart ideas.",
  "Highlight main benefits: What makes your product unique? Why should people buy it?",
  "Conclude with a Call-to-Action: Remind people why your product is their best choice "
];

const examples = [
  `Example: “Hi, my name is____, Say goodbye to buying multiple, expensive storage units by saying hello to ‘BeeSmart Storage.” All your shelving ideas can fit in our compact, cost-effective multi-layered storage unit.`,
  `Example: “Nature inspired us to create this unit as we observe the phenomenal artistry of bees in creating a beehive. With more and more people living in tiny spaces,  the need to create compact units to maximize space is more than ever.  BeeSmart Storage allows people to feel spacious in their surroundings regardless of the number of items they own and the dimensions of their living space.”`,
  `Example: “This hexagon design is inspired by honeycombs. It’s strong, lightweight, and allows efficiency of space design.”`,
  `Example: “It’s cost-effective, eco-friendly, and can adapt to any space regardless of size!”`,
  `Example: “Store efficiently, breathe easily, and keep the change. Enjoy your space with BeeSmart Storage System!”`
];

export default function Com() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [resultMessage, setResultMessage] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
        setResultMessage("Recording completed. Here is your audio:");
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setAudioURL(null);
      setResultMessage("Recording... Please speak now.");
    } catch (error) {
      setResultMessage("Error accessing microphone.");
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const downloadRecording = () => {
    if (audioURL) {
      const link = document.createElement("a");
      link.href = audioURL;
      link.download = "recording.wav";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const showNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setResultMessage("You've answered all questions!");
    }
  };

  const showSampleExample = () => {
    const doc = new jsPDF();
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(12);
    const lineHeight = 8;
    let y = 10;

    questions.forEach((q, i) => {
      const qLines = doc.splitTextToSize(`${i + 1}. ${q}`, 180);
      const eLines = doc.splitTextToSize(examples[i], 180);

      if (y + qLines.length * lineHeight + eLines.length * lineHeight > 280) {
        doc.addPage();
        y = 10;
      }

      doc.setFont("Helvetica", "bold");
      doc.text(qLines, 10, y);
      y += qLines.length * lineHeight;

      doc.setFont("Helvetica", "normal");
      doc.text(eLines, 10, y);
      y += eLines.length * lineHeight + 5;
    });

    doc.save("Product_Pitch_Example.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5 flex items-center justify-center font-sans">
      <div className="container max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-xl">
        <h1 className="text-center text-3xl font-bold text-gray-800 mb-6">
          Audio Recorder
        </h1>

        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={startRecording}
            disabled={isRecording}
            className={`px-6 py-3 rounded-lg text-white font-medium transition-colors duration-300 ${isRecording
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-teal-500 hover:bg-teal-600"
              }`}
          >
            Start Recording
          </button>
          <button
            onClick={stopRecording}
            disabled={!isRecording}
            className={`px-6 py-3 rounded-lg text-white font-medium transition-colors duration-300 ${!isRecording
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-teal-500 hover:bg-teal-600"
              }`}
          >
            Stop Recording
          </button>
          {audioURL && (
            <button
              onClick={downloadRecording}
              className="px-6 py-3 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors duration-300"
            >
              Download Recording
            </button>
          )}
        </div>

        <div className="result mt-5 text-lg text-gray-700 text-center">
          {resultMessage}
          {audioURL && (
            <audio controls src={audioURL} className="mt-4 w-full"></audio>
          )}
        </div>

        <div className="questions mt-8">
          {questions.map((question, index) => (
            <div
              key={index}
              className={`question-card p-6 bg-teal-50 rounded-lg shadow-sm ${currentQuestionIndex === index ? "block" : "hidden"
                }`}
            >
              <p className="text-lg text-gray-800 mb-6">{question}</p>
              {currentQuestionIndex < questions.length - 1 ? (
                <button
                  onClick={showNextQuestion}
                  className="px-6 py-3 rounded-lg bg-teal-500 text-white font-medium hover:bg-teal-600 transition-colors duration-300"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={showSampleExample}
                  className="px-6 py-3 rounded-lg bg-teal-500 text-white font-medium hover:bg-teal-600 transition-colors duration-300"
                >
                  Show sample example
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
