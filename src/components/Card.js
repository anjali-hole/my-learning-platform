import React from 'react';

const Card = ({ children, className = '', color = '' }) => (
  <div className={`
    ${color || 'bg-white'} 
    rounded-xl shadow-lg p-6 
    ${className}`
  }>
    {children}
  </div>
);

export default Card;