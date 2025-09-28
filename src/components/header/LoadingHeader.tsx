import React from 'react';
import Header from './Header';

function LoadingHeader() {
  const stopScenario = () => {
    console.log();
  };
  return <Header stopScenario={stopScenario} isPlaying={false} isLoading selectedScenario={null} />;
}

export default LoadingHeader;
