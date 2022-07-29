import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleMixer } from '../../redux/actions/mixer';
import { getShowMixer } from '../../redux/selectors/mixer';

function MixerButton() {
  const dispatch = useDispatch();
  const showMixer = useSelector(getShowMixer);
  return (
    <button
      className={`mixer-button ${showMixer ? 'active' : ''}`}
      onClick={() => dispatch(toggleMixer(!showMixer))}
      type="button"
    >
      <i className="fa fa-sliders-h" />
    </button>
  );
}

export default MixerButton;
