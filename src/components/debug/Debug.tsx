import React from 'react';
import { SoundChannel, soundTypes } from '../../types/Scenario';
import { isEmpty } from '../../utils/utils';
import { UseScenarioProps } from '../hooks/useScenario';

const ChannelDebug: React.FC<ChannelProps> = ({ channel }) => {
  const { id, name, slug, position, isPlaying, duration, type, path, frequency, volume } = channel;
  return (
    <>
      <div>
        <strong>{`${soundTypes[type]} Channel: ${name} (${slug})`}</strong>
        <div>{`isPlaying: ${isPlaying}`}</div>
        <div>{`duration: ${duration}`}</div>
        <div>{`frequency: ${frequency}`}</div>
        <div>{`vol: ${volume}`}</div>
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
      {!isEmpty(scenario.soundChannels) &&
        Object.values(scenario.soundChannels).map((channel: SoundChannel, i: number) => (
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
