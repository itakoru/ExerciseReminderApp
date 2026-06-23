import { useState, useEffect, useRef } from 'react';
import { AppState } from 'react-native';
import { scheduleLocalTimerNotification, cancelAllTimers } from '../services/NotificationService';

export function useTimer() {
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  
  // We keep track of the time the timer should end
  const endTimeRef = useRef(null);
  const intervalRef = useRef(null);
  
  // AppState tracking to fix the UI when coming back from background
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        // App has come to the foreground
        if (isActive && endTimeRef.current) {
          const now = Date.now();
          const msLeft = endTimeRef.current - now;
          if (msLeft > 0) {
            setRemainingSeconds(Math.ceil(msLeft / 1000));
          } else {
            // Timer has passed while in background
            setRemainingSeconds(0);
            setIsActive(false);
            endTimeRef.current = null;
          }
        }
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, [isActive]);

  useEffect(() => {
    if (isActive && remainingSeconds > 0) {
      intervalRef.current = setInterval(() => {
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (!isActive) {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isActive, remainingSeconds]);

  const startTimer = async (seconds) => {
    // 1. Schedule Native Local Notification
    await scheduleLocalTimerNotification(seconds);
    
    // 2. Set React UI State
    endTimeRef.current = Date.now() + (seconds * 1000);
    setRemainingSeconds(seconds);
    setIsActive(true);
  };

  const stopTimer = async () => {
    await cancelAllTimers();
    setIsActive(false);
    setRemainingSeconds(0);
    endTimeRef.current = null;
  };

  return {
    remainingSeconds,
    isActive,
    startTimer,
    stopTimer
  };
}
