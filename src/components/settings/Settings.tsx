import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { toggleDarkMode } from '../../redux/actions/darkMode';
import { toggleDebug } from '../../redux/actions/debug';
import { getDarkMode } from '../../redux/selectors/darkMode';
import { getDebug } from '../../redux/selectors/debug';
import { getShowSettings } from '../../redux/selectors/settings';
import Divider from '../common/Divider';
import ToggleSwitch from '../form/ToggleSwitch';
import SettingsItem from './SettingsItem';

const Settings = () => {
  const dispatch = useDispatch();
  const showSettings = useSelector(getShowSettings);
  const isDebug = useSelector(getDebug);
  const isDarkMode = useSelector(getDarkMode);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  //   const handleSwitchTheme = () => {};
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
};

export default Settings;
