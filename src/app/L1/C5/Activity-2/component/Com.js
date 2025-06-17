"use client";

import { useState } from "react";

const images = [
  "https://res.cloudinary.com/dey9w5okl/image/upload/v1733803056/Gemini_Generated_Image_uq0r8wuq0r8wuq0r_ortx4p.jpg",
  "https://res.cloudinary.com/dey9w5okl/image/upload/v1733803055/Gemini_Generated_Image_8h6s4k8h6s4k8h6s_paahkr.jpg",
  "https://res.cloudinary.com/dey9w5okl/image/upload/v1733803054/Gemini_Generated_Image_jeop98jeop98jeop_my1mni.jpg",
  "https://res.cloudinary.com/dey9w5okl/image/upload/v1733803058/Gemini_Generated_Image_69rwfv69rwfv69rw_mxkqcr.jpg",
  "https://res.cloudinary.com/dey9w5okl/image/upload/v1733803057/448_qo1an1.jpg",
  "https://res.cloudinary.com/dey9w5okl/image/upload/v1733803056/Gemini_Generated_Image_65gr9i65gr9i65gr_we4smi.jpg",
];

const responsibleImages = [
  images[0],
  images[4],
  images[5],
];

const irresponsibleImages = [
  images[1],
  images[2],
  images[3],
];

export default function BehaviourPage() {
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);

  const nextImage = () => {
    if (index + 1 < images.length) {
      setIndex(index + 1);
    } else {
      setDone(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 to-blue-200 flex flex-col items-center justify-start p-6">
      <h1 className="text-4xl font-bold text-blue-800 mb-8 text-center">
        Responsible vs Irresponsible Behaviour
      </h1>

      {!done ? (
        <div className="flex flex-col items-center">
          <div className="bg-white shadow-lg rounded-xl overflow-hidden mb-6 p-4">
            <img
              src={images[index]}
              alt={`Image ${index + 1}`}
              className="w-full max-w-md h-auto rounded-lg"
            />
          </div>

          <div className="space-x-4">
            <button 
            onClick={nextImage}
            className="w-[200px] text-white text-[17px] cursor-pointer py-[10px] rounded-[10px] bg-red-600 hover:bg-red-700">
              Needs improvement
            </button>
            <button 
            onClick={nextImage}
            className="w-[200px] text-white text-[17px] cursor-pointer py-[10px] rounded-[10px] bg-green-600 hover:bg-green-700">
              Responsible
            </button>
          </div>
          {/* <button
            onClick={nextImage}
            className="px-6 py-3 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 shadow-md transition"
          >
            Next
          </button> */}
        </div>
      ) : (
        <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            Categorized Images
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-medium text-green-700 mb-2">Responsible Behaviour</h3>
              <div className="space-y-4">
                {responsibleImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Responsible ${idx}`}
                    className="w-[150px] rounded-md border border-green-200 shadow"
                  />
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-medium text-red-700 mb-2">Irresponsible Behaviour</h3>
              <div className="space-y-4">
                {irresponsibleImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Irresponsible ${idx}`}
                    className="w-[150px] rounded-md border border-red-200 shadow"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
