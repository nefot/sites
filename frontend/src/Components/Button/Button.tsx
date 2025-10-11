import './Button.css';

import React from 'react';

export default function Button({ children, onClick, handleMouseEnter, handleMouseLeave, active }: {
  children: React.ReactNode,
  onClick?: () => void,
  handleMouseEnter?: () => void,
  handleMouseLeave?: () => void,
  active?: boolean
}) {
  return (
    <button
      className={`custom-btn ${active ? 'active' : ''}`}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onDoubleClick={() => alert('Button double-clicked!')}
    >
      {children}
    </button>
  );
}