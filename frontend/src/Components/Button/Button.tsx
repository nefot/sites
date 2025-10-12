import './Button.scss';

import React from 'react';

export default function Button({children, onClick, active, className}: {
    children: React.ReactNode,
    onClick?: () => void,
    active?: boolean,
    className?: string
}) {
    return (
        <button
            className={` ${className? className + ' custom-btn' : 'custom-btn' }  ${active ? 'active' : ''}`}
            onClick={onClick}


        >
            {children}
        </button>
    );
}