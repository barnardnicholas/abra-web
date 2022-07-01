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
                <div className="item first" onClick={() => setCompactHeader(!compactHeader)}>ITEM 1</div>
                <div className="item second" onClick={() => setCompactHeader(!compactHeader)}>ITEM 2</div>
                <div className="item third" onClick={() => setCompactHeader(!compactHeader)}>ITEM 3</div>
            </header>
        </div>
    );
}

export default App;
