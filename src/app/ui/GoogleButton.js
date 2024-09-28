import React, { useState } from 'react';

const GoogleButton = ({ onClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const buttonClasses = `
    relative ${isExpanded ? 'w-auto px-4' : 'w-10'} h-10 max-w-[400px] min-w-min
    bg-white border border-[#747775] rounded-full cursor-pointer
    font-['Roboto',arial,sans-serif] text-sm text-[#1f1f1f]
    transition-all duration-218 ease-in-out
    hover:shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)]
    focus:outline-none
  `;

  return (
    <button 
      onClick={onClick}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      className={buttonClasses}
    >
      <div className="absolute inset-0 opacity-0 bg-[#303030] transition-opacity duration-218 ease-in-out group-hover:opacity-[0.08] group-focus:opacity-[0.12] group-active:opacity-[0.12] rounded-full"></div>
      <div className="flex items-center justify-center h-full">
        <div className={`w-5 h-5 ${isExpanded ? 'mr-3' : ''}`}>
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" xmlnsXlink="http://www.w3.org/1999/xlink" className="block">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
            <path fill="none" d="M0 0h48v48H0z"></path>
          </svg>
        </div>
        {isExpanded && (
          <span className="flex-grow font-medium overflow-hidden text-ellipsis whitespace-nowrap">
            Sign in with Google
          </span>
        )}
      </div>
    </button>
  );
};

export default GoogleButton;
