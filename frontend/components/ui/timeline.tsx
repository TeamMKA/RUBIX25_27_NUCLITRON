/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { useScroll, useTransform, motion } from 'framer-motion';
import { Link } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { CardContainer, CardBody, CardItem } from './3d-card';
import Image from 'next/image';

interface TimelineEntry {
    title: string;
    description: string;
    image: {
        src: string;
        alt: string;
        width: number;
        height: number;
    };
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
    const ref = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);
    console.log(data);

    useEffect(() => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            setHeight(rect.height);
        }
    }, [ref]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start 10%', 'end 50%'],
    });
    const handleclick = () => {
        alert('You clicked me!');
    };
    // Transformations for height and opacity based on scroll progress
    const heightTransform = useTransform(
        scrollYProgress,
        [0, 1],
        [0, height / data.length]
    );
    const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

    return (
        <div
            className="relative w-full bg-gradient-to-b from-black via-gray-900 to-black text-yellow-300 font-serif"
            ref={containerRef}
            onClick={handleclick}
        >
            <div className="max-w-7xl  mx-auto py-16 px-4">
                <h2 className="text-3xl md:text-5xl mb-6  text-yellow-300 border-b  pb-4">
                    Chronicles of History
                </h2>
                <p className="text-yellow-200 text-sm md:text-lg max-w-2xl leading-relaxed">
                    Journey through time to witness the transformative moments
                    that shaped our world. This historical timeline blends
                    visual aesthetics with storytelling for an immersive
                    experience.
                </p>
            </div>

            <div ref={ref} className="relative max-w-4xl mx-auto pb-20">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="relative flex justify-start pt-16 md:pt-24 md:gap-10"
                    >
                        {/* Left sticky section with decorative elements */}
                        <div className="sticky flex flex-col md:flex-row z-40 items-center top-28 self-start max-w-xs lg:max-w-[40%] md:w-[30%]">
                            <div className="relative flex flex-col items-center">
                                <div className="h-12 w-12 rounded-full bg-yellow-400 flex items-center justify-center shadow-[0_0_20px_rgba(255,223,0,0.7)]">
                                    <div className="h-6 w-6 rounded-full bg-black-100 border-2 border-yellow-400 animate-pulse" />
                                </div>

                                {/* Decorative timeline line with scroll animation */}
                                {index !== data.length - 1 && (
                                    <motion.div
                                        style={{
                                            height: heightTransform,
                                            opacity: opacityTransform,
                                        }}
                                        className="absolute top-full w-[3px] bg-gradient-to-b from-yellow-300 to-transparent"
                                    />
                                )}
                            </div>

                            <h3 className="hidden md:block text-xl md:pl-20 md:text-4xl font-bold text-yellow-300 drop-shadow-md">
                                {item.title}
                            </h3>
                        </div>

                        {/* Content section with larger text and additional padding */}
                        <CardContainer className="inter-var ">
                            <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black-100 dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                                <CardItem
                                    translateZ="50"
                                    className="text-xl font-bold text-neutral-600 dark:text-white"
                                >
                                    {item.image.alt}
                                </CardItem>
                                <CardItem
                                    as="p"
                                    translateZ="60"
                                    className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                                >
                                    {item.description}
                                </CardItem>
                                <CardItem
                                    translateZ="100"
                                    className="w-full mt-4"
                                >
                                    <Image
                                        src={item.image.src}
                                        height={item.image.height}
                                        width={item.image.width}
                                        className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                                        alt="thumbnail"
                                    />
                                </CardItem>
                            </CardBody>
                        </CardContainer>
                    </div>
                ))}
            </div>

            {/* Background accents for scenic effect */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-10 left-1/3 w-32 h-32 bg-yellow-400 opacity-20 blur-3xl rounded-full animate-float" />
                <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-yellow-500 opacity-10 blur-2xl rounded-full animate-float delay-200" />
                <div className="absolute bottom-20 left-10 w-20 h-20 bg-yellow-300 opacity-30 blur-xl rounded-full animate-float delay-400" />
            </div>
        </div>
    );
};
