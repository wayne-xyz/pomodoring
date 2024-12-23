"use client"

import React from 'react';
import { Play, Pause } from 'lucide-react';
import { Button } from "./button"
import { usePomodoro } from '../hooks/usePomodoro';

export default function PomodoroTimer({currentTask}) {
  const {
    timeLeft,
    isActive,
    isBreak,
    toggleTimer,
    formatTime,
    calculateProgress
  } = usePomodoro({currentTask});

  React.useEffect(() => {
    console.log('currentTaskId changed in PomodoroTimer', currentTask)
  }, [currentTask])

  return (
    <div className="flex flex-col items-center justify-center bg-background ]">
      <div className="relative w-64 h-64">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            className="text-secondary stroke-current"
            strokeWidth="4"
            cx="50"
            cy="50"
            r="48"
            fill="transparent"
          />
          <circle
            className="text-primary stroke-current"
            strokeWidth="4"
            strokeLinecap="round"
            cx="50"
            cy="50"
            r="48"
            fill="transparent"
            strokeDasharray="301.59"
            strokeDashoffset={301.59 - (calculateProgress() / 100 * 301.59)}
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <span className="text-4xl font-bold text-foreground">{formatTime(timeLeft)}</span>
        </div>
      </div>
      <div className="mt-8">
        <Button onClick={toggleTimer} variant="outline" className="text-primary">
          {isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
      </div>
      <p className="mt-4 text-lg font-semibold text-foreground">
        {isBreak ? "Break Time" : "Work Time"}
      </p>
    </div>
  );
}