import React from 'react';
import './_styles/App.scss';
import Scenario from './components/Scenario';
import Header from './components/Header';
import StyleGuide from './components/StyleGuide';

function App() {

    return (
        <div className="App">
            <Scenario />
            {/* <StyleGuide /> */}
            <Header />
        </div>
    );
}

export default App;
