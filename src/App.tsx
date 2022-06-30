import { useState } from 'react';
import './fonts.css'
import './_styles/App.scss';
import Scenario from './components/Scenario';
import { useSelector } from 'react-redux';
import { getDebug } from './redux/selectors/debug';
import { useDispatch } from 'react-redux';
import { toggleDebugState } from './redux/actions/debug';
import StyleGuide from './components/StyleGuide';

function App() {
    const [showAudio, setShowAudio] = useState(false);
    const dispatch = useDispatch();
    const debug = useSelector(getDebug);

    return (
        <div className="App">
            {/* {showAudio && <Scenario/>}
            <div className="floating-header">
                <h1>Three Tests</h1>
                <button onClick={() => setShowAudio(!showAudio)}>Audio Tests</button>
                <button onClick={() => {
                    //@ts-ignore
                    dispatch(toggleDebugState(!debug))
                }} >Debug {debug ? 'Off' : 'On'}</button>
            </div> */}
            <StyleGuide />
        </div>
    );
}

export default App;
