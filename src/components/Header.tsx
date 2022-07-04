import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getDebug } from '../redux/selectors/debug';
import { getSelectedScenario } from '../redux/selectors/scenarios';
import Select from './form/Select';
import MainLogo from './MainLogo';
import ScenarioPicker from './ScenarioPicker';

interface HeaderProps {
    stopScenario: () => void;
    isPlaying: boolean;
}
const Header: React.FC<HeaderProps> = ({ stopScenario, isPlaying }) => {
    const selectedScenario = useSelector(getSelectedScenario);
    const debug = useSelector(getDebug);
    return (
        <header className={selectedScenario ? 'compact' : ''}>
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
            <div className="header-item picker">
                <ScenarioPicker stopScenario={stopScenario} isPlaying={isPlaying}/>
            </div>
            <div className="header-item settings">
                <i className="settings-button fa fa-cog" />
            </div>
        </header>
    );
}

export default Header;
