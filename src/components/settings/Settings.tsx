import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { toggleDarkMode } from '../../redux/actions/darkMode';
import { getDarkMode } from '../../redux/selectors/darkMode';
import { getShowSettings } from '../../redux/selectors/settings';
import Divider from '../common/Divider';
import SettingsItem from './SettingsItem';

const Settings = () => {
  const dispatch = useDispatch();
  const showSettings = useSelector(getShowSettings);
  const isDarkMode = useSelector(getDarkMode);

  //   const handleSwitchTheme = () => {};
  return (
    <div className={`settings-container ${showSettings ? 'expanded' : ''}`}>
      <div className="settings">
        <h3>Settings</h3>
        <Divider />
        <SettingsItem label="Debug mode"></SettingsItem>
        <SettingsItem label="Dark theme">
          <div onClick={() => dispatch(toggleDarkMode(!isDarkMode))}>
            {isDarkMode ? '[X]' : '[ ]'}
          </div>
        </SettingsItem>
        <Divider />
      </div>
    </div>
  );
};

export default Settings;
