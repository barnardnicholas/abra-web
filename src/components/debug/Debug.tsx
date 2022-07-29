import React from 'react';
import { SoundChannel, soundTypes } from '../../types/Scenario';
import { isEmpty } from '../../utils/utils';
import { UseScenarioProps } from '../hooks/useScenario';

function ChannelDebug({ channel }: ChannelProps) {
  const { name, slug, isPlaying, durations, type, frequency, volume } = channel;
  const isPlayingArr = Object.values(isPlaying).toString();
  return (
    <div>
      <strong>{`${soundTypes[type]} Channel: ${name} (${slug})`}</strong>
      <div>{`isPlaying: ${isPlayingArr}`}</div>
      <div>{`durations: ${durations}`}</div>
      <div>{`frequency: ${frequency}`}</div>
      <div>{`vol: ${volume}`}</div>
      <br />
    </div>
  );
}

function Debug({ scenario }: DebugProps) {
  return (
    <div className="debug">
      <div>
        <div>{`Scenario isPlaying: ${scenario.isPlaying}`}</div>
        <br />
      </div>
      {!isEmpty(scenario.soundChannels) &&
        Object.values(scenario.soundChannels).map((channel: SoundChannel) => (
          <ChannelDebug key={channel.id} channel={channel} />
        ))}
    </div>
  );
}

interface DebugProps {
  scenario: UseScenarioProps;
}

interface ChannelProps {
  channel: SoundChannel;
}

export default Debug;
