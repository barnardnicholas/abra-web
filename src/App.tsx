import { useState } from 'react';
import './_styles/App.scss';
import Scenario from './components/Scenario';
import ModelTests from './components/ModelTests';

function App() {
    const [showAudio, setShowAudio] = useState(false);
    return (
        <div className="App">
            {showAudio && <Scenario />}
            {/* <ModelTests /> */}
            <div className="floating-header">
                <h1>Three Tests</h1>
                <button onClick={() => setShowAudio(!showAudio)}>Audio Tests</button>
            </div>
        </div>
    );
}

export default App;
