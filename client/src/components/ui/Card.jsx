
import React from 'react';

// Компонент для картки
export const Card = ({ children, className }) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg p-4 ${className}`}>
      {children}
    </div>
  );
};

// Компонент для вмісту картки
export const CardContent = ({ children }) => {
  return <div className="p-4">{children}</div>;
};
