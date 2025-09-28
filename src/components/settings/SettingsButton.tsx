import * as React from 'react';
import { useAtom } from 'jotai';
import { showSettingsAtom } from '../../atoms/atoms';

function SettingsButton() {
  const [showSettings, setShowSettings] = useAtom(showSettingsAtom);

  function handleKeyDown() {
    console.log();
  }

  return (
    <button
      className={`settings-button ${showSettings ? 'active' : ''}`}
      aria-label="settings"
      onClick={() => setShowSettings(!showSettings)}
      type="button"
      onKeyDown={handleKeyDown}
    >
      <i className="fa fa-cog" />
    </button>
  );
}

export default SettingsButton;
