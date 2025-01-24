// components/HistoricalMap.tsx
import React from 'react';

const HistoricalMap: React.FC = () => {
  return (<>
  <nav className="bg-black absolute top-18 z-10 right-28 p-5 py-6 ">
          <div>
            <a href="#" className=" px-3 text-black">Home</a>
            <a href="#" className=" px-3 text-black">About</a>         
             </div>
    </nav>
    <iframe
      src="https://www.runningreality.org/#01/01/1700&19.07598,72.87766&zoom=6"
      className="w-full h-screen"
      style={{ border: 'none' }}
      title="Running Reality Historical Map"
      allowFullScreen
    />
    </>
  );
};

export default HistoricalMap;