import React from 'react';
import { useSelector, Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import store from './redux/store';
import LoadingHeader from './components/header/LoadingHeader';
import './_styles/App.scss';
import Scenario from './components/scenario/Scenario';
import Header from './components/header/Header';
// import StyleGuide from './components/StyleGuide';
import { getSelectedScenario } from './redux/selectors/scenarios';
import useScenario from './components/hooks/useScenario';
import Settings from './components/settings/Settings';
import { getDarkMode } from './redux/selectors/darkMode';
import Mixer from './components/mixer/Mixer';
import { getShowSettings } from './redux/selectors/settings';
import { getShowMixer } from './redux/selectors/mixer';
import TransportControls from './components/transportControls/TransportControls';
import { getDebug } from './redux/selectors/debug';

function App() {
  const selectedScenario = useSelector(getSelectedScenario) || 'none';
  const isDarkMode = useSelector(getDarkMode);
  const debug = useSelector(getDebug);
  const isShowingSettings = useSelector(getShowSettings);
  const isShowingMixer = useSelector(getShowMixer);
  const scenario = useScenario(selectedScenario as string);
  return (
    <div className={`App ${isDarkMode ? '' : 'theme-light'}`}>
      <Scenario scenario={scenario} />
      <div
        className={`graphics-blocker ${
          !!selectedScenario && selectedScenario !== 'none' && debug ? 'hidden' : ''
        }`}
      />
      {/* <StyleGuide /> */}
      <Header stopScenario={scenario.stopScenario} isPlaying={scenario.isPlaying} />
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
    <Provider store={store().store}>
      <PersistGate loading={<LoadingHeader />} persistor={store().persistor}>
        <Router>
          <App />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default AppContext;
