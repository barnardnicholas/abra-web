import * as React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { toggleMixer } from '../../redux/actions/mixer';
import { toggleSettings } from '../../redux/actions/settings';
import { getShowMixer } from '../../redux/selectors/mixer';

const MixerButton = () => {
  const dispatch = useDispatch();
  const showMixer = useSelector(getShowMixer);
  return (
    <button
      className={`mixer-button ${showMixer ? 'active' : ''}`}
      onClick={() => dispatch(toggleMixer(!showMixer))}
    >
      <i className="fa fa-sliders-h" />
    </button>
  );
};

export default MixerButton;
