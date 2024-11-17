// src/components/ui/ProgressBar.js
import React from 'react';

const ProgressBar = ({ 
  value = 0, 
  color = 'blue',
  size = 'default',
  showValue = false,
  animated = true // Added default prop
}) => {
  const colors = {
    blue: {
      base: 'bg-blue-500',
      background: 'bg-blue-100',
      text: 'text-blue-700'
    },
    green: {
      base: 'bg-green-500',
      background: 'bg-green-100',
      text: 'text-green-700'
    },
    yellow: {
      base: 'bg-yellow-500',
      background: 'bg-yellow-100',
      text: 'text-yellow-700'
    },
    purple: {
      base: 'bg-purple-500',
      background: 'bg-purple-100',
      text: 'text-purple-700'
    },
    red: {
      base: 'bg-red-500',
      background: 'bg-red-100',
      text: 'text-red-700'
    }
  };

  const sizes = {
    small: 'h-2',
    default: 'h-3',
    large: 'h-4'
  };

  const safeValue = Math.min(Math.max(value, 0), 100);

  return (
    <div className="relative w-full">
      <div className={`
        w-full rounded-full overflow-hidden
        ${sizes[size] || sizes.default}
        ${colors[color]?.background || colors.blue.background}
      `}>
        <div
          className={`
            ${colors[color]?.base || colors.blue.base}
            ${sizes[size] || sizes.default}
            ${animated ? 'transition-all duration-500 ease-out' : ''}
            rounded-full relative
          `}
          style={{ width: `${safeValue}%` }}
        >
          {animated && safeValue > 30 && (
            <div className="absolute inset-0 bg-white/20">
              <div className="animate-pulse w-full h-full" />
            </div>
          )}
        </div>
      </div>
      
      {showValue && (
        <div className={`
          absolute -top-6 right-0
          text-sm font-medium
          ${colors[color]?.text || colors.blue.text}
        `}>
          {safeValue}%
        </div>
      )}
    </div>
  );
};

// Add prop types for better documentation
ProgressBar.defaultProps = {
  value: 0,
  color: 'blue',
  size: 'default',
  showValue: false,
  animated: true
};

export default ProgressBar;