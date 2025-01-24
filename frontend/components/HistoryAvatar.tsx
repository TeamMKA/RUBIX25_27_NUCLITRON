'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Upload,
    Camera,
    History,
    Crown,
    Shield,
    Sword,
    Download,
    Image as ImageIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface HistoricalStyle {
    id: string;
    name: string;
    era: string;
    icon: React.ReactNode;
    description: string;
    styleImage: string; // Added styleImage property
}

const historicalStyles: HistoricalStyle[] = [
    {
        id: 'egyptian',
        name: 'Egyptian Pharaoh',
        era: 'Ancient Egypt, 3100 BCE - 30 BCE',
        icon: <Crown className="w-6 h-6" />,
        description:
            'Transform into an ancient Egyptian ruler with traditional headdress and royal garments.',
        styleImage:
            'https://img.freepik.com/premium-photo/timeless-royalty-egyptian-pharaoh-portrait-depicting-commanding-presence-pharaoh-detailed-artistry-reflecting-their-power-wisdom-rich-history-egyptian-civilization-leadership_771426-75658.jpg', // Add actual image URL
    },
    {
        id: 'knight',
        name: 'Medieval Knight',
        era: 'Middle Ages, 5th - 15th century',
        icon: <Shield className="w-6 h-6" />,
        description: 'Don the armor and regalia of a noble medieval knight.',
        styleImage:
            'https://d7hftxdivxxvm.cloudfront.net/?height=800&quality=50&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2F88AxpWiDoooO4oSVibaFaA%2Fmain.jpg&width=800', // Add actual image URL
    },
    {
        id: 'viking',
        name: 'Norse Viking',
        era: 'Viking Age, 793 - 1066 CE',
        icon: <Sword className="w-6 h-6" />,
        description:
            'Become a fierce Norse warrior with traditional Viking attire.',
        styleImage:
            'https://cdn.pixabay.com/photo/2023/01/14/17/59/ai-generated-7718746_1280.jpg', // Add actual image URL
    },
];

