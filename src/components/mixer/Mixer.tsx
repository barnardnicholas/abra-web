import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getShowMixer } from '../../redux/selectors/mixer';
import { Scenario, SoundChannel } from '../../types/Scenario';
import Divider from '../common/Divider';
import RangeInput from '../form/Range';
import ToggleSwitch from '../form/ToggleSwitch';
import { UseScenarioProps } from '../hooks/useScenario';

interface MixerProps {
  scenario: UseScenarioProps;
}
const Mixer: React.FC<MixerProps> = ({ scenario }) => {
  const dispatch = useDispatch();
  const showMixer = useSelector(getShowMixer);

  return (
    <div className={`mixer-container ${showMixer ? 'expanded' : ''}`}>
      <div className="mixer">
        <h3>Mixer</h3>
        <Divider />
        {Object.values(scenario.soundChannels).map((channel: SoundChannel, i: number) => (
          <Fragment key={i}>
            <div className="mixer-channel">
              <span>{channel.name}</span>
              <RangeInput
                name={`${channel.name}-vol`}
                value={channel.volume}
                onChange={(_, value) => scenario.setVolume(channel.slug, value)}
              />
            </div>
            <Divider />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default Mixer;
