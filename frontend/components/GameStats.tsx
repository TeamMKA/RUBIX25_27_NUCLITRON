import React from 'react';
import { Trophy, X, Clock } from 'lucide-react';

interface GameStatsProps {
  score: number;
  correctPlacements: number;
  incorrectPlacements: number;
  timeElapsed: number;
}

export const GameStats: React.FC<GameStatsProps> = ({
  score,
  correctPlacements,
  incorrectPlacements,
  timeElapsed,
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-black-100 border rounded-lg shadow-lg p-4 flex justify-between items-center">
      <div className="flex items-center">
        <Trophy className="w-6 h-6 text-yellow-500 mr-2" />
        <span className="font-boldtext-xl">{score}</span>
      </div>
      <div className="flex space-x-6">
        <div className="flex items-center">
          <div className="w-3 h-3   bg-green-500 rounded-full mr-2" />
          <span>{correctPlacements}</span>
        </div>
        <div className="flex items-center">
          <X className="w-5 h-5 text-red-500 mr-2" />
          <span>{incorrectPlacements}</span>
        </div>
      </div>
      <div className="flex items-center">
        <Clock className="w-5 h-5 mr-2" />
        <span>{formatTime(timeElapsed)}</span>
      </div>
    </div>
  );
};