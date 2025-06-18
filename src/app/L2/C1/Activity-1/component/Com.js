"use client";
import React from 'react';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center p-4 font-inter">
      <div className="bg-white sm:p-2 rounded-xl shadow-2xl max-w-3xl w-full text-center border-t-4 border-red-500">

        <div
          className="relative w-full overflow-hidden rounded-xl shadow-lg"
          style={{ paddingBottom: '75%', height: 0 }}
        >
          <iframe
            src="//www.tinytap.com/activities/g445h/player/embed/"
            allowFullScreen
            loading="lazy"
            title="TinyTap Activity Player"
            className="absolute top-0 left-0 w-full h-full border-0"
          ></iframe>
        </div>

      </div>
    </div>
  );
}
