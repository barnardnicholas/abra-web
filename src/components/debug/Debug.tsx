import React from 'react';
import { SoundChannel } from '../../types/Scenario';
import { isEmpty } from '../../utils/utils';
import { UseScenarioProps } from '../hooks/useScenario';
import ChannelDebug from './ChannelDebug';

export interface SoundsTallyItem {
  fullPath: string;
  fileName: string;
  isPlaying: boolean;
  displayDuration: string;
}

export type SoundsTally = Record<string, SoundsTallyItem>;

export type LastPlayed = Record<string, number | null>;

interface DebugProps {
  scenario: UseScenarioProps;
}

function Debug({ scenario }: DebugProps) {
  return (
    <div className="debug">
      <div>
        <div>{`Scenario isPlaying: ${scenario.isPlaying}`}</div>
        <br />
      </div>
      <div className="item-container">
        {!isEmpty(scenario.soundChannels) &&
          Object.values(scenario.soundChannels).map((channel: SoundChannel) => (
            <ChannelDebug key={channel.id} channel={channel} />
          ))}
      </div>
    </div>
  );
}

export default Debug;
