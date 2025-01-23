/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';
import { PERIODS } from '@/assets/historicalData';

interface TimelineNavProps {
  selectedPeriod: string;
  onPeriodChange: (period: string) => void;
}

export function TimelineNav({ selectedPeriod, onPeriodChange }: TimelineNavProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-black/30 backdrop-blur-sm border-b border-yellow-900/20 z-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-8 overflow-x-auto py-4 scrollbar-hide">
          {PERIODS.map((period) => {
            const Icon = period.icon;
            return (
              <button
                key={period.id}
                onClick={() => onPeriodChange(period.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                  selectedPeriod === period.id
                    ? 'bg-yellow-900/40 text-yellow-400 border border-yellow-700/50'
                    : 'text-yellow-200/70 hover:text-yellow-400'
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="whitespace-nowrap">{period.title}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}