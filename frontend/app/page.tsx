/* import Image from "next/image"; */
import HeroSection from "@/components/HeroSection";
import MeteorGrid from "@/components/MeteorGrid";
import QuoteCard from "@/components/QuoteCard";
import Footer from "@/components/Footer";
import React from "react";

export default function Home() {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col mx-auto  overflow-clip">
      <HeroSection />
      <MeteorGrid />
      <QuoteCard />
      <Footer />
    </main>
  );
}
