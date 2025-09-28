import React from 'react';
import { useAtom } from 'jotai';
import Divider from '../common/Divider';
import ToggleSwitch from '../form/ToggleSwitch';
import { darkModeAtom, debugAtom, showSettingsAtom } from '../../atoms/atoms';

function Settings() {
  const [darkMode, setDarkMode] = useAtom(darkModeAtom);
  const [debug, setDebug] = useAtom(debugAtom);
  const [showSettings] = useAtom(showSettingsAtom);

  return (
    <div className={`settings-container ${showSettings ? 'expanded' : ''}`}>
      <div className="settings">
        <h3>Settings</h3>
        <Divider />
        <ToggleSwitch label="Debug" value={debug} name="debug" onChange={() => setDebug(!debug)} />
        <Divider />
        <ToggleSwitch
          label="Dark theme"
          value={darkMode}
          name="darkMode"
          onChange={() => setDarkMode(!darkMode)}
        />
        <Divider />
      </div>
    </div>
  );
}

export default Settings;
