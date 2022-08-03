import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMixer } from '../../redux/actions/mixer';
import { toggleSettings } from '../../redux/actions/settings';
import { getDebug } from '../../redux/selectors/debug';
import { getShowMixer } from '../../redux/selectors/mixer';
import { getSelectedScenario } from '../../redux/selectors/scenarios';
import { getShowSettings } from '../../redux/selectors/settings';
import { usePrevious } from '../../utils/utils';
import MainLogo from './MainLogo';
import MixerButton from '../mixer/MixerButton';
import ScenarioPicker from './ScenarioPicker';
import SettingsButton from '../settings/SettingsButton';

interface HeaderProps {
  stopScenario: () => void;
  isPlaying: boolean;
  isLoading?: boolean;
}
function Header({ stopScenario, isPlaying, isLoading }: HeaderProps) {
  const dispatch = useDispatch();

  const isScreenNarrow = window.innerWidth < 1000;
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const selectedScenario = useSelector(getSelectedScenario);
  const debug = useSelector(getDebug);
  const showSettings = useSelector(getShowSettings);
  const showMixer = useSelector(getShowMixer);
  const prevProps = usePrevious({ selectedScenario, showSettings, showMixer });

  useEffect(() => {
    setTimeout(() => setFirstLoad(false), 500);
  }, []);

  useEffect(() => {
    if (selectedScenario !== prevProps.selectedScenario) {
      dispatch(toggleSettings(false));
      dispatch(toggleMixer(false));
    }
    if (isScreenNarrow && showMixer && !prevProps.showMixer) {
      dispatch(toggleSettings(false));
    }
    if (isScreenNarrow && showSettings && !prevProps.showSettings) {
      dispatch(toggleMixer(false));
    }
  }, [
    dispatch,
    selectedScenario,
    showMixer,
    showSettings,
    prevProps.selectedScenario,
    prevProps.showMixer,
    prevProps.showSettings,
    isScreenNarrow,
  ]);

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
      <div className="header-item mixer">
        <MixerButton />
      </div>

      <div className="header-item picker">
        <ScenarioPicker stopScenario={stopScenario} isPlaying={isPlaying} />
      </div>
      <div className="header-item settings">
        <SettingsButton />
      </div>
    </header>
  );
}

Header.defaultProps = {
  isLoading: false,
};

export default Header;
