import React from 'react';

export function Button({ onClick, className, children }) {
  return React.createElement(
    'button',
    {
      onClick: onClick,
      className: `flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${className}`,
    },
    children
  );
}