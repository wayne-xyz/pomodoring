'use client'

import { LoaderCircle } from 'lucide-react';
import Link from 'next/link';
import LoginDropdownMenu from './ui/DropdownMenu';
import { useEffect, useState } from 'react';

export default function Header() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Set initial rotation state
    setIsInitialized(true);
    
    // Start rotation after a tiny delay
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 10);

    return () => clearTimeout(timer);
  }, []);

  if (!isInitialized) {
    return null;
  }

  return (
    <div className="flex justify-center items-center h-16 bg-background">
      <div className="flex flex-col items-center w-full max-w-7xl px-4">
        <div className="flex items-center space-x-6">
          <div className="flex items-center">
            <LoaderCircle 
              className={`h-8 w-8 mr-2 transform transition-all ease-in-out will-change-transform ${
                isLoaded ? 'rotate-0' : 'rotate-[-180deg]'
              }`}
              style={{ 
                transitionProperty: 'transform', 
                transitionDuration: '700ms',
                transitionTimingFunction: 'ease-in-out'
              }}
            />
            <Link href="/" className="text-2xl font-bold hover:text-primary transition-colors">
              Pomodoring
            </Link>
          </div>
          <nav className="flex items-center space-x-6">
            <Link href="/chart-ai" className="text-primary hover:text-primary-dark">
              Chart-AI
            </Link>

            <Link href="/pricing" className="text-primary hover:text-primary-dark">
              Pricing
            </Link>            
            <Link href="/about" className="text-primary hover:text-primary-dark">
              About
            </Link>

            <LoginDropdownMenu />
          </nav>
        </div>
      </div>
    </div>
  );
}
