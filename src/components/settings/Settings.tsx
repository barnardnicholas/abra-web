import React from 'react';
import { useSelector } from 'react-redux';
import { getShowSettings } from '../../redux/selectors/settings';
import Divider from '../common/Divider';
import SettingsItem from './SettingsItem';

const Settings = () => {
    const showSettings = useSelector(getShowSettings);
    return (
        <div className={`settings-container ${showSettings ? 'expanded' : ''}`}>
            <div className="settings">
                <h3>Settings</h3>
                <Divider />
                <SettingsItem label="Debug mode" />
                <Divider />
            </div>
        </div>
    );
};

export default Settings;
