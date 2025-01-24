'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Clock, BookOpen, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TimelineEvent {
    year: number;
    title: string;
    description: string;
}

interface ScenarioTimeline {
    pattern: RegExp;
    timeline: TimelineEvent[];
}

export default function WhatIf() {
    const [scenario, setScenario] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [alternateTimeline, setAlternateTimeline] = useState<TimelineEvent[]>(
        []
    );

    // Define scenarios with regex patterns
    const scenarioTimelines: ScenarioTimeline[] = [
        {
            pattern: /industrial\s*revolution.*200\s*years\s*earlier/i,
            timeline: [
                {
                    year: 1570,
                    title: 'Early Steam Revolution',
                    description:
                        'The principles of steam power are discovered centuries earlier, leading to rapid industrialization in Renaissance Europe.',
                },
                {
                    year: 1600,
                    title: 'Global Trade Revolution',
                    description:
                        'Steam-powered ships transform maritime trade, creating new global economic networks.',
                },
                {
                    year: 1650,
                    title: 'Urban Transformation',
                    description:
                        'Cities rapidly expand with mechanized manufacturing, changing social structures centuries before our timeline.',
                },
            ],
        },
        {
            pattern: /india('s)?.*golden\s*age.*faster/i,
            timeline: [
                {
                    year: 900,
                    title: 'Early Industrial Renaissance',
                    description:
                        'Advanced metallurgy and mechanical innovations from Indian scholars lead to early industrialization in the Gupta and Chola Empires.',
                },
                {
                    year: 1100,
                    title: 'Global Naval Power',
                    description:
                        'A powerful Indian maritime force dominates Indian Ocean trade routes, rivaling European exploration centuries ahead of time.',
                },
                {
                    year: 1300,
                    title: 'Early Democratic Reforms',
                    description:
                        'Inspired by ancient republics like Vaishali, regional governance evolves into early democratic structures, influencing global politics.',
                },
                {
                    year: 1500,
                    title: 'Steam-Powered Empires',
                    description:
                        'India pioneers steam power before Europe, fueling rapid industrial growth and making Indian kingdoms dominant economic superpowers.',
                },
                {
                    year: 1750,
                    title: 'Digital Revolution of the 18th Century',
                    description:
                        'Mathematical advancements from Indian scholars lead to early computing principles, setting the foundation for an information age centuries ahead of time.',
                },
            ],
        },
    ];

    // Simulated AI response - In production, this would connect to your AI service
    const generateAlternateHistory = async () => {
        setIsGenerating(true);
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Find matching scenario using regex
        const matchedScenario = scenarioTimelines.find((s) =>
            s.pattern.test(scenario)
        );

        // Set timeline if a match is found
        if (matchedScenario) {
            setAlternateTimeline(matchedScenario.timeline);
        } else {
            // Optional: Handle no match scenario
            setAlternateTimeline([]);
        }

        setIsGenerating(false);
    };

    // Rest of the component remains the same as in the original code
    return (
        <div className="w-full max-w-8xl mx-auto p-6">
            <div className="relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8  w-[60vw] shadow-xl"
                >
                    <div className="flex items-center gap-2 mb-6 w-full">
                        <Sparkles className="w-6 h-6 text-yellow-400" />
                        <h2 className="text-2xl font-bold text-white">
                            Historical What If?
                        </h2>
                    </div>

                    <div className="space-y-6">
                        <div className="relative">
                            <textarea
                                value={scenario}
                                onFocus={(e) =>
                                    (e.target.value =
                                        'What if the Industrial Revolution had started 200 years earlier')
                                }
                                onChange={(e) => setScenario(e.target.value)}
                                placeholder="What if the Industrial Revolution had started 200 years earlier?"
                                className="w-full h-32 bg-slate-700/50 text-white placeholder-slate-400 rounded-xl p-4 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                            />
                            <button
                                onClick={generateAlternateHistory}
                                // disabled={isGenerating || !scenario}
                                className={cn(
                                    'absolute bottom-4 right-4 bg-yellow-400 text-slate-900 rounded-lg px-4 py-2 flex items-center gap-2 font-medium transition-all',
                                    'hover:bg-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed'
                                )}
                            >
                                <Send className="w-4 h-4" />
                                Generate
                            </button>
                        </div>

                        {isGenerating && (
                            <div className="flex items-center justify-center py-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400" />
                            </div>
                        )}

                        {alternateTimeline.length > 0 && !isGenerating && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="space-y-6"
                            >
                                <div className="flex items-center gap-2 text-white">
                                    <BookOpen className="w-5 h-5" />
                                    <h3 className="text-xl font-semibold">
                                        Alternative Timeline
                                    </h3>
                                </div>

                                <div className="relative">
                                    <div className="absolute top-0 bottom-0 left-6 w-0.5 bg-yellow-400/20" />

                                    {alternateTimeline.map((event, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.2 }}
                                            className="relative pl-14 pb-8 last:pb-0"
                                        >
                                            <div className="absolute left-6 w-4 h-4 rounded-full bg-yellow-400 transform -translate-x-2 mt-1.5" />
                                            <div className="flex items-center gap-2 mb-2">
                                                <Clock className="w-4 h-4 text-yellow-400" />
                                                <span className="text-yellow-400 font-semibold">
                                                    {event.year}
                                                </span>
                                            </div>
                                            <h4 className="text-white font-semibold mb-2">
                                                {event.title}
                                            </h4>
                                            <p className="text-slate-300">
                                                {event.description}
                                            </p>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
