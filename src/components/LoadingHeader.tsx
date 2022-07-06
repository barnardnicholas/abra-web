import React from 'react';
import Header from './Header';

const LoadingHeader = () => {
    return <Header stopScenario={() => {}} isPlaying={false} isLoading />;
};

export default LoadingHeader;
