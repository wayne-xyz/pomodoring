'use client'

import { LoaderCircle } from 'lucide-react';
import Link from 'next/link';
import LoginDropdownMenu from './ui/DropdownMenu';

export default function Header() {
  return (
    <div className="flex justify-center items-center h-16 bg-background">
      <div className="flex flex-col items-center w-full max-w-7xl px-4">
        <div className="flex items-center space-x-6">
          <div className="flex items-center">
            <LoaderCircle className="h-8 w-8 mr-2" />
            <h1 className="text-2xl font-bold">Pomodoring</h1>
          </div>
          <nav className="flex items-center space-x-6">
            <Link href="/about" className="text-primary hover:text-primary-dark">
              About
            </Link>
            <Link href="/pricing" className="text-primary hover:text-primary-dark">
              Pricing
            </Link>
            <Link href="/chart-ai" className="text-primary hover:text-primary-dark">
              Chart-AI
            </Link>
            <LoginDropdownMenu />
          </nav>
        </div>
      </div>
    </div>
  );
}

