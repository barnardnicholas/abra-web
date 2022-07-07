import React from 'react';
import { SoundChannel } from '../../types/Scenario';
import Divider from '../common/Divider';
import RangeInput from '../form/Range';
import ToggleSwitch from '../form/ToggleSwitch';
import { UseScenarioProps } from '../hooks/useScenario';

interface MixerChannelProps {
  channel: SoundChannel;
  setVolume: (slug: string, volume: number) => void;
}
const MixerChannel: React.FC<MixerChannelProps> = ({ channel, setVolume }) => {
  const getIconFromVolume = () => {
    if (channel.volume < 0.2) return 'volume-off';
    if (channel.volume < 0.6) return 'volume-down';
    return 'volume-up';
  };
  return (
    <>
      <div className="mixer-channel">
        <span className="channel-label">{channel.name}</span>
        <span className="channel-control">
          <i className={`fa fa-${getIconFromVolume()}`} />
          <RangeInput
            name={`${channel.name}-vol`}
            value={channel.volume}
            onChange={(_, value) => setVolume(channel.slug, value)}
          />
        </span>
      </div>
      <Divider />
    </>
  );
};

export default MixerChannel;
