import React from "react";
import MeteorCard from "./MeteorCard";
import { GridGlobe } from "./ui/GridGlobe";
const goals = [
  {
    title: "Explore History Like Never Before",
    description:
      "Navigate through interactive timelines, maps, and 3D artifacts to experience history firsthand.",
    className: "col-span-2 row-span-1",
  },
  {
    title: "Bring the Past to Life",
    description:
      "Engage with AI-powered historical figures, immersive storytelling, and multimedia content.",
    className: "col-span-1 row-span-1",
  },
  {
    title: "Build a Global Community",
    description:
      "Connect with fellow history enthusiasts, share discoveries, and discuss the past together.",
    className: "col-span-1 row-span-1",
  },
  {
    title: "Learn Through Play",
    description:
      "Gamified quizzes, challenges, and thematic journeys make learning history fun and engaging.",
    className: "col-span-2 row-span-1",
  },
];

const MeteorGrid = () => {
  return (
    <div className=" !w-full mx-auto px-4 py-16 bg-white-100 rounded-t-full rounded-b-full" style={{ borderTopLeftRadius: '45% 35px', borderTopRightRadius: '45% 35px',borderBottomLeftRadius: '45% 35px', borderBottomRightRadius: '45% 35px' }} id="features">
      <h1 className="text-4xl font-bold text-center text-yellow-400 mb-12  ">
        Our Features
      </h1>
      <div className="grid grid-cols-3 gap-6 max-w-7xl mx-auto">
        {goals.map((goal, index) => (
          <div key={index} className={`${goal.className}`}>
            <MeteorCard title={goal.title} description={goal.description} />
          </div>
        ))}
      </div>

        <div className="w-full h-full flex  items-center mt-16">
            <GridGlobe />
        </div>

    </div>
  );
};

export default MeteorGrid;
