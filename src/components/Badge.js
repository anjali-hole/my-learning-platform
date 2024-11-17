import React from 'react';

const Badge = ({ children, color = 'blue' }) => {
  const colors = {
    blue: "bg-blue-100 text-blue-800 border border-blue-200",
    purple: "bg-purple-100 text-purple-800 border border-purple-200",
    green: "bg-emerald-100 text-emerald-800 border border-emerald-200",
    pink: "bg-pink-100 text-pink-800 border border-pink-200",
    orange: "bg-orange-100 text-orange-800 border border-orange-200",
    teal: "bg-teal-100 text-teal-800 border border-teal-200"
  };
  
  return (
    <span className={`
      ${colors[color]} 
      inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
      shadow-sm hover:shadow-md transition-all duration-300
    `}>
      {children}
    </span>
  );
};

export default Badge;