import { useState } from 'react';
import './_styles/App.scss';
import Scenario from './components/Scenario';
import Header from './components/Header';
import StyleGuide from './components/StyleGuide';
import { useSelector } from 'react-redux';
import { getSelectedScenario } from './redux/selectors/scenarios';

function App() {
    const selectedScenario = useSelector(getSelectedScenario)

    return (
        <div className="App">
            {!!selectedScenario && <Scenario />}
            {/* <StyleGuide /> */}
            <Header />
        </div>
    );
}

export default App;
