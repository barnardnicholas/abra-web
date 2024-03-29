import React from 'react';
import { SoundChannel, soundTypes } from '../../types/Scenario';
import { isChannelPlaying } from '../../utils/utils';
import Divider from '../common/Divider';
import RangeInput from '../form/Range';

interface MixerChannelProps {
  channel: SoundChannel;
  setVolume: (slug: string, volume: number) => void;
  setFrequency: (slug: string, frequency: number) => void;
  setMute: (slug: string, mute: boolean) => void;
}
function MixerChannel({ channel, setVolume, setFrequency, setMute }: MixerChannelProps) {
  const getIconFromVolume = () => {
    if (channel.mute) return 'volume-mute';
    if (channel.volume < 0.2) return 'volume-off';
    if (channel.volume < 0.6) return 'volume-down';
    return 'volume-up';
  };

  function handleKeyDown() {
    console.log();
  }

  return (
    <>
      <div className="mixer-channel">
        <span className="channel-label">
          <i className={`play-indicator fa fa-${isChannelPlaying(channel) ? 'play' : 'stop'}`} />
          {channel.name}
        </span>
        <span className="channel-control">
          {/* eslint-disable */}
          <i
            className={`fa mute-button fa-${getIconFromVolume()}`}
            onClick={() => setMute(channel.slug, !channel.mute)}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
          />
          {/* eslint-enable */}
          <RangeInput
            name={`${channel.name}-vol`}
            value={channel.volume}
            onChange={(_, value) => setVolume(channel.slug, value)}
          />
        </span>
        {channel.type !== soundTypes.background && (
          <span className="channel-control freq">
            <i className="fa fa-stopwatch" />
            <RangeInput
              name={`${channel.name}-vol`}
              value={channel.frequency}
              onChange={(_, value) => setFrequency(channel.slug, value)}
            />
          </span>
        )}
      </div>
      <Divider />
    </>
  );
}

export default MixerChannel;
