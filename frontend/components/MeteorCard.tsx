/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React from 'react';
import { Meteors } from './ui/meteors';
import Link from 'next/link';

const MeteorCard = ({title, description, handleChange} : {title: string, description: string, handleChange?: () => void  }) => {
  const handleClick = () => {
    window.open('https://discord.gg/bhFw7CPA', '_blank');
  }

  return (
    <div className="w-full h-[300px] relative">
      <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-2xl blur-3xl" />
      <div className="relative h-full shadow-xl bg-black-100 border border-gray-800 px-6 py-8 overflow-hidden rounded-2xl flex flex-col justify-between">
        <div>
          <div className="h-5 w-5 rounded-full border flex items-center justify-center mb-4 border-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-2 w-2 text-gray-300"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25" />
            </svg>
          </div>

          <h2 className="font-bold text-xl text-yellow-400 mb-4 relative z-50">{title}</h2>

          <p className="font-normal text-sm text-slate-200 mb-4 relative z-50">{description}</p>
        </div>

        
        <button className="border px-4 py-1 rounded-lg border-gray-500 text-gray-300 text-sm mt-4 hover:bg-gray-800 transition-colors" onClick={handleClick}>
          Community
        </button>
        

        <Meteors number={20} />
      </div>
    </div>
  )
}

export default MeteorCard