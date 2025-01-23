import React from 'react';
import { ChevronRight } from 'lucide-react';
import { HistoricalPeriod } from '@/assets/historicalData';

interface PeriodContentProps {
  data: HistoricalPeriod;
}

export function PeriodContent({ data }: PeriodContentProps) {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-3">{data.overview.title}</h1>
        <p className="text-xl text-yellow-200/80">{data.time_period}</p>
        <p className="text-yellow-100/60 mt-2">{data.location}</p>
      </header>

      {/* Overview */}
      <section className="bg-black/30 backdrop-blur-sm rounded-xl p-6 mb-8 border border-yellow-900/20">
        <p className="text-yellow-100/90 leading-relaxed">{data.overview.description}</p>
      </section>

      {/* Subsections */}
      <div className="space-y-6">
        {data.subsections.map((section, index) => (
          <article
            key={index}
            className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-yellow-900/20 hover:bg-black/30 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-900/30 flex items-center justify-center">
                <ChevronRight className="w-5 h-5 text-yellow-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-2">{section.title}</h3>
                <p className="text-yellow-100/80 leading-relaxed">{section.details}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}