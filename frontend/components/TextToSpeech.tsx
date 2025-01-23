/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React, { useState, useEffect, useCallback } from 'react';
import { Volume2 } from 'lucide-react';

interface TextToSpeechProps {
  text: string;
  startItself?: boolean;
  className?: string;
}

const TextToSpeech: React.FC<TextToSpeechProps> = ({ text, startItself, className }) => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>("");

  const speakText = useCallback((availableVoices?: SpeechSynthesisVoice[]) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      // Ensure voices are loaded
      const voicesToUse = availableVoices || window.speechSynthesis.getVoices();
      
      if (voicesToUse.length === 0) {
        console.warn("No voices available");
        return;
      }

      window.speechSynthesis.cancel();
      const speech = new SpeechSynthesisUtterance(text);
     
      const voice = voicesToUse.find((v) => v.name === selectedVoice) || voicesToUse[0];
      if (voice) {
        speech.voice = voice;
      }
      
      // Add error handling
      speech.onerror = (event) => {
        console.error("Speech synthesis error:", event);
      };

      window.speechSynthesis.speak(speech);
    }
  }, [text, selectedVoice]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      
      if (availableVoices.length > 0) {
        setVoices(availableVoices);
        
        const defaultVoice =
          availableVoices.find((voice) =>
            voice.name.includes("David") ||
            voice.name.includes("Microsoft") ||
            voice.lang.startsWith("en-")
          ) || availableVoices[0];

        setSelectedVoice(defaultVoice.name);
        
        // Speak text after a short delay
        if (startItself) {
        timeout = setTimeout(() => speakText(availableVoices), 500);
        }
      }
    };

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      // Immediate check
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        loadVoices();
      } else {
        // Fallback to event
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    }

    // Cleanup timeout
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [text, speakText]);
 
  return (
    <button
      onClick={() => speakText()}
      className={`${className}  items-center p-2 bg-blue-500 text-white rounded hover:bg-blue-600`}
    >
      <Volume2 className="mr-2" /> Speak
    </button>
  );
};

export default TextToSpeech;