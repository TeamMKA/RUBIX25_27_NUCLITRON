/* eslint-disable @next/next/no-img-element */
import React from 'react';
/* import { HistoricalEvent } from '../types'; */
import { MoveHorizontal } from 'lucide-react';

interface HistoricalEvent {
    id: string;
    title: string;
    year: number;
    imageUrl:string;
}
interface TimelineProps {
    events: HistoricalEvent[];
    onDragOver: (e: React.DragEvent) => void;
    onDrop: (e: React.DragEvent, index: number) => void;
}

export const Line: React.FC<TimelineProps> = ({
    events,
    onDragOver,
    onDrop,
}) => {
    return (
        <div className="relative w-full">
            {/* Timeline container */}
            <div className="flex flex-nowrap overflow-x-auto p-4">
                {/* Initial drop zone */}
                <div
                    className="min-w-[150px] flex items-center justify-center"
                    onDragOver={onDragOver}
                    onDrop={(e) => onDrop(e, 0)}
                >
                    <div className="w-full h-[200px] border-2 border-dashed border-blue-300 rounded-lg flex items-center justify-center bg-blue-100 hover:bg-blue-100 transition-colors">
                        <div className="text-center">
                            <MoveHorizontal className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                            <p className="text-blue-600 font-medium text-sm">
                                Drop Here
                            </p>
                        </div>
                    </div>
                </div>

                {/* Events with drop zones between them */}
                {events.map((event, index) => (
                    <React.Fragment key={event.id}>
                        <div className="relative min-w-[300px] mx-4">
                            {/* Event card */}
                            <div className="bg-white-200 rounded-lg shadow-md overflow-hidden">
                                <div className="relative h-[150px]">
                                    <img
                                        src={event.imageUrl}
                                        alt={event.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                                        <h3 className="text-white font-bold text-lg">
                                            {event.title}
                                        </h3>
                                        <span className="text-white/90 text-sm">
                                            {event.year}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Drop zone after each event */}
                        <div
                            className="min-w-[150px] flex items-center justify-center"
                            onDragOver={onDragOver}
                            onDrop={(e) => onDrop(e, index + 1)}
                        >
                            <div className="w-full h-[200px] border-2 border-dashed border-blue-300 rounded-lg flex items-center justify-center bg-blue-50 hover:bg-blue-100 transition-colors">
                                <div className="text-center">
                                    <MoveHorizontal className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                                    <p className="text-blue-600 font-medium text-sm">
                                        Drop Here
                                    </p>
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};
