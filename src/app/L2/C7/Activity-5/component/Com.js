"use client";

import React, { useState, useRef } from "react";

const questions = [
  "What problem does it solve? Does it make something easier? safer? faster?",
  "How is it inspired by nature? Tell us how it is inspired.",
  "What’s your favorite part of the design? What do you like most about your invention? Anything you are especially proud of - how it works, or how it looks?",
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
            className={`px-6 py-3 rounded-lg text-white font-medium transition-colors duration-300 ${
              isRecording
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-teal-500 hover:bg-teal-600"
            }`}
          >
            Start Recording
          </button>
          <button
            onClick={stopRecording}
            disabled={!isRecording}
            className={`px-6 py-3 rounded-lg text-white font-medium transition-colors duration-300 ${
              !isRecording
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
              className={`question-card p-6 bg-teal-50 rounded-lg shadow-sm ${
                currentQuestionIndex === index ? "block" : "hidden"
              }`}
            >
              <p className="text-lg text-gray-800 mb-6">{question}</p>
              {currentQuestionIndex < questions.length - 1 && (
                <button
                  onClick={showNextQuestion}
                  className="px-6 py-3 rounded-lg bg-teal-500 text-white font-medium hover:bg-teal-600 transition-colors duration-300"
                >
                  Next
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}