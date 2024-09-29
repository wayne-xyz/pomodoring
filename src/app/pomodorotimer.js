"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Square } from 'lucide-react';
import { Button } from "./button"
import { initializeAudio, playSound } from './audioUtils';

// Constants for timer durations
const WORK_TIME = 25 * 60; // 25 minutes in seconds
const BREAK_TIME = 5 * 60; // 5 minutes in seconds

export default function PomodoroTimer() {
  // State variables
  const [timeLeft, setTimeLeft] = useState(WORK_TIME);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const intervalRef = useRef(null);

  // Initialize audio when component mounts
  useEffect(() => {
    initializeAudio();
  }, []);

  // Effect hook to manage timer logic
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(intervalRef.current);
      playSound(); // Play sound when timer reaches zero
      if (isBreak) {
        setTimeLeft(WORK_TIME);
        setIsBreak(false);
      } else {
        setTimeLeft(BREAK_TIME);
        setIsBreak(true);
      }
      setIsActive(false);
    }
    return () => clearInterval(intervalRef.current);
  }, [isActive, timeLeft, isBreak]);

  // Function to toggle timer start/pause
  const toggleTimer = () => {
    if (timeLeft === 0) {
      // Reset timer if it has reached zero
      setTimeLeft(isBreak ? BREAK_TIME : WORK_TIME);
    }
    setIsActive(!isActive);
  };

  // Helper function to format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate progress percentage for the circular progress bar
  const calculateProgress = () => {
    const totalTime = isBreak ? BREAK_TIME : WORK_TIME;
    return ((totalTime - timeLeft) / totalTime) * 100;
  };

  // Render the Pomodoro Timer component
  return (
    <div className="flex flex-col items-center justify-center bg-background ]">
      {/* Circular progress bar */}
      <div className="relative w-64 h-64">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            className="text-secondary stroke-current"
            strokeWidth="4"
            cx="50"
            cy="50"
            r="48"
            fill="transparent"
          />
          {/* Progress circle */}
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
        {/* Timer display */}
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <span className="text-4xl font-bold text-foreground">{formatTime(timeLeft)}</span>
        </div>
      </div>
      {/* Control button */}
      <div className="mt-8">
        <Button onClick={toggleTimer} variant="outline" className="text-primary">
          {isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
      </div>
      {/* Current timer state display */}
      <p className="mt-4 text-lg font-semibold text-foreground">
        {isBreak ? "Break Time" : "Work Time"}
      </p>
    </div>
  );
}