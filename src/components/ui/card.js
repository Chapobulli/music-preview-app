import React from 'react';

export const Card = ({ children, className, onClick }) => {
  return (
    <div className={`rounded-lg shadow-lg p-4 ${className || ""}`} onClick={onClick}>
      {children}
    </div>
  );
};

export const CardContent = ({ children, className }) => {
  return (
    <div className={className || ""}>
      {children}
    </div>
  );
};