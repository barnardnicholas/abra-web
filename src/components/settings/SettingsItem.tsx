import React from 'react';

interface SettingsItemProps {
    label?: string;
}

const SettingsItem: React.FC<SettingsItemProps> = ({ label = '' }) => {
    return (
        <div className="settings-item">
            <p>{label}</p>
        </div>
    );
};

export default SettingsItem;
