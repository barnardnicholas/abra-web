import { FLIPPED_ALIAS_KEYS } from '@babel/types';
import * as React from 'react';

interface DividerProps {
    noMargin?: boolean;
    noMarginTop?: boolean;
    noMarginBottom?: boolean;
    extraClasses?: string;
}

const Divider: React.FC<DividerProps> = ({
    noMargin = false,
    noMarginTop = false,
    noMarginBottom = false,
    extraClasses = '',
}) => {
    return (
        <div
            className={`divider ${noMarginTop || noMargin ? 'no-margin-top' : ''} ${
                noMarginBottom || noMargin ? 'no-margin-bottom' : ''
            } ${extraClasses}`}
        />
    );
};

export default Divider;
