import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getDebug } from '../redux/selectors/debug';
import Select from './form/Select';
import MainLogo from './MainLogo';
import ScenarioPicker from './ScenarioPicker';

function Header() {
    const [compactHeader, setCompactHeader] = useState(false);
    const debug = useSelector(getDebug);
    return (
        <header className={compactHeader ? 'compact' : ''}>
            {debug && <>
            <div className="guide-vertical"/>
            <div className="guide-horizontal"/>
            </>}
            <div className="header-item logo">
                <MainLogo />
            </div>
            <div className="header-item title">
                <h1>ABRA</h1>
            </div>
            <div className="header-item chooser">
                <ScenarioPicker setCompactHeader={setCompactHeader}/>
            </div>
            <div className="header-item settings">
                <i className="settings-button fa fa-cog" />
            </div>
        </header>
    );
}

export default Header;
