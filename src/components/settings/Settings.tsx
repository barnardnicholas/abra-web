import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { toggleDarkMode } from '../../redux/actions/darkMode';
import { toggleDebug } from '../../redux/actions/debug';
import { getDarkMode } from '../../redux/selectors/darkMode';
import { getDebug } from '../../redux/selectors/debug';
import { getShowSettings } from '../../redux/selectors/settings';
import Divider from '../common/Divider';
import SettingsItem from './SettingsItem';

const Settings = () => {
  const dispatch = useDispatch();
  const showSettings = useSelector(getShowSettings);
  const isDebug = useSelector(getDebug);
  const isDarkMode = useSelector(getDarkMode);

  //   const handleSwitchTheme = () => {};
  return (
    <div className={`settings-container ${showSettings ? 'expanded' : ''}`}>
      <div className="settings">
        <h3>Settings</h3>
        <Divider />
        <SettingsItem label="Debug mode">
          <div onClick={() => dispatch(toggleDebug(!isDebug))}>{isDebug ? '[X]' : '[ ]'}</div>
        </SettingsItem>
        <Divider />
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
