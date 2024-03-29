import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSettings } from '../../redux/actions/settings';
import { getShowSettings } from '../../redux/selectors/settings';

function SettingsButton() {
  const dispatch = useDispatch();
  const showSettings = useSelector(getShowSettings);

  function handleKeyDown() {
    console.log();
  }

  return (
    <button
      className={`settings-button ${showSettings ? 'active' : ''}`}
      onClick={() => dispatch(toggleSettings(!showSettings))}
      type="button"
      onKeyDown={handleKeyDown}
    >
      <i className="fa fa-cog" />
    </button>
  );
}

export default SettingsButton;
