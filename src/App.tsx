import React from 'react';
import './_styles/App.scss';
import Scenario from './components/Scenario';
import Header from './components/Header';
import StyleGuide from './components/StyleGuide';
import { useSelector } from 'react-redux';
import { getSelectedScenario } from './redux/selectors/scenarios';
import useScenario from './components/hooks/useScenario';

function App() {
    const selectedScenario = useSelector(getSelectedScenario) || 'none';
    const scenario = useScenario(selectedScenario as string);
    return (
        <div className="App">
            <Scenario scenario={scenario} selectedScenario={selectedScenario}/>
            {/* <StyleGuide /> */}
            <Header stopScenario={scenario.stopScenario} isPlaying={scenario.isPlaying}/>
        </div>
    );
}

export default App;
