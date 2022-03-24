import React from 'react';
import { SoundChannel } from '../types/Scenario';
import { UseScenarioProps } from './hooks/useScenario';

const ChannelDebug: React.FC<ChannelProps> = ({ channel }) => {
    console.log(channel);
    const { id, name, slug, position, isPlaying, duration, type, path, frequency, tick } = channel;
    return (
        <>
            <div>
                <strong>{`Channel: ${name}`}</strong>
                <div>{`slug: ${slug}`}</div>
                <div>{`type: ${type}`}</div>
                <div>{`isPlaying: ${isPlaying}`}</div>
                <div>{`duration: ${duration}`}</div>
                <div>{`path: ${path}`}</div>
                <div>{`frequency: ${frequency}`}</div>
                <div>{`tick: ${tick}`}</div>
            </div>
        </>
    );
};

const Debug: React.FC<Props> = ({ scenario }) => {
    return (
        <div className="debug">
            <div>
                <div>{`isPlaying: ${scenario.isPlaying}`}</div>
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
