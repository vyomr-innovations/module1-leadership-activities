"use client";

import { useState } from "react";

const situations = [
  {
    image:
      "https://res.cloudinary.com/dey9w5okl/image/upload/v1733806998/cd1c0d5b-8263-43f6-878d-26b8b5aaf1ac_ogiavl.jpg",
    description:
      "Ron fills up his dinner plate with food. He fills up soon and cannot finish the food. He throws away the remaining food in the trash bin.",
  },
  {
    image:
      "https://res.cloudinary.com/dey9w5okl/image/upload/v1733806996/10e10be6-fbdf-4bd9-8a29-63a67dad5f2b_bcqe1p.jpg",
    description:
      "Carl picks the chocolate wrapper and throws it in the trash bin.",
  },
  {
    image:
      "https://res.cloudinary.com/dey9w5okl/image/upload/v1733806995/53ec964c-88eb-44b4-be87-3b2707869f2d_evwv5n.jpg",
    description:
      "Zoey uses markers to write on her board. She forgets to put the cap back on. The marker dries off and she can’t use it next time.",
  },
  {
    image:
      "https://res.cloudinary.com/dey9w5okl/image/upload/v1733807137/4213e2e0-9ba7-4db6-bb2d-1c966646d934_p0uvip.jpg",
    description: "Max forgets to close the tap while brushing his teeth.",
  },
  {
    image:
      "https://res.cloudinary.com/dey9w5okl/image/upload/v1733806995/cf792415-2370-4daf-81dd-674e690d9e72_kfpos1.jpg",
    description: "Frank breaks his friend’s toys and runs away home.",
  },
  {
    image:
      "https://res.cloudinary.com/dey9w5okl/image/upload/v1733806994/6b7e5654-095f-4fd7-bffd-37115800dd01_v5ii45.jpg",
    description:
      "Hank asks for a new crayon box every week as keeps losing them in school.",
  },
  {
    image:
      "https://res.cloudinary.com/dey9w5okl/image/upload/v1733806998/d7ddd45e-66c2-40cc-b47c-773c258e3571_kzenm3.jpg",
    description:
      "Susan carried her water bottle when she goes to the park. That way she does not have to use paper cups.",
  },
];

export default function ImageSlideshow() {
  const [index, setIndex] = useState(0);

  const nextImage = () => {
    setIndex((prev) => prev + 1);
  };

  const isFinished = index >= situations.length;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 w-full max-w-xl text-center">
        {!isFinished ? (
          <>
            <img
              src={situations[index].image}
              alt="situation"
              className="w-full max-h-[350px] object-cover rounded-xl mb-6"
            />
            <p className="text-gray-700 text-lg md:text-xl font-medium mb-6">
              {situations[index].description}
            </p>
            <button
              onClick={nextImage}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl text-lg shadow-md transition-all"
            >
              Next
            </button>
          </>
        ) : (
          <h2 className="text-2xl font-bold text-green-600">Activity Ended</h2>
        )}
      </div>
    </div>
  );
}