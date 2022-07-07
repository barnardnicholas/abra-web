import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getShowMixer } from '../../redux/selectors/mixer';
import Divider from '../common/Divider';
import ToggleSwitch from '../form/ToggleSwitch';

const Mixer = () => {
  const dispatch = useDispatch();
  const showMixer = useSelector(getShowMixer);

  return (
    <div className={`mixer-container ${showMixer ? 'expanded' : ''}`}>
      <div className="mixer">
        <h3>Mixer</h3>
        <Divider />
      </div>
    </div>
  );
};

export default Mixer;
