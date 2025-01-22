import Image from "next/image";
import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { Card, CardContent } from "@/components/ui/card";
import { TextureBackground } from "@/components/texture-background";

// Import the data from the data.js file
import { timelineData } from "@/app/assets/data";  // Adjust the path according to your folder structure

export default function TimelineDemo() {
  return (
    <TextureBackground>
      <div className="w-full bg-black bg-opacity-90 text-yellow-300">
        <Card className="w-full max-w-4xl mx-auto my-8 bg-black border-yellow-300">
          <CardContent className="p-6">
            <h2 className="text-2xl md:text-4xl mb-4 text-yellow-300 font-serif">
              Historical Timeline
            </h2>
            <Timeline data={timelineData} />
          </CardContent>
        </Card>
      </div>
    </TextureBackground>
  );
}
