import React from 'react';
import { Timeline } from '@/components/ui/timeline';
import { Card, CardContent } from '@/components/ui/card';
import { TextureBackground } from '@/components/texture-background';

// Import the data from the data.js file
import { timelineData } from '@/assets/data'; // Adjust the path according to your folder structure
// import ChatBot from '@/components/ChatBot';

export default function TimelineDemo() {
    return (
        <TextureBackground>
            <div className="w-full bg-opacity-90 text-yellow-300">
                <Card className="w-full max-w-9xl mt-5 mx-auto bg-black-100">
                    <CardContent className="p-6">
                        <Timeline data={timelineData} />
                    </CardContent>
                </Card>
            </div>
        </TextureBackground>
    );
}
