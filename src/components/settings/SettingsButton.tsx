import * as React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { toggleSettings } from '../../redux/actions/settings';
import { getShowSettings } from '../../redux/selectors/settings';

const SettingsButton = () => {
  const dispatch = useDispatch();
  const showSettings = useSelector(getShowSettings);
  return (
    <button
      className={`settings-button ${showSettings ? 'active' : ''}`}
      onClick={() => dispatch(toggleSettings(!showSettings))}
    >
      <i className="fa fa-cog" />
    </button>
  );
};

export default SettingsButton;