export default function HistoryAvatar() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
    const [styleImage, setStyleImage] = useState<string | null>(null);
    const [generatedAvatar, setGeneratedAvatar] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const styleInputRef = useRef<HTMLInputElement>(null);

    const uploadImageToServer = async (selectedImage: string) => {
        try {
            const response = await fetch('/api/upload-image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    image: selectedImage,
                    filename: 'uploaded-image.jpg',
                }),
            });

            if (!response.ok) {
                throw new Error('Image upload failed');
            }

            const { url } = await response.json();
            return url;
        } catch (error) {
            console.error('Upload error:', error);
            throw error;
        }
    };

    const handleImageUpload = async (
        e: React.ChangeEvent<HTMLInputElement>,
        setImage: React.Dispatch<React.SetStateAction<string | null>>
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
                if (setImage === setSelectedImage) {
                    setGeneratedAvatar(null);
                    setError(null);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const generateAvatar = async () => {
        if (!selectedImage || !selectedStyle) return;

        setIsGenerating(true);
        setError(null);

        try {
            // Upload main image
            const imageUrl = await uploadImageToServer(selectedImage);

            // Use selected style image or default
            const styleImageUrl = styleImage
                ? await uploadImageToServer(styleImage)
                : historicalStyles.find((style) => style.id === selectedStyle)
                      ?.styleImage || '';

            // Send API request
            const apiResponse = await fetch('/api/generate-avatar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    imageUrl: imageUrl,
                    styleImageUrl: styleImageUrl,
                    textPrompt:
                        historicalStyles.find(
                            (style) => style.id === selectedStyle
                        )?.name || 'Avatar',
                }),
            });

            if (!apiResponse.ok) {
                const errorData = await apiResponse.json();
                throw new Error(errorData.error || 'Avatar generation failed');
            }

            const data = await apiResponse.json();

            // Start polling for status
            await pollOrderStatus(data.body.orderId);
        } catch (error) {
            console.error('Error:', error);
            setError(
                error instanceof Error
                    ? error.message
                    : 'An unknown error occurred'
            );
            setIsGenerating(false);
        }
    };
    const LoadingAnimation = () => (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-black/50"
        >
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 360],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
                className="w-24 h-24 rounded-full border-4 border-t-purple-400 border-r-purple-400 border-b-transparent border-l-transparent"
            />
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-white text-lg"
            >
                Generating your historical avatar...
            </motion.p>
        </motion.div>
    );

    const pollOrderStatus = useCallback(
        async (orderId: string, retriesLeft: number = 5) => {
            if (retriesLeft <= 0) {
                setError('Max retries reached. Unable to generate avatar.');
                setIsGenerating(false);
                return;
            }

            try {
                const statusResponse = await fetch('/api/check-avatar-status', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ orderId }),
                });

                if (!statusResponse.ok) {
                    throw new Error('Failed to check avatar status');
                }

                const statusData = await statusResponse.json();

                switch (statusData.body.status) {
                    case 'init':
                        await new Promise((resolve) =>
                            setTimeout(resolve, 3000)
                        );
                        await pollOrderStatus(orderId, retriesLeft - 1);
                        break;
                    case 'active':
                        setGeneratedAvatar(statusData.body.output);
                        setIsGenerating(false);
                        break;
                    case 'failed':
                        setError('Avatar generation failed');
                        setIsGenerating(false);
                        break;
                    default:
                        throw new Error('Unexpected status');
                }
            } catch (error) {
                console.error('Status polling error:', error);
                setError('Error checking avatar status');
                setIsGenerating(false);
            }
        },
        []
    );

    const handleDownload = () => {
        if (!generatedAvatar) return;

        const link = document.createElement('a');
        link.href = generatedAvatar;
        link.download = 'historical-avatar.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
                        {/* Main Image Upload */}
                        <div className="relative aspect-square rounded-xl overflow-hidden bg-black/20 border-2 border-dashed border-purple-500/50 hover:border-purple-400 transition-colors">
                            {selectedImage ? (
                                <img
                                    src={selectedImage}
                                    alt="Uploaded"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <button
                                    onClick={() =>
                                        fileInputRef.current?.click()
                                    }
                                    className="absolute inset-0 flex flex-col items-center justify-center text-purple-300 hover:text-purple-200"
                                >
                                    <Upload className="w-12 h-12 mb-2" />
                                    <span className="text-sm">
                                        Upload your photo
                                    </span>
                                </button>
                            )}
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    handleImageUpload(e, setSelectedImage)
                                }
                                className="hidden"
                            />
                            {selectedImage && (
                                <button
                                    onClick={() =>
                                        fileInputRef.current?.click()
                                    }
                                    className="absolute bottom-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                                >
                                    <Camera className="w-5 h-5" />
                                </button>
                            )}
                        </div>

                        {/* Style Image Upload */}
                        <div className="relative aspect-square rounded-xl overflow-hidden bg-black/20 border-2 border-dashed border-purple-500/50 hover:border-purple-400 transition-colors">
                            {styleImage ? (
                                <img
                                    src={styleImage}
                                    alt="Style"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <button
                                    onClick={() =>
                                        styleInputRef.current?.click()
                                    }
                                    className="absolute inset-0 flex flex-col items-center justify-center text-purple-300 hover:text-purple-200"
                                >
                                    <ImageIcon className="w-12 h-12 mb-2" />
                                    <span className="text-sm">
                                        Upload style image (optional)
                                    </span>
                                </button>
                            )}
                            <input
                                ref={styleInputRef}
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    handleImageUpload(e, setStyleImage)
                                }
                                className="hidden"
                            />
                            {styleImage && (
                                <button
                                    onClick={() => setStyleImage(null)}
                                    className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                                >
                                    <Camera className="w-5 h-5" />
                                </button>
                            )}
                        </div>

                        {/* Historical Styles Selection */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-white">
                                Choose Your Era
                            </h3>
                            <div className="grid gap-3">
                                {historicalStyles.map((style) => (
                                    <button
                                        key={style.id}
                                        onClick={() => {
                                            setSelectedStyle(style.id);
                                            setStyleImage(style.styleImage); // Set the selected style image
                                        }}
                                        className={cn(
                                            'flex items-center gap-3 p-4 rounded-lg transition-all',
                                            'hover:bg-white/10',
                                            selectedStyle === style.id
                                                ? 'bg-white/20 ring-2 ring-purple-400'
                                                : 'bg-black/20'
                                        )}
                                    >
                                        <div className="text-purple-400">
                                            {style.icon}
                                        </div>
                                        <div className="text-left">
                                            <h4 className="font-medium text-white">
                                                {style.name}
                                            </h4>
                                            <p className="text-sm text-purple-200">
                                                {style.era}
                                            </p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Generated Avatar Display */}
                    <div className="space-y-6">
                        <div className="relative aspect-square rounded-xl overflow-hidden bg-black/20">
                            <AnimatePresence>
                                {isGenerating ? (
                                    <LoadingAnimation />
                                ) : generatedAvatar ? (
                                    <>
                                        <img
                                            src={generatedAvatar}
                                            alt="Generated Avatar"
                                            className="w-full h-full object-cover"
                                        />
                                        <button
                                            onClick={handleDownload}
                                            className="absolute bottom-4 right-4 bg-purple-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-purple-600"
                                        >
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
                            </AnimatePresence>
                        </div>

                        {error && (
                            <div className="bg-red-500/20 text-red-300 p-4 rounded-lg">
                                {error}
                            </div>
                        )}

                        <button
                            onClick={generateAvatar}
                            disabled={!selectedImage || !selectedStyle}
                            className="w-full bg-purple-500 text-white py-3 rounded-lg font-medium hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Generate Historical Avatar
                        </button>

                        {selectedStyle && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="bg-black/20 p-4 rounded-lg"
                            >
                                <h4 className="font-medium text-white mb-2">
                                    {
                                        historicalStyles.find(
                                            (s) => s.id === selectedStyle
                                        )?.name
                                    }
                                </h4>
                                <p className="text-sm text-purple-200">
                                    {
                                        historicalStyles.find(
                                            (s) => s.id === selectedStyle
                                        )?.description
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
