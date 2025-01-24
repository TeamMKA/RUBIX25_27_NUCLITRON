"use client"

import type React from "react"
import historyData from "@/data/AmericaData.json"
import { motion } from "framer-motion"
import Image from "next/image"

const Page: React.FC = () => {
  return (
    <div className="flex w-full h-full mt-20 items-center justify-center bg-black-100">
      <div className="bg-gradient-to-b max-w-6xl from-gray-900 to-black text-yellow-500 min-h-screen p-8">
        {/* Centered Title */}
        <motion.h1
          className="text-5xl font-bold mb-12 text-center text-yellow-400"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          History of America
        </motion.h1>

        {Object.entries(historyData).map(([key, value], index) => (
          <motion.div
            key={key}
            className="mb-12 bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="p-6">
              {/* Centered Section Title */}
              <div className="flex flex-col items-center">
              <h2 className="text-3xl font-semibold mb-4 text-yellow-400">{value.overview.title}</h2>
              <h2 className="text-3xl font-semibold mb-4 text-yellow-400"> {value.time_period} </h2>
             </div>

              {/* Centered Image */}
              {value.overview.image_credit && (
                <div className="mb-6 flex justify-center">
                  <Image
                    src={value.overview.image_credit}
                    alt={value.overview.title}
                    width={600} // Reduced image width
                    height={300} // Reduced image height
                    className="rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}

              {/* Centered Description */}
              <p className="mb-6 text-yellow-200 text-center text-lg leading-relaxed">
                {value.overview.description}
              </p>

              {/* Subsections */}
              {value.subsections.map((subsection, index) => (
                <div key={index} className="mb-6 last:mb-0">
                  {/* Centered Subsection Title */}
                  <h3 className="text-2xl font-medium mb-3 text-yellow-300 text-center">
                    {subsection.title}
                  </h3>

                  {/* Centered Subsection Details */}
                  <p className="text-yellow-100 text-center text-base leading-relaxed">
                    {subsection.details}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Page