"use client";

import React, { useState } from "react";

const choiceTextMap = {
  fly: "to fly through the rift to explore its secrets",
  around: "to go around the rift to avoid potential danger",
  mine: "to mine the crystals quickly, ignoring the island's strange behavior",
  explore:
    "to explore the island further to understand the source of the tremors",
  sneak: "to sneak past the sentinels to reach the crystal vault",
  hack: "to hack the sentinel’s system with Quorra’s help",
  stealth: "to try to disable the station’s defenses using stealth",
  ally: "to search for an ally among the galactic factions to help disable the station",
  continue: "to continue with the mission, trusting the Core’s creators",
  seek: "to seek another solution, risking the universe’s collapse",
  stabilize: "to stabilize the universe, ensuring balance across all worlds",
  empower: "to empower Earth, making it the center of the galaxy’s future",
};

const images = {
  start:
    "https://res.cloudinary.com/dey9w5okl/image/upload/v1734356842/DALL_E_2024-12-16_19.17.04_-_A_9-10_years_old_girl_with_brown_hair_and_glasses_wearing_a_casual_sweater_and_jeans_is_looking_through_a_telescope_on_her_home_rooftop._The_scene_i_hifafx.webp",
  zephyra:
    "https://res.cloudinary.com/dey9w5okl/image/upload/v1734085547/rb_21760_muuwbh.png",
  arkanos:
    "https://res.cloudinary.com/dey9w5okl/image/upload/v1734085546/8631179_2590_hngkyt.jpg",
  mineCrystals:
    "https://res.cloudinary.com/dey9w5okl/image/upload/v1734085547/149961891_f6a8da6e-9699-40c0-9bf5-49fbeab31945_rg8zq6.jpg",
  exploreIsland:
    "https://res.cloudinary.com/dey9w5okl/image/upload/v1734357023/Girl_planet_ero6tm.webp",
  flyThroughRift:
    "https://res.cloudinary.com/dey9w5okl/image/upload/v1734150675/6541377_1595_i6lzgh.jpg",
  stealthDefenses:
    "https://res.cloudinary.com/dey9w5okl/image/upload/v1734085554/9588245_38448_fxum7u.jpg",
  continueMission:
    "https://res.cloudinary.com/dey9w5okl/image/upload/v1734085553/rb_207_qytj8w.png",
  stabilizeUniverse:
    "https://res.cloudinary.com/dey9w5okl/image/upload/v1734085546/rb_344_ptgbbx.png",
  hackSystem:
    "https://res.cloudinary.com/dey9w5okl/image/upload/v1734085546/rb_20356_su89za.png",
  goAroundRift:
    "https://res.cloudinary.com/dey9w5okl/image/upload/v1734150675/6541377_1595_i6lzgh.jpg",
  sneakPast:
    "https://res.cloudinary.com/dey9w5okl/image/upload/v1734151193/rb_925_r9qbyk.png",
  continueMission:
    "https://res.cloudinary.com/dey9w5okl/image/upload/v1734151194/3586143_926_mlmkji.jpg",
  seekSolution:
    "https://res.cloudinary.com/dey9w5okl/image/upload/v1734151194/3586143_926_mlmkji.jpg",
  seekAlly:
    "https://res.cloudinary.com/dey9w5okl/image/upload/v1734151586/5277585_2777323_n5fc9h.jpg",
  empowerEarth:
    "https://res.cloudinary.com/dey9w5okl/image/upload/v1734085546/29836791_2206_w026_n002_2112b_p1_2112_dgqjme.jpg",
};

const story = {
  start: {
    text: `Myra was an ordinary girl with an extraordinary curiosity. Living in the small town of Starlake, she often dreamed of adventures beyond the stars. One evening, as she gazed through her telescope, something unexpected happened—a blinding light shot from the night sky and struck her backyard!<br><br>`,
    choices: {
      Zephyra: "zephyra",
      Arkanos: "arkanos",
    },
  },
  zephyra: {
    text: `On Zephyra, Myra landed on a floating island, finding crystals embedded in the rocks. The island trembled as if alive.<br><br>`,
    choices: {
      mine: "mineCrystals",
      explore: "exploreIsland",
    },
  },
  mineCrystals: {
    text: `The island collapsed, and Myra barely escaped with one crystal.<br><br>On her way to the next destination, Myra encountered a cosmic rift—a swirling vortex of unstable energy.<br><br>`,
    choices: {
      fly: "flyThroughRift",
      around: "goAroundRift",
    },
  },
  exploreIsland: {
    text: `Myra discovered a hidden ecosystem relying on the crystals. Taking one crystal left the ecosystem intact and earned her the inhabitants' trust, who gifted her a second crystal.<br><br>On her way to the next destination, Myra encountered a cosmic rift—a swirling vortex of unstable energy.<br><br>`,
    choices: {
      fly: "flyThroughRift",
      around: "goAroundRift",
    },
  },
  arkanos: {
    text: `On Arkanos, Myra navigated the harsh desert to ancient ruins guarded by robotic sentinels.<br><br>`,
    choices: {
      sneak: "sneakPast",
      hack: "hackSystem",
    },
  },
  sneakPast: {
    text: `Myra retrieved a crystal but activated a trap, damaging her ship.<br><br>On her way to the next destination, Myra encountered a cosmic rift—a swirling vortex of unstable energy.<br><br>`,
    choices: {
      fly: "flyThroughRift",
      around: "goAroundRift",
    },
  },
  hackSystem: {
    text: `Quorra deactivated the sentinels, allowing Myra to collect two crystals safely.<br><br>On her way to the next destination, Myra encountered a cosmic rift—a swirling vortex of unstable energy.<br><br>`,
    choices: {
      fly: "flyThroughRift",
      around: "goAroundRift",
    },
  },
  flyThroughRift: {
    text: `Myra discovered a new dimension filled with vibrant energy, enhancing her ship's capabilities.<br><br>Quorra identified the last crystal’s location—Titania, a moon-sized station abandoned centuries ago. The station’s automated defenses were still active.<br><br>`,
    choices: {
      stealth: "stealthDefenses",
      ally: "seekAlly",
    },
  },
  goAroundRift: {
    text: `Myra avoided the rift safely but missed an opportunity for discovery.<br><br>Quorra identified the last crystal’s location—Titania, a moon-sized station abandoned centuries ago. The station’s automated defenses were still active.<br><br>`,
    choices: {
      stealth: "stealthDefenses",
      ally: "seekAlly",
    },
  },
  stealthDefenses: {
    text: `She narrowly escaped detection and retrieved the crystal but lost valuable supplies.<br><br>As Myra prepared to deliver the crystals to the Galactic Core, Quorra revealed a shocking truth:<br><br>"Myra, the Galactic Core was designed by an ancient species. Restoring it will save the universe but could also awaken their dangerous remnants."<br><br>`,
    choices: {
      continue: "continueMission",
      seek: "seekSolution",
    },
  },
  seekAlly: {
    text: `She convinced the Corvex Engineers, a rogue group, to help her. Together, they disabled the station and recovered the crystal safely.<br><br>As Myra prepared to deliver the crystals to the Galactic Core, Quorra revealed a shocking truth:<br><br>"Myra, the Galactic Core was designed by an ancient species. Restoring it will save the universe but could also awaken their dangerous remnants."<br><br>`,
    choices: {
      continue: "continueMission",
      seek: "seekSolution",
    },
  },
  continueMission: {
    text: `She successfully restored the Core but awakened the ancient species, who began reclaiming the galaxy.<br><br>The Galactic Core began glowing, ready to release its energy. Quorra gave one final warning:<br><br>"The Core’s energy can either stabilize the universe or empower Earth as a leading force in the galaxy. You must choose where its power is directed."<br><br>`,
    choices: {
      stabilize: "stabilizeUniverse",
      empower: "empowerEarth",
    },
  },
  seekSolution: {
    text: `She devised a way to stabilize the Core temporarily while searching for safer long-term fixes.<br><br>The Galactic Core began glowing, ready to release its energy. Quorra gave one final warning:<br><br>"The Core’s energy can either stabilize the universe or empower Earth as a leading force in the galaxy. You must choose where its power is directed."<br><br>`,
    choices: {
      stabilize: "stabilizeUniverse",
      empower: "empowerEarth",
    },
  },
  stabilizeUniverse: {
    text: `Myra’s selfless decision saved countless civilizations. She returned to Earth as a hero, with the galaxy forever in her debt.`,
    choices: {},
  },
  empowerEarth: {
    text: `Earth became a galactic superpower, but at the cost of instability across the universe. Myra faced the consequences of her choice as alliances formed and conflicts grew.`,
    choices: {},
  },
};

export default function Com() {
  const [currentSceneKey, setCurrentSceneKey] = useState("start");

  const scene = story[currentSceneKey];

  const handleChoice = (nextSceneKey) => {
    setCurrentSceneKey(nextSceneKey);
  };

  const handleRestart = () => {
    setCurrentSceneKey("start");
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#f8f4e3] font-sans">
      <div className="flex-2 p-5 bg-amber-50 shadow-md overflow-y-auto text-gray-800 text-shadow-sm">
        <p
          className="text-lg leading-relaxed mb-5"
          dangerouslySetInnerHTML={{ __html: scene.text }}
        ></p>
        <div>
          <img
            src={images[currentSceneKey] || "https://via.placeholder.com/200"}
            alt="Story Image"
            className="block mx-auto w-3/5 h-auto object-cover rounded-3xl border-4 border-green-600 shadow-md"
          />
        </div>
      </div>
      <div className="flex-1 p-5 bg-green-100 flex flex-col items-center gap-4">
        {Object.keys(scene.choices).length === 0 ? (
          <button
            onClick={handleRestart}
            className="bg-green-600 text-white border-none py-4 px-5 text-base cursor-pointer rounded-md transition-all duration-300 ease-in-out shadow-md hover:bg-green-700 hover:scale-105"
          >
            Restart
          </button>
        ) : (
          Object.entries(scene.choices).map(([choiceText, nextSceneKey]) => (
            <button
              key={choiceText}
              onClick={() => handleChoice(nextSceneKey)}
              className="bg-green-600 text-white border-none py-4 px-5 text-base cursor-pointer rounded-md transition-all duration-300 ease-in-out shadow-md hover:bg-green-700 hover:scale-105"
            >
              Choose {choiceTextMap[choiceText] || choiceText}
            </button>
          ))
        )}
      </div>
    </div>
  );
}