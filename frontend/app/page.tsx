/* import Image from "next/image"; */
import HeroSection from "@/components/HeroSection";
import React from "react";

export default function Home() {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col mx-auto sm:px-10 px-5 overflow-clip">
      <HeroSection />
    </main>
  );
}
