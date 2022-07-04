import { useState } from 'react';
import './_styles/App.scss';
import Scenario from './components/Scenario';
import Header from './components/Header';
import StyleGuide from './components/StyleGuide';

function App() {
    const [showAudio, setShowAudio] = useState(false);

    return (
        <div className="App">
            {showAudio && <Scenario />}
            {/* <StyleGuide /> */}
            <Header />
        </div>
    );
}

export default App;
