import { useState } from 'react';
import MainLogo from './MainLogo';

function Header() {
    const [compactHeader, setCompactHeader] = useState(false);

    return (
        <header className={compactHeader ? 'compact' : ''}>
            <div className="header-item logo" onClick={() => setCompactHeader(!compactHeader)}>
                <MainLogo />
            </div>
            <div className="header-item title" onClick={() => setCompactHeader(!compactHeader)}>
                <h1>ABRA</h1>
            </div>
            <div className="header-item chooser" onClick={() => setCompactHeader(!compactHeader)}>
                Scenario chooser
            </div>
            <div className="header-item settings">
                <i className="settings-button fa fa-cog" />
            </div>
        </header>
    );
}

export default Header;
