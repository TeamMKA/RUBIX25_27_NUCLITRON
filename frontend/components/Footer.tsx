"use client";
import React from "react";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";

const people = [
  {
    id: 1,
    name: "Kishan Wali",
    designation: "Data Scientist",
    image:"https://media.licdn.com/dms/image/v2/D4D03AQGYnVpnAQXHZw/profile-displayphoto-shrink_800_800/B4DZPabpnQHcAc-/0/1734536503560?e=1743033600&v=beta&t=OuF8JjnL--xY96HsIPfAMF1fmSm48nSpW2eNsxq4HHg"
  },
  {
    id: 2,
    name: "Mustafa Sarangpurwala",
    designation: "Full Stack Developer",
    image:"https://media.licdn.com/dms/image/v2/D4D03AQGC7bTb1g9BSw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1713358601680?e=1743033600&v=beta&t=sGsJg3Q8Z6DxkHcBVkLmHoSWuZnW8fc7VTP6M6uHAKU",
  },
  {
    id: 3,
    name: "Aarya Thakur",
    designation: "Ai Engineer",
    image:"https://media.licdn.com/dms/image/v2/D4D03AQHHxEwKlQVo2A/profile-displayphoto-shrink_800_800/B4DZR4LLf1HIAc-/0/1737182984795?e=1743033600&v=beta&t=KSyHnLoV5PR0E7fx5wCZLrcNb77Q3oQrphUVZu97DzE"
      ,
  },
  {
    id: 4,
    name: "Sohail Shaikh",
    designation: "ML Engineer",
    image:"https://media.licdn.com/dms/image/v2/D4D03AQGMQaxieru-qg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1730054968565?e=1743033600&v=beta&t=mUpi3k4N2iJ0vRaGBv3KqgaSVw324G8c90QqOwCVPUc"
    
  },
  
];

export default function Footer() {
  return (
    <div className="flex flex-row items-center justify-center mb-10 w-full">
      <AnimatedTooltip items={people} />
    </div>
  );
}
