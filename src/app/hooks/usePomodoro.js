import { useState, useEffect, useRef } from 'react';
import { useAuth } from './userAuth';
import { saveSession } from '../firestoreService/sessionService';
import { initializeAudio, playSound } from '../audioUtils';
import { useUserState } from './useUserState';


// Constants for timer durations
const WORK_TIME = 25 * 60;  // Work duration: 25 minutes in seconds
const BREAK_TIME = 5 * 60;  // Break duration: 5 minutes in seconds

// Utility function for verbose logging
const verboseLog = (message, data) => {
  if (process.env.NEXT_PUBLIC_DEVELOPMENT_MODE === 'development') {
    console.log(`[Pomodoro] ${message}`, data);
  }
};

export function usePomodoro() {
  // State variables
  const [timeLeft, setTimeLeft] = useState(WORK_TIME);  // Remaining time in current session
  const [isActive, setIsActive] = useState(false);      // Is the timer currently running?
  const [isBreak, setIsBreak] = useState(false);        // Is it currently break time?
  const [startTime, setStartTime] = useState(null);     // Start time of the current session
  const intervalRef = useRef(null);                     // Reference to the timer interval
  const { user } = useAuth();                           // Get the current user from auth context
  const { updateUserState } = useUserState();


  // Initialize audio when the component mounts
  useEffect(() => {
    initializeAudio();
    verboseLog('Pomodoro hook initialized');
  }, []);

  // Main timer logic
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      // Timer is active and there's time left: count down
      intervalRef.current = setInterval(() => {
        setTimeLeft(time => {
          verboseLog('Time left updated', time - 1);
          return time - 1;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      // Timer has reached zero
      clearInterval(intervalRef.current);
      playSound();  // Play notification sound
      verboseLog('Timer reached zero', { isBreak });

      if (!isBreak) {
        // Work session completed: save the session
        const endTime = new Date();
        saveCompletedSession(endTime);
      }

      // Switch between work and break sessions
      if (isBreak) {
        // Break time finished: start work time
        setTimeLeft(WORK_TIME);
        setIsBreak(false);
        setStartTime(new Date());
        verboseLog('Starting work session');
      } else {
        // Work time finished: start break time
        if(user){
          updateUserState(false, new Date());
          verboseLog('User state updated', { isInSession: false, startTime: new Date() });

        }
        setTimeLeft(BREAK_TIME);
        setIsBreak(true);
        verboseLog('Starting break session');
      }
      setIsActive(false);  // Pause the timer
    }

    // Cleanup: clear the interval when the effect re-runs or component unmounts
    return () => clearInterval(intervalRef.current);
  }, [isActive, timeLeft, isBreak]);

  // Function to start or pause the timer
  const toggleTimer = () => {
    if (timeLeft === WORK_TIME && !isActive) {
      // Starting a new work session: set the start time
      setStartTime(new Date());
      verboseLog('New work session started', { startTime: new Date() });
      if(user){
        updateUserState(true, new Date());
        verboseLog('User state updated', { isInSession: true, startTime: new Date() });
      }
    }
    if (timeLeft === 0) {
      // Timer reached zero: reset for the next session
      setTimeLeft(isBreak ? BREAK_TIME : WORK_TIME);
      verboseLog('Timer reset', { isBreak, newTime: isBreak ? BREAK_TIME : WORK_TIME });
      if(user){
        updateUserState(false, new Date());
        verboseLog('User state updated', { isInSession: false, startTime: new Date() });
      }
    }
    setIsActive(!isActive);  // Toggle the timer state
    verboseLog('Timer toggled', { isNowActive: !isActive });
  };

  // Function to save a completed work session
  const saveCompletedSession = async (endTime) => {
    if (user) {
      try {
        const sessionData = {
          userId: user.userId,
          taskId: 'default-task',
          taskName: 'Pomodoro Session',
          projectId: 'default-project',
          projectName: 'Default Project',
          startTime: startTime,
          endTime: endTime,
          duration: WORK_TIME / 60,  // Convert seconds to minutes
          status: 'completed'
        };
        verboseLog('Saving session', sessionData); 
        const savedSession = await saveSession(sessionData);
        verboseLog('Session saved successfully', savedSession);
      } catch (error) {
        console.error('Error saving session:', error);
        verboseLog('Error saving session', error);
      }
    }else{
        verboseLog('No user logged in');
    }
  };

  // Helper function to format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate progress percentage for UI
  const calculateProgress = () => {
    const totalTime = isBreak ? BREAK_TIME : WORK_TIME;
    return ((totalTime - timeLeft) / totalTime) * 100;
  };

  // Return values and functions for use in components
  return {
    timeLeft,
    isActive,
    isBreak,
    toggleTimer,
    formatTime,
    calculateProgress
  };
}
