import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '../../redux/actions/darkMode';
import { toggleConcurrentAudio, toggleDebug } from '../../redux/actions/debug';
import { getDarkMode } from '../../redux/selectors/darkMode';
import { getConcurrentAudio, getDebug } from '../../redux/selectors/debug';
import { getShowSettings } from '../../redux/selectors/settings';
import Divider from '../common/Divider';
import ToggleSwitch from '../form/ToggleSwitch';

function Settings() {
  const dispatch = useDispatch();
  const showSettings = useSelector(getShowSettings);
  const isDebug = useSelector(getDebug);
  const isDarkMode = useSelector(getDarkMode);
  const concurrentAudio = useSelector(getConcurrentAudio);
  return (
    <div className={`settings-container ${showSettings ? 'expanded' : ''}`}>
      <div className="settings">
        <h3>Settings</h3>
        <Divider />
        <ToggleSwitch
          label="Debug"
          value={isDebug}
          name="debug"
          onChange={() => dispatch(toggleDebug(!isDebug))}
        />
        <Divider />
        <ToggleSwitch
          label="Dark theme"
          value={isDarkMode}
          name="darkMode"
          onChange={() => dispatch(toggleDarkMode(!isDarkMode))}
        />
        <Divider />
        <ToggleSwitch
          label="Concurrent audio clocks"
          value={concurrentAudio}
          name="concorrentAudio"
          onChange={() => dispatch(toggleConcurrentAudio(!concurrentAudio))}
        />
        <Divider />
      </div>
    </div>
  );
}

export default Settings;
