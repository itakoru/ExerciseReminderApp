import React, { useState } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';

// 1. Hier werden alle deine 12 Fenster importiert
import Onboarding from './pages/Onboarding';
import FlowSetupScreen from './pages/FlowSetupScreen';
import ExerciseDurationSetupScreen from './pages/ExerciseDurationSetupScreen';
import ExerciseListScreen from './pages/ExerciseListScreen';
import ExerciseInfoScreen from './pages/ExerciseInfoScreen';
import ReminderIntervalSetupScreen from './pages/ReminderIntervalSetupScreen';
import TimerActiveScreen from './pages/TimerActiveScreen';
import ExerciseDetailScreen from './pages/ExerciseDetailScreen';
import PraiseScreen from './pages/PraiseScreen';
import DailySuccessScreen from './pages/DailySuccessScreen';
import PauseTimeScreen from './pages/PauseTimeScreen';
import { TimerProvider } from './context/TimerContext';
import { registerForPushNotificationsAsync } from './services/NotificationService';

export default function App() {
  // TIPP: Ändere die Zahl hier (1 bis 11), um das jeweilige Fenster live zu sehen!
  const [currentScreen, setCurrentScreen] = useState(1);
  const [previousScreen, setPreviousScreen] = useState(undefined);
  const [selectedExerciseId, setSelectedExerciseId] = useState(undefined);
  const [timerSettings, setTimerSettings] = useState({ exerciseSeconds: 45, pauseSeconds: 15 });
  const [flowMinutes, setFlowMinutes] = useState(45);

  React.useEffect(() => {
    // Required for iOS! Will prompt the user to allow notifications.
    registerForPushNotificationsAsync();
  }, []);

  const navigateTo = (screen) => {
    setPreviousScreen(currentScreen);
    setCurrentScreen(screen);
  };

  // Diese Funktion entscheidet, welches Fenster gezeichnet wird
  const renderScreen = () => {
    switch (currentScreen) {
      case 1: return <Onboarding onNext={() => navigateTo(2)} />;
      case 2: return <ReminderIntervalSetupScreen onBack={() => navigateTo(1)} onNext={() => navigateTo(3)}/>;
      case 3: return <FlowSetupScreen initialFlowMinutes={String(flowMinutes)} onBack={() => navigateTo(2)} onNext={(data) => { if (data && data.flowMinutes) setFlowMinutes(data.flowMinutes); navigateTo(4); }}/>;
      
      // Window 4 (What to expect) -> Goes to 7 (Flower Timer)
      case 4: return <ExerciseInfoScreen onBack={() => navigateTo(3)} onNext={() => navigateTo(7)}/>;
      
      // Window 7 (Flower Timer) -> Goes to 8 (Library)
      case 7: return <TimerActiveScreen autoStart={previousScreen === 4} flowMinutes={flowMinutes} onBack={() => navigateTo(3)} onNext={() => navigateTo(8)} />;
      
      // Window 8 (Library) -> Goes to 5 (Duration Setup)
      case 8: return <ExerciseListScreen onBack={() => navigateTo(7)} onNext={(exerciseId) => { setSelectedExerciseId(exerciseId); navigateTo(5); }} />;
      
      // Window 5 (Duration Setup) -> Goes to 6 (Pause Setup)
      case 5: return <ExerciseDurationSetupScreen initialExerciseSeconds={String(timerSettings.exerciseSeconds)} onBack={() => navigateTo(8)} onNext={(exerciseData) => { setTimerSettings(prev => ({...prev, ...exerciseData})); navigateTo(6); }} />;
      
      // Window 6 (Pause Setup) -> Goes to 9 (Workout)
      case 6: return <PauseTimeScreen initialPauseSeconds={String(timerSettings.pauseSeconds)} exerciseSeconds={timerSettings.exerciseSeconds} onBack={() => navigateTo(5)} onNext={(pauseData) => {setTimerSettings(prev => ({...prev, ...pauseData})); navigateTo(9)}} />;
      
      // Window 9 (Workout) -> Goes to 10 (Praise)
      case 9: return <ExerciseDetailScreen exerciseId={selectedExerciseId} timerSettings={timerSettings} onBack={() => navigateTo(6)} onFinish={() => navigateTo(10)} />;
      
      case 10: return <PraiseScreen onNext={() => navigateTo(11)} again={() => navigateTo(9)}/>;
      case 11: return <DailySuccessScreen onNext={() => navigateTo(1)} />;
      default: return <Onboarding />;
    }
  };

  return (
    <TimerProvider>
      <View style={styles.container}>
        {/* Hier wird das aktive Fenster angezeigt */}
        <View style={styles.screenContainer}>
          {renderScreen()}
        </View>
      </View>
    </TimerProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  screenContainer: {
    flex: 1,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 30,
    paddingTop: 10,
    backgroundColor: '#f5f5f5',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  navText: {
    fontWeight: 'bold',
  }
});
