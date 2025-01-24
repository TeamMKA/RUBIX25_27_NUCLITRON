import React from 'react';
import HistoricalMap from '@/components/MapComponent';

const Home: React.FC = () => {
  return (
    <div className="container mx-auto mt-20 p-4">
      <HistoricalMap />
    </div>
  );
};

export default Home;