"use client";

import React, { useState, useRef, useEffect } from 'react';

export default function App() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [message, setMessage] = useState("Click 'Start Recording' to begin.");

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioStreamRef = useRef(null);

  const startRecording = async () => {
    audioChunksRef.current = [];
    setAudioBlob(null);
    setAudioUrl(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioStreamRef.current = stream;

      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const newAudioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        setAudioBlob(newAudioBlob);
        const newAudioUrl = URL.createObjectURL(newAudioBlob);
        setAudioUrl(newAudioUrl);
        setMessage("Recording completed. Here is your audio:");

        if (audioStreamRef.current) {
          audioStreamRef.current.getTracks().forEach(track => track.stop());
        }
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setMessage("Recording... Please speak now.");
    } catch (error) {
      setMessage("Error accessing microphone. Please ensure microphone access is granted.");
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const downloadRecording = () => {
    if (audioUrl) {
      const link = document.createElement("a");
      link.href = audioUrl;
      link.download = "recording.wav";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(audioUrl);
    }
  };

  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 font-inter">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-xl w-full text-center border-t-4 border-red-500">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6 tracking-tight">
          Audio Recorder
        </h1>

        <div className="flex flex-col space-y-4 mb-6">
          <button
            id="start-btn"
            onClick={startRecording}
            disabled={isRecording}
            className={`w-full py-3 px-6 rounded-lg font-semibold text-lg transition-all duration-300 ease-in-out
              ${isRecording
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
              }`}
          >
            {isRecording ? 'Recording...' : 'Start Recording'}
          </button>

          <button
            id="stop-btn"
            onClick={stopRecording}
            disabled={!isRecording}
            className={`w-full py-3 px-6 rounded-lg font-semibold text-lg transition-all duration-300 ease-in-out
              ${!isRecording
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : 'bg-red-500 hover:bg-red-600 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
              }`}
          >
            Stop Recording
          </button>

          {audioUrl && (
            <button
              id="download-btn"
              onClick={downloadRecording}
              className="w-full py-3 px-6 rounded-lg font-semibold text-lg bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-0.5"
            >
              Download Recording
            </button>
          )}
        </div>

        <div id="result" className="result text-gray-700 text-base mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="mb-2">{message}</p>
          {audioUrl && (
            <audio controls src={audioUrl} className="w-full mt-4 rounded-md shadow-inner"></audio>
          )}
        </div>
      </div>
    </div>
  );
}
