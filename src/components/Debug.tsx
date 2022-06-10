import React from 'react';
import { SoundChannel, soundTypes } from '../types/Scenario';
import { UseScenarioProps } from './hooks/useScenario';

const ChannelDebug: React.FC<ChannelProps> = ({ channel }) => {
    const { id, name, slug, position, isPlaying, duration, type, path, frequency } = channel;
    return (
        <>
            <div>
                <strong>{`Channel: ${name} (${soundTypes[type]})`}</strong>
                <div>{`slug: ${slug}`}</div>
                <div>{`isPlaying: ${isPlaying}`}</div>
                <div>{`duration: ${duration}`}</div>
                <div>{`path: ${path}`}</div>
                <div>{`frequency: ${frequency}`}</div>
                <br />
            </div>
        </>
    );
};

const Debug: React.FC<Props> = ({ scenario }) => {
    return (
        <div className="debug">
            <div>
                <div>{`Scenario isPlaying: ${scenario.isPlaying}`}</div>
                <br />
            </div>
            {Object.values(scenario.soundChannels).map((channel: SoundChannel, i: number) => (
                <ChannelDebug key={i} channel={channel} />
            ))}
        </div>
    );
};

interface Props {
    scenario: UseScenarioProps;
}

interface ChannelProps {
    channel: SoundChannel;
}

export default Debug;
