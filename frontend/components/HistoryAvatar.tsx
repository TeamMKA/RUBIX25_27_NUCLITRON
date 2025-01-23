/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  Camera,
  History,
  Crown,
  Shield,
  Sword,
  Download,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface HistoricalStyle {
  id: string;
  name: string;
  era: string;
  icon: React.ReactNode;
  description: string;
}

const historicalStyles: HistoricalStyle[] = [
  {
    id: "egyptian",
    name: "Egyptian Pharaoh",
    era: "Ancient Egypt, 3100 BCE - 30 BCE",
    icon: <Crown className="w-6 h-6" />,
    description:
      "Transform into an ancient Egyptian ruler with traditional headdress and royal garments.",
  },
  {
    id: "knight",
    name: "Medieval Knight",
    era: "Middle Ages, 5th - 15th century",
    icon: <Shield className="w-6 h-6" />,
    description: "Don the armor and regalia of a noble medieval knight.",
  },
  {
    id: "viking",
    name: "Norse Viking",
    era: "Viking Age, 793 - 1066 CE",
    icon: <Sword className="w-6 h-6" />,
    description:
      "Become a fierce Norse warrior with traditional Viking attire.",
  },
];

export default function HistoryAvatar() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [generatedAvatar, setGeneratedAvatar] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setGeneratedAvatar(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateAvatar = async () => {
    if (!selectedImage || !selectedStyle) return;

    setIsGenerating(true);
    // Simulate API delay - Replace with actual AI image generation
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // For demonstration, we'll just use the original image
    // In production, this would be replaced with the AI-generated image
    setGeneratedAvatar(selectedImage);
    setIsGenerating(false);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-2xl p-8 shadow-xl"
      >
        <div className="flex items-center gap-2 mb-6">
          <History className="w-6 h-6 text-purple-400" />
          <h2 className="text-2xl font-bold text-white">
            Historical Avatar Creator
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-black/20 border-2 border-dashed border-purple-500/50 hover:border-purple-400 transition-colors">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt="Uploaded"
                  className="w-full h-full object-cover"
                />
              ) : (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 flex flex-col items-center justify-center text-purple-300 hover:text-purple-200"
                >
                  <Upload className="w-12 h-12 mb-2" />
                  <span className="text-sm">Upload your photo</span>
                </button>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              {selectedImage && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                >
                  <Camera className="w-5 h-5" />
                </button>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">
                Choose Your Era
              </h3>
              <div className="grid gap-3">
                {historicalStyles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setSelectedStyle(style.id)}
                    className={cn(
                      "flex items-center gap-3 p-4 rounded-lg transition-all",
                      "hover:bg-white/10",
                      selectedStyle === style.id
                        ? "bg-white/20 ring-2 ring-purple-400"
                        : "bg-black/20"
                    )}
                  >
                    <div className="text-purple-400">{style.icon}</div>
                    <div className="text-left">
                      <h4 className="font-medium text-white">{style.name}</h4>
                      <p className="text-sm text-purple-200">{style.era}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-black/20">
              {isGenerating ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400" />
                </div>
              ) : generatedAvatar ? (
                <>
                  <img
                    src={generatedAvatar}
                    alt="Generated Avatar"
                    className="w-full h-full object-cover"
                  />
                  <button className="absolute bottom-4 right-4 bg-purple-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-purple-600">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-purple-300">
                  <p className="text-center">
                    Your historical avatar
                    <br />
                    will appear here
                  </p>
                </div>
              )}
            </div>

            {selectedStyle &&
              selectedImage &&
              !isGenerating &&
              !generatedAvatar && (
                <button
                  onClick={generateAvatar}
                  className="w-full bg-purple-500 text-white py-3 rounded-lg font-medium hover:bg-purple-600 transition-colors"
                >
                  Generate Historical Avatar
                </button>
              )}

            {selectedStyle && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-black/20 p-4 rounded-lg"
              >
                <h4 className="font-medium text-white mb-2">
                  {historicalStyles.find((s) => s.id === selectedStyle)?.name}
                </h4>
                <p className="text-sm text-purple-200">
                  {
                    historicalStyles.find((s) => s.id === selectedStyle)
                      ?.description
                  }
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
