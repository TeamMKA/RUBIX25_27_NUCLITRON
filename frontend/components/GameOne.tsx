'use client';
import React, { useState, useEffect } from 'react';
import { EventTile } from './EventTile';
import { Line } from './Line';
import { GameStats } from './GameStats';
import eventData from '../data/events.json';
interface HistoricalEvent {
    id: number;
    title: string;
    description: string;
    year: number;
    imageUrl: string;
}

interface GameState {
    score: number;
    correctPlacements: number;
    incorrectPlacements: number;
    timeElapsed: number;
    placedEvents: HistoricalEvent[];
    remainingEvents: HistoricalEvent[];
    currentEvent: HistoricalEvent | null;
}

function GameOne() {
    const [gameState, setGameState] = useState<GameState>({
        score: 0,
        correctPlacements: 0,
        incorrectPlacements: 0,
        timeElapsed: 0,
        placedEvents: [],
        remainingEvents: [],
        currentEvent: null,
    });

    useEffect(() => {
        // Initialize game
        const shuffledEvents = [...eventData.events].sort(
            () => Math.random() - 0.5
        );
        setGameState((prev) => ({
            ...prev,
            remainingEvents: shuffledEvents.slice(1),
            currentEvent: shuffledEvents[0],
        }));

        // Start timer
        const timer = setInterval(() => {
            setGameState((prev) => ({
                ...prev,
                timeElapsed: prev.timeElapsed + 1,
            }));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleDragStart = (e: React.DragEvent, event: HistoricalEvent) => {
        e.dataTransfer.setData('text/plain', event.id.toString());
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        const eventId = parseInt(e.dataTransfer.getData('text/plain'));

        if (!gameState.currentEvent || eventId !== gameState.currentEvent.id)
            return;

        const isCorrectPlacement = checkPlacement(
            gameState.currentEvent,
            index
        );

        if (isCorrectPlacement) {
            // Play success sound
            setGameState((prev) => ({
                ...prev,
                score: prev.score + 100,
                correctPlacements: prev.correctPlacements + 1,
                placedEvents: [...prev.placedEvents, prev.currentEvent!].sort(
                    (a, b) => a.year - b.year
                ),
                currentEvent: prev.remainingEvents[0] || null,
                remainingEvents: prev.remainingEvents.slice(1),
            }));
        } else {
            // Play error sound
            setGameState((prev) => {
                const shuffledRemaining = [
                    ...prev.remainingEvents,
                    prev.currentEvent!,
                ].sort(() => Math.random() - 0.5);

                return {
                    ...prev,
                    incorrectPlacements: prev.incorrectPlacements + 1,
                    currentEvent: shuffledRemaining[0],
                    remainingEvents: shuffledRemaining.slice(1),
                };
            });
        }
    };

    const checkPlacement = (event: HistoricalEvent, index: number): boolean => {
        const sortedEvents = [...gameState.placedEvents, event].sort(
            (a, b) => a.year - b.year
        );
        return sortedEvents.indexOf(event) === index;
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-6xl mx-auto p-8">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-red-600 mb-2">
                        TIMELINES
                    </h1>
                    <p className="text-gray-600">
                        Arrange the events in chronological order
                    </p>
                </div>

                <GameStats
                    score={gameState.score}
                    correctPlacements={gameState.correctPlacements}
                    incorrectPlacements={gameState.incorrectPlacements}
                    timeElapsed={gameState.timeElapsed}
                />

                <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
                    <Line
                        events={gameState.placedEvents}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                    />
                </div>

                {gameState.currentEvent && (
                    <div
                        draggable
                        onDragStart={(e) =>
                            handleDragStart(e, gameState.currentEvent!)
                        }
                        className="mt-8 max-w-sm mx-auto cursor-grab active:cursor-grabbing"
                    >
                        <EventTile
                            event={gameState.currentEvent}
                            isDragging={false}
                        />
                    </div>
                )}

                {!gameState.currentEvent &&
                    gameState.remainingEvents.length === 0 && (
                        <div className="text-center bg-green-100 p-8 rounded-lg mt-8">
                            <h2 className="text-2xl font-bold text-green-800 mb-4">
                                Congratulations! 🎉
                            </h2>
                            <p className="text-green-700">
                                You've completed the timeline with{' '}
                                {gameState.correctPlacements} correct
                                placements!
                            </p>
                            <button
                                onClick={() => window.location.reload()}
                                className="mt-4 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
                            >
                                Play Again
                            </button>
                        </div>
                    )}
            </div>
        </div>
    );
}

export default GameOne;
