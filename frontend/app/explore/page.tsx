"use client"
import Display from "@/components/Display";
import WhatIf from "@/components/WhatIf";
import React,{useRef} from "react";
import { motion,useInView } from "framer-motion";

const Explore = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col mx-auto  overflow-clip">
        <Display />
        <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-white mb-12">
            What If History Took a Different Path?
        </h1>
        <motion.div
        ref={ref}
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -100 }}
        transition={{ duration: 3 }}
        >
        <p className="text-xl text-center text-white mb-12 max-w-4xl">
        History is filled with pivotal moments that shaped the world as we know it— <span className="text-yellow-400" > but what if things had unfolded differently?</span> Imagine an India where the Industrial Revolution began centuries earlier, or a world where ancient empires pioneered steam power and global trade before Europe.
        </p>
        <p className="text-xl text-center text-yellow-400 mb-12 max-w-4xl" >
        Step into an alternative timeline, where the course of history is rewritten. Explore groundbreaking inventions, powerful civilizations, and a future that could have been. Are you ready to challenge history and uncover a new past?
        </p>
        </motion.div>
        <WhatIf />
      </div>
    </main>
  );
};

export default Explore;
