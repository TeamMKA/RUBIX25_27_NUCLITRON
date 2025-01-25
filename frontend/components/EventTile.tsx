/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Clock, Calendar } from 'lucide-react';
export interface HistoricalEvent {
    id: number;
    title: string;
    description: string;
    year: number;
    imageUrl: string;
}
interface EventTileProps {
    event: HistoricalEvent;
    isDragging: boolean;
}

export const EventTile: React.FC<EventTileProps> = ({ event, isDragging }) => {
    return (
        <div
            className={`relative bg-white-100 rounded-lg shadow-lg p-4 cursor-grab active:cursor-grabbing transition-transform ${
                isDragging ? 'scale-105 shadow-xl' : ''
            }`}
        >
            <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="object-cover w-full h-full"
                    onError={(e) => {
                        e.currentTarget.src =
                            'https://images.unsplash.com/photo-1524668951403-d44b28200ce0?auto=format&fit=crop&q=80';
                    }}
                />
            </div>
            <h3 className="text-xl font-bold mb-2">{event.title}</h3>
            <p className="text-gray-600 mb-4">{event.description}</p>
            <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                </div>
                <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>Drag to place</span>
                </div>
            </div>
        </div>
    );
};
