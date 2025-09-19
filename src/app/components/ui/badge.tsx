import React from 'react';

interface BadgeProps {
  className?: string;
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ className = '', children }) => {
  return (
    <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
      {children}
    </div>
  );
};