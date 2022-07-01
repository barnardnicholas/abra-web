import { useState } from 'react';
import MainLogo from './MainLogo';

function App() {
    const [compactHeader, setCompactHeader] = useState(false)

    return (
            <header className={compactHeader ? 'compact' : ''}>
                <div className="header-item logo" onClick={() => setCompactHeader(!compactHeader)}><MainLogo/></div>
                <div className="header-item title" onClick={() => setCompactHeader(!compactHeader)}><h1>ABRA</h1></div>
                <div className="header-item chooser" onClick={() => setCompactHeader(!compactHeader)}>Scenario chooser</div>
            </header>
    );
}

export default App;