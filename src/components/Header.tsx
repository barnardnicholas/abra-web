import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { toggleSettings, toggleShowSettings } from '../redux/actions/settings';
import { getDebug } from '../redux/selectors/debug';
import { getSelectedScenario } from '../redux/selectors/scenarios';
import { getShowSettings } from '../redux/selectors/settings';
import { usePrevious } from '../utils/utils';
import Select from './form/Select';
import MainLogo from './MainLogo';
import ScenarioPicker from './ScenarioPicker';
import SettingsButton from './settings/SettingsButton';

interface HeaderProps {
  stopScenario: () => void;
  isPlaying: boolean;
  isLoading?: boolean;
}
const Header: React.FC<HeaderProps> = ({ stopScenario, isPlaying, isLoading }) => {
  const dispatch = useDispatch();
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const selectedScenario = useSelector(getSelectedScenario);
  const debug = useSelector(getDebug);
  const prevProps = usePrevious({ selectedScenario });

  useEffect(() => {
    setTimeout(() => setFirstLoad(false), 500);
  }, []);

  useEffect(() => {
    if (selectedScenario !== prevProps.selectedScenario) {
      dispatch(toggleSettings(false));
    }
  }, [selectedScenario, prevProps.selectedScenario]);

  return (
    <header
      className={`${selectedScenario ? 'compact' : ''} ${isLoading || firstLoad ? 'loading' : ''}`}
    >
      {debug && (
        <>
          <div className="guide-vertical" />
          <div className="guide-horizontal" />
        </>
      )}
      <div className="header-item logo">
        <MainLogo forceDarkTheme={isLoading} />
      </div>
      <div className="header-item title">
        <h1>ABRA</h1>
      </div>
      <div className="header-item picker">
        <ScenarioPicker stopScenario={stopScenario} isPlaying={isPlaying} />
      </div>
      <div className="header-item settings">
        <SettingsButton />
      </div>
    </header>
  );
};

export default Header;
