import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useAtom } from 'jotai';
import LoadingHeader from './components/header/LoadingHeader';
import './_styles/App.scss';
import Scenario from './components/scenario/Scenario';
import Header from './components/header/Header';
// import StyleGuide from './components/StyleGuide';
import useScenario from './components/hooks/useScenario';
import Settings from './components/settings/Settings';
import Mixer from './components/mixer/Mixer';
import TransportControls from './components/transportControls/TransportControls';
import {
  darkModeAtom,
  debugAtom,
  selectedScenarioAtom,
  showMixerAtom,
  showSettingsAtom,
} from './atoms/atoms';

function App() {
  const [selectedScenario] = useAtom(selectedScenarioAtom);
  const [isDarkMode] = useAtom(darkModeAtom);
  const [debug] = useAtom(debugAtom);
  const [isShowingSettings] = useAtom(showSettingsAtom);
  const [isShowingMixer] = useAtom(showMixerAtom);
  const scenario = useScenario(selectedScenario as string);
  return (
    <div className={`App ${isDarkMode ? '' : 'theme-light'}`}>
      <Scenario scenario={scenario} />
      <div
        className={`graphics-blocker ${
          (!!selectedScenario && selectedScenario !== 'none') || debug ? 'hidden' : ''
        }`}
      />
      {/* <StyleGuide /> */}
      <Header
        stopScenario={scenario.stopScenario}
        isPlaying={scenario.isPlaying}
        selectedScenario={selectedScenario}
      />
      <div
        className={`background-blocker ${
          isShowingSettings || isShowingMixer ? 'semi-hidden' : 'hidden'
        }`}
      />
      <Mixer scenario={scenario} />
      <Settings />
      <TransportControls scenario={scenario} />
    </div>
  );
}

function AppContext() {
  return (
    <Suspense fallback={<LoadingHeader />}>
      <Router>
        <App />
      </Router>
    </Suspense>
  );
}

export default AppContext;
