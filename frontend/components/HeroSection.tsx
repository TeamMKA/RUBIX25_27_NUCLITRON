import React from 'react'
import { HeroParallax } from "@/components/ui/hero-parallax";
import TextToSpeech from './TextToSpeech';

const products = [
    {
      title: "History Of Dicovery to India",
      link: "https://gomoonbeam.com",
      thumbnail:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Vascodagama.JPG/1200px-Vascodagama.JPG",
    },
    {
      title: "History Of Buddhism",
      link: "https://cursor.so",
      thumbnail:
        "https://i.pinimg.com/1200x/92/66/bc/9266bc511cf456868b1aa714d83f54d7.jpg",
    },
    {
      title: "History Of India",
      link: "https://userogue.com",
      thumbnail:
        "https://i.pinimg.com/1200x/bc/3a/c6/bc3ac6866ae32bf564c78ce8dd65840a.jpg",
    },
   
    {
      title: "History Of Delhi Sultanate",
      link: "https://editorially.org",
      thumbnail:
        "https://i.pinimg.com/1200x/80/db/61/80db617df42038475313ef06809506f1.jpg",
    },
    {
      title: "Editrix AI",
      link: "https://editrix.ai",
      thumbnail:
        "https://aceternity.com/images/products/thumbnails/new/editrix.png",
    },
    {
      title: "History Of Economic Liberalisation in India",
      link: "https://app.pixelperfect.quest",
      thumbnail:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/WAP-1_Locomotive_at_Delhi.jpg/1200px-WAP-1_Locomotive_at_Delhi.jpg",
    },
   
    {
      title: "History Of Partition of India",
      link: "https://algochurn.com",
      thumbnail:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/A_refugee_special_train_at_Ambala_Station_during_partition_of_India.jpg/1200px-A_refugee_special_train_at_Ambala_Station_during_partition_of_India.jpg",
    },
    {
      title: "History Of Maratha Confederacy",
      link: "https://ui.aceternity.com",
      thumbnail:
        "https://i.pinimg.com/1200x/37/98/c9/3798c9d93697a24d05b9ac5357b5b6c8.jpg",
    },
    {
      title: "History Of Repunlic of India",
      link: "https://tailwindmasterkit.com",
      thumbnail:
        "https://i.pinimg.com/1200x/d0/94/73/d094730c1841e48dda180aa40b56a246.jpg",
    },
    {
      title: "SmartBridge",
      link: "https://smartbridgetech.com",
      thumbnail:
        "https://aceternity.com/images/products/thumbnails/new/smartbridge.png",
    },
    {
      title: "Renderwork Studio",
      link: "https://renderwork.studio",
      thumbnail:
        "https://aceternity.com/images/products/thumbnails/new/renderwork.png",
    },
   
    {
      title: "Golden Age Of Inida",
      link: "https://cremedigital.com",
      thumbnail:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Ajanta_Padmapani.jpg/1200px-Ajanta_Padmapani.jpg",
    },
    {
      title: "Demise of Buddhism in India",
      link: "https://goldenbellsacademy.com",
      thumbnail:
        "https://i.pinimg.com/1200x/a6/06/02/a606026453b92c0372850b611c5db200.jpg",
    },
    {
      title: "Mughal Expansion in Inida",
      link: "https://invoker.lol",
      thumbnail:
        "https://i.pinimg.com/1200x/57/d1/37/57d13712b37feb7a875234b1a053dd93.jpg",
    },
    {
      title: "E Free Invoice",
      link: "https://efreeinvoice.com",
      thumbnail:
        "https://aceternity.com/images/products/thumbnails/new/efreeinvoice.png",
    },
  ];

const HeroSection = () => {
  return (
    <section className='h-full w-full lg:max-w-7xl max-w-4xl ' >
        <HeroParallax products={products} />
        <TextToSpeech text="Travel through time and explore history like never before! Dive into
        interactive timelines, 3D maps, and AI-powered historical figures.
        Experience the past through immersive storytelling, quizzes, and
        challenges!" startItself={true}  className="hidden"/>
    </section>
  )
}

export default HeroSection