import Chatbot from '@/components/ChatBot';
import Display from '@/components/Display';
import HistoryAvatar from '@/components/HistoryAvatar';
import WhatIfComponent from '@/components/WhatIfComponent';
import React from 'react';
import historiansData from '@/data/historiansData.json';

const Explore = () => {
    return (
        <main className="relative bg-black-100 flex justify-center items-center flex-col mx-auto  overflow-clip">
            <Display />
            <Chatbot historians={historiansData} />

            <WhatIfComponent />
            <HistoryAvatar />
        </main>
    );
};

export default Explore;
