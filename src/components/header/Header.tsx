import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { usePrevious } from '../../utils/utils';
import MainLogo from './MainLogo';
import MixerButton from '../mixer/MixerButton';
import ScenarioPicker from './ScenarioPicker';
import SettingsButton from '../settings/SettingsButton';
import {
  debugAtom,
  // selectedScenarioAtom,
  showMixerAtom,
  showSettingsAtom,
} from '../../atoms/atoms';

interface HeaderProps {
  stopScenario: () => void;
  isPlaying: boolean;
  isLoading?: boolean;
  selectedScenario: string | null;
}
function Header({ stopScenario, isPlaying, isLoading, selectedScenario }: HeaderProps) {
  const isScreenNarrow = window.innerWidth < 1000;
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  // const [selectedScenario] = useAtom(selectedScenarioAtom);
  const [debug] = useAtom(debugAtom);
  const [showSettings, setShowSettings] = useAtom(showSettingsAtom);
  const [showMixer, setShowMixer] = useAtom(showMixerAtom);
  const prevProps = usePrevious({ selectedScenario, showSettings, showMixer });

  useEffect(() => {
    setTimeout(() => setFirstLoad(false), 500);
  }, []);

  useEffect(() => {
    if (selectedScenario !== prevProps.selectedScenario) {
      setShowSettings(false);
      setShowMixer(false);
    }
    if (isScreenNarrow && showMixer && !prevProps.showMixer) {
      setShowSettings(false);
    }
    if (isScreenNarrow && showSettings && !prevProps.showSettings) {
      setShowMixer(false);
    }
  }, [
    selectedScenario,
    showMixer,
    showSettings,
    prevProps.selectedScenario,
    prevProps.showMixer,
    prevProps.showSettings,
    isScreenNarrow,
    setShowMixer,
    setShowSettings,
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
