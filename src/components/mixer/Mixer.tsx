import React from 'react';
import { useSelector } from 'react-redux';
import { getShowMixer } from '../../redux/selectors/mixer';
import { SoundChannel } from '../../types/Scenario';
import Divider from '../common/Divider';
import { UseScenarioProps } from '../hooks/useScenario';
import MixerChannel from './MixerChannel';

interface MixerProps {
  scenario: UseScenarioProps;
}
function Mixer({ scenario }: MixerProps) {
  const showMixer = useSelector(getShowMixer);

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
