import React from 'react';
import { SoundChannel, soundTypes } from '../../types/Scenario';
import { isEmpty } from '../../utils/utils';
import { UseScenarioProps } from '../hooks/useScenario';

const ChannelDebug: React.FC<ChannelProps> = ({ channel, index }) => {
  const { id, name, slug, position, isPlaying, durations, type, paths, frequency, volume } =
    channel;
  const duration = Array.isArray(durations) && !Number.isNaN(index) ? durations.toString() : '-';
  const _isPlaying = Object.values(isPlaying).toString();
  return (
    <>
      <div>
        <strong>{`${soundTypes[type]} Channel: ${name} (${slug})`}</strong>
        <div>{`isPlaying: ${_isPlaying}`}</div>
        <div>{`durations: ${durations}`}</div>
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
          <ChannelDebug key={i} channel={channel} index={i} />
        ))}
    </div>
  );
};

interface Props {
  scenario: UseScenarioProps;
}

interface ChannelProps {
  channel: SoundChannel;
  index: number;
}

export default Debug;
