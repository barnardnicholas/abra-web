import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '../../redux/actions/darkMode';
import { toggleDebug } from '../../redux/actions/debug';
import { getDarkMode } from '../../redux/selectors/darkMode';
import { getDebug } from '../../redux/selectors/debug';
import { getShowSettings } from '../../redux/selectors/settings';
import Divider from '../common/Divider';
import ToggleSwitch from '../form/ToggleSwitch';

function Settings() {
  const dispatch = useDispatch();
  const showSettings = useSelector(getShowSettings);
  const isDebug = useSelector(getDebug);
  const isDarkMode = useSelector(getDarkMode);
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
      </div>
    </div>
  );
}

export default Settings;
