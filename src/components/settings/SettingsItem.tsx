import { JSXElement } from '@babel/types';
import React from 'react';

interface SettingsItemProps {
    label?: string;
    children?: React.ReactNode;
}

const SettingsItem: React.FC<SettingsItemProps> = ({ label = '', children }) => {
    return (
        <div className="settings-item">
            <p>{label}</p>
            {children}
        </div>
    );
};

export default SettingsItem;
