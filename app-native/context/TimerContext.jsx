import React, { createContext, useContext } from 'react';
import { useTimer } from '../hooks/useTimer';

const TimerContext = createContext(null);

export function TimerProvider({ children }) {
  const timer = useTimer();
  
  return (
    <TimerContext.Provider value={timer}>
      {children}
    </TimerContext.Provider>
  );
}

export function useTimerContext() {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimerContext must be used within a TimerProvider');
  }
  return context;
}
