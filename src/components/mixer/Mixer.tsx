import React from 'react';
import { useAtom } from 'jotai';
import { SoundChannel } from '../../types/Scenario';
import Divider from '../common/Divider';
import { UseScenarioReturnType } from '../hooks/useScenario';
import MixerChannel from './MixerChannel';
import { showMixerAtom } from '../../atoms/atoms';

interface MixerProps {
  scenario: UseScenarioReturnType;
}
function Mixer({ scenario }: MixerProps) {
  const [showMixer] = useAtom(showMixerAtom);

  return (
    <div className={`mixer-container ${showMixer ? 'expanded' : ''}`}>
      <div className="mixer">
        <h3>Mixer</h3>
        <Divider />
        {Object.values(scenario.soundChannels).map((channel: SoundChannel) => (
          <MixerChannel
            key={channel.id}
            channel={channel}
            setVolume={scenario.setVolume}
            setFrequency={scenario.setFrequency}
            setMute={scenario.setMute}
          />
        ))}
      </div>
    </div>
  );
}

export default Mixer;
