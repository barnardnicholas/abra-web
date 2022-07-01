import { useState } from 'react';
import './_styles/App.scss';
import Scenario from './components/Scenario';
import { useSelector } from 'react-redux';
import { getDebug } from './redux/selectors/debug';
import { useDispatch } from 'react-redux';
import { toggleDebugState } from './redux/actions/debug';
import MainLogo from './components/MainLogo';

function App() {
    const [compactHeader, setCompactHeader] = useState(false)
    const [showAudio, setShowAudio] = useState(false);
    const dispatch = useDispatch();
    const debug = useSelector(getDebug);

    return (
        <div className="App">
            {showAudio && <Scenario/>}
            {/* <div className="floating-header">
                <h1>Three Tests</h1>
                <MainLogo/>
                <button onClick={() => setShowAudio(!showAudio)}>Audio Tests</button>
                <button onClick={() => {
                    //@ts-ignore
                    dispatch(toggleDebugState(!debug))
                }} >Debug {debug ? 'Off' : 'On'}</button>
            </div> */}
            {/* <StyleGuide /> */}
            <header className={compactHeader ? 'compact' : ''}>
                <div className="header-item logo" onClick={() => setCompactHeader(!compactHeader)}><MainLogo/></div>
                <div className="header-item title" onClick={() => setCompactHeader(!compactHeader)}><h1>ABRA</h1></div>
                <div className="header-item chooser" onClick={() => setCompactHeader(!compactHeader)}>Scenario chooser</div>
            </header>
        </div>
    );
}

export default App;
