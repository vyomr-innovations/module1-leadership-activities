"use client";

import React, { useState, useRef } from "react";

const data = [
  {
    src: "https://res.cloudinary.com/dey9w5okl/image/upload/v1733980885/DALL_E_2024-12-12_10.44.27_-_A_young_girl_hiding_under_a_desk._The_girl_has_brown_hair_tied_in_a_ponytail_wearing_a_simple_dress._She_is_peeking_out_from_under_the_desk_with_a_lo_gtk5ak.webp",
    text: "Mia hides under a desk when she does not want to do work.",
    correct: "thumbsDown",
  },
  {
    src: "https://res.cloudinary.com/dey9w5okl/image/upload/v1733980886/DALL_E_2024-12-12_10.45.07_-_A_young_girl_sitting_on_a_couch_in_a_cozy_room_calming_down_by_counting_from_1_to_10._She_has_long_black_hair_and_is_wearing_a_comfortable_sweater._H_rrrjbk.webp",
    text: "Eva calms down by counting 1 to 10 when she gets angry.",
    correct: "thumbsUp",
  },
  {
    src: "https://res.cloudinary.com/dey9w5okl/image/upload/v1733980885/DALL_E_2024-12-12_10.46.03_-_A_young_girl_in_a_crowded_line_pushing_others_ahead_of_her_while_standing_in_a_queue._She_has_short_brown_hair_and_is_wearing_a_light_jacket_and_jean_lkjfob.webp",
    text: "Zoe pushes others ahead of her while standing in queue.",
    correct: "thumbsDown",
  },
  {
    src: "https://res.cloudinary.com/dey9w5okl/image/upload/v1733980884/b38d5172-f734-4c25-803e-f498134c141b_ettupz.jpg",
    text: "Ivy makes faces to tease others in the park.",
    correct: "thumbsDown",
  },
  {
    src: "https://res.cloudinary.com/dey9w5okl/image/upload/v1733980885/977e86ec-7bb3-4527-a404-de84620a8ec8_luuqjn.jpg",
    text: "Ada shares food with her friend.",
    correct: "thumbsUp",
  },
  {
    src: "https://res.cloudinary.com/dey9w5okl/image/upload/v1733980885/235ea340-99dc-4df2-90b9-381c3da0617d_xrifxd.jpg",
    text: "Nia draws silly pictures in a notebook instead of completing her work.",
    correct: "thumbsDown",
  },
  {
    src: "https://res.cloudinary.com/dey9w5okl/image/upload/v1733980884/7f32a283-1dfa-4942-bc32-31bbb000d17e_pvqpjx.jpg",
    text: "Sana jumps on the stairs instead of walking.",
    correct: "thumbsDown",
  },
];

export default function Com() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [feedbackColor, setFeedbackColor] = useState("");
  const [buttonType, setButtonType] = useState(null);

  const thumbsUpSoundRef = useRef(null);
  const thumbsDownSoundRef = useRef(null);

  const currentItem = data[currentImageIndex];
  const isEnd = currentImageIndex >= data.length;

  const handleThumbs = (type) => {
    const isCorrect = currentItem.correct === type;
    const sound =
      type === "thumbsUp" ? thumbsUpSoundRef.current : thumbsDownSoundRef.current;

    if (isCorrect) {
      setFeedbackColor("bg-green-500");
      setButtonType(type);
      if (sound) sound.play();
      setTimeout(() => {
        setFeedbackColor("");
        setButtonType(null);
        setCurrentImageIndex((prevIndex) => prevIndex + 1);
      }, 1500);
    } else {
      setFeedbackColor("bg-red-500");
      setButtonType(type);
      if (sound) sound.play();
      setTimeout(() => {
        setFeedbackColor("");
        setButtonType(null);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center justify-center p-4 font-sans text-gray-800">
      <div className="container bg-white/90 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-xl border border-blue-200 w-full max-w-xl text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-8 drop-shadow-sm">
          Thumbs Up or Thumbs Down?
        </h1>

        <div className="image-container mb-6">
          {!isEnd ? (
            <img
              src={currentItem.src}
              alt="Scene"
              className="w-full h-auto object-cover rounded-lg shadow-md border border-gray-200"
            />
          ) : (
            <div className="text-2xl font-semibold text-gray-700">
              Activity Ended
            </div>
          )}
          <p className="text-lg sm:text-xl mt-4 text-gray-700">
            {!isEnd && currentItem.text}
          </p>
        </div>

        {!isEnd && (
          <div className="controls flex justify-center space-x-6 mt-6">
            <button
              onClick={() => handleThumbs("thumbsUp")}
              className={`p-3 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105
                ${buttonType === "thumbsUp" ? feedbackColor : "bg-gray-200 hover:bg-gray-300"}
              `}
            >
              <img
                src="https://res.cloudinary.com/dey9w5okl/image/upload/v1733985748/thumbs-up_1313234_af0qhd.png"
                alt="Thumbs Up"
                className="w-12 h-12"
              />
            </button>
            <button
              onClick={() => handleThumbs("thumbsDown")}
              className={`p-3 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105
                ${buttonType === "thumbsDown" ? feedbackColor : "bg-gray-200 hover:bg-gray-300"}
              `}
            >
              <img
                src="https://res.cloudinary.com/dey9w5okl/image/upload/v1733985748/thumbs-up_benixe.png" // Corrected Thumbs Down image URL
                alt="Thumbs Down"
                className="w-12 h-12" // Removed rotate-180 here as the new image is already pointing down
              />
            </button>
          </div>
        )}

        <audio
          ref={thumbsUpSoundRef}
          src="https://res.cloudinary.com/dey9w5okl/video/upload/v1733985044/achievement-video-game-type-1-230515_gwz0kx.mp3"
          preload="auto"
        />
        <audio
          ref={thumbsDownSoundRef}
          src="https://res.cloudinary.com/dey9w5okl/video/upload/v1733985045/080047_lose_funny_retro_video-game-80925_k1a1rv.mp3"
          preload="auto"
        />
      </div>
    </div>
  );
}