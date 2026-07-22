import { useState, useEffect, useRef } from 'react';
import { AppState } from 'react-native';
import { scheduleLocalTimerNotification, cancelTimer } from '../services/NotificationService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useTimer() {
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  
  // We keep track of the time the timer should end
  const endTimeRef = useRef(null);
  const intervalRef = useRef(null);

  // AppState tracking to fix the UI when coming back from background
  const appState = useRef(AppState.currentState);

  // Restore Timer from AsyncStorage on Boot
  useEffect(() => {
    const restoreTimer = async () => {
      try {
        const savedEnd = await AsyncStorage.getItem('activeFlowTimerEnd');
        if (savedEnd) {
          const end = Number(savedEnd);
          if (end > Date.now()) {
            endTimeRef.current = end;
            setIsActive(true);
            const savedTotal = await AsyncStorage.getItem('activeFlowTimerTotal');
            setTotalSeconds(savedTotal ? Number(savedTotal) : Math.ceil((end - Date.now()) / 1000));
            setRemainingSeconds(Math.ceil((end - Date.now()) / 1000));
          } else {
            // Timer expired while closed
            await AsyncStorage.removeItem('activeFlowTimerEnd');
            await AsyncStorage.removeItem('activeFlowTimerTotal');
          }
        }
      } catch (e) {
        console.log("Failed to restore timer", e);
      }
    };
    restoreTimer();
  }, []);

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
    // 1. Set React UI State SYNCHRONOUSLY so the screen flips to "Running" instantly
    const end = Date.now() + (seconds * 1000);
    endTimeRef.current = end;
    setRemainingSeconds(seconds);
    setTotalSeconds(seconds);
    setIsActive(true);

    // 2. Persist to Hard Drive for cold-start recovery
    AsyncStorage.setItem('activeFlowTimerEnd', String(end));
    AsyncStorage.setItem('activeFlowTimerTotal', String(seconds));

    // 3. Schedule Native Local Notification in the background
    await scheduleLocalTimerNotification(seconds);
  };

  const stopTimer = async () => {
    await cancelTimer('default-timer');
    setIsActive(false);
    setRemainingSeconds(0);
    setTotalSeconds(0);
    endTimeRef.current = null;
    
    // Clear Hard Drive memory
    AsyncStorage.removeItem('activeFlowTimerEnd');
    AsyncStorage.removeItem('activeFlowTimerTotal');
  };

  return {
    remainingSeconds,
    totalSeconds,
    isActive,
    startTimer,
    stopTimer
  };
}
