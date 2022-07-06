import React from 'react';
import { useSelector } from 'react-redux';
import { getShowSettings } from '../../redux/selectors/settings';

const Settings = () => {
    const showSettings = useSelector(getShowSettings);
    return (
        <div className={`settings-container ${showSettings ? 'expanded' : ''}`}>
            <div className="settings">
                <h3>Settings</h3>
            </div>
        </div>
    );
};

export default Settings;
