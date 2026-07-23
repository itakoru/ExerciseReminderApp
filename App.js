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
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  // TIPP: Ändere die Zahl hier (1 bis 11), um das jeweilige Fenster live zu sehen!
  const [currentScreen, setCurrentScreen] = useState(1);
  const [previousScreen, setPreviousScreen] = useState(null);
  const [selectedExerciseId, setSelectedExerciseId] = useState(undefined);
  const [timerSettings, setTimerSettings] = useState({ exerciseSeconds: 45, pauseSeconds: 15 });
  const [flowMinutes, setFlowMinutes] = useState('60');
  const [snoozeMinutes, setSnoozeMinutes] = useState('15');
  const [hasSnoozed, setHasSnoozed] = useState(false);
  const [isBooting, setIsBooting] = useState(true);
  
  // Track if we just booted via a notification tap
  const [didColdStartFromNotification, setDidColdStartFromNotification] = useState(false);

  const notificationResponse = Notifications.useLastNotificationResponse();

  React.useEffect(() => {
    // Required for iOS! Will prompt the user to allow notifications.
    registerForPushNotificationsAsync();
    
    // Boot Engine: Read from Hard Drive
    const loadState = async () => {
      try {
        const savedSettings = await AsyncStorage.getItem('timerSettings');
        if (savedSettings) setTimerSettings(JSON.parse(savedSettings));

        const savedFlow = await AsyncStorage.getItem('flowMinutes');
        if (savedFlow) setFlowMinutes(savedFlow);

        const savedSnooze = await AsyncStorage.getItem('snoozeMinutes');
        if (savedSnooze) setSnoozeMinutes(savedSnooze);

        const savedHasSnoozed = await AsyncStorage.getItem('hasSnoozed');
        if (savedHasSnoozed) setHasSnoozed(savedHasSnoozed === 'true');

        const savedTimerEnd = await AsyncStorage.getItem('activeFlowTimerEnd');
        const parsedTimerEnd = savedTimerEnd ? Number(savedTimerEnd) : null;

        const now = Date.now();

        // Check if we booted directly from a notification tap (which means timer expired)
        const wasNotificationTapped = notificationResponse?.notification.request.identifier === 'default-timer';

        if (wasNotificationTapped) {
          // Scenario 1: Teleported via Notification
          setDidColdStartFromNotification(true);
          setCurrentScreen(7);
          setPreviousScreen(4); // Fakes coming from setup so autoStart works if needed (though it's at 0)
        } else if (parsedTimerEnd && parsedTimerEnd > now) {
          // Scenario 2: A Flow Timer is actively running!
          setCurrentScreen(7);
          setPreviousScreen(4); // simulate arriving via flow
        }

      } catch (e) {
        console.log("Failed to load state", e);
      } finally {
        setIsBooting(false);
      }
    };
    
    loadState();
  }, []);

  // Persist State when it changes
  React.useEffect(() => {
    if (!isBooting) {
      AsyncStorage.setItem('timerSettings', JSON.stringify(timerSettings));
    }
  }, [timerSettings, isBooting]);

  React.useEffect(() => {
    if (!isBooting) {
      AsyncStorage.setItem('flowMinutes', flowMinutes);
    }
  }, [flowMinutes, isBooting]);

  React.useEffect(() => {
    if (!isBooting) {
      AsyncStorage.setItem('snoozeMinutes', snoozeMinutes);
    }
  }, [snoozeMinutes, isBooting]);

  React.useEffect(() => {
    if (!isBooting) {
      AsyncStorage.setItem('hasSnoozed', String(hasSnoozed));
    }
  }, [hasSnoozed, isBooting]);

  // Listen for background notification taps AFTER boot
  React.useEffect(() => {
    if (!isBooting && !didColdStartFromNotification && notificationResponse?.notification.request.identifier === 'default-timer') {
      // The user clicked the notification while app was in background
      setPreviousScreen(4);
      setCurrentScreen(7);
    }
  }, [notificationResponse, isBooting, didColdStartFromNotification]);

  const navigateTo = (screen) => {
    setPreviousScreen(currentScreen);
    setCurrentScreen(screen);
  };

  if (isBooting) {
    return <View style={styles.container} />; // Blank screen while loading hard drive
  }

  // Diese Funktion entscheidet, welches Fenster gezeichnet wird
  const renderScreen = () => {
    switch (currentScreen) {
      case 1: return <Onboarding onNext={() => navigateTo(2)} />;
      case 2: return <ReminderIntervalSetupScreen initialFlowMinutes={flowMinutes} onBack={() => navigateTo(1)} onNext={(data) => { if (data?.flowMinutes) setFlowMinutes(data.flowMinutes); navigateTo(3); }}/>;
      case 3: return <FlowSetupScreen initialSnoozeMinutes={snoozeMinutes} onBack={() => navigateTo(2)} onNext={(data) => { 
        if (data && data.snoozeMinutes) setSnoozeMinutes(data.snoozeMinutes); 
        navigateTo(4); 
      }}/>;
      
      // Window 4 (What to expect) -> Goes to 7 (Flow Timer)
      case 4: return <ExerciseInfoScreen onBack={() => navigateTo(3)} onNext={() => {
        navigateTo(7);
      }}/>;

      // Window 7 (Flower Timer) -> Goes to 8 (Library). Back goes to 4.
      case 7: return <TimerActiveScreen 
        autoStart={previousScreen === 4 || previousScreen === 10} 
        flowMinutes={flowMinutes} 
        snoozeMinutes={snoozeMinutes} 
        hasSnoozed={hasSnoozed}
        onBack={() => navigateTo(4)} 
        onCancel={() => { setHasSnoozed(false); navigateTo(1); }} 
        onNext={() => { setHasSnoozed(false); navigateTo(8); }}
        onSnooze={() => setHasSnoozed(true)} 
      />;
      
      // Window 8 (Library) -> Goes to 5 (Duration Setup)
      case 8: return <ExerciseListScreen onBack={() => navigateTo(7)} onNext={(exerciseId) => { setSelectedExerciseId(exerciseId); navigateTo(5); }} />;
      
      // Window 5 (Duration Setup) -> Goes to 6 (Pause Setup)
      case 5: return <ExerciseDurationSetupScreen initialExerciseSeconds={String(timerSettings.exerciseSeconds)} onBack={() => navigateTo(8)} onNext={(exerciseData) => { setTimerSettings(prev => ({...prev, ...exerciseData})); navigateTo(6); }} />;
      
      // Window 6 (Pause Setup) -> Goes to 9 (Workout)
      case 6: return <PauseTimeScreen initialPauseSeconds={String(timerSettings.pauseSeconds)} exerciseSeconds={timerSettings.exerciseSeconds} onBack={() => navigateTo(5)} onNext={(pauseData) => {setTimerSettings(prev => ({...prev, ...pauseData})); navigateTo(9)}} />;
      
      // Window 9 (Workout) -> Goes to 10 (Praise)
      case 9: return <ExerciseDetailScreen exerciseId={selectedExerciseId} timerSettings={timerSettings} onBack={() => navigateTo(6)} onFinish={() => navigateTo(10)} />;
      
      case 10: return <PraiseScreen onNext={() => navigateTo(11)} again={() => navigateTo(7)}/>;
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

        {/* Eine kleine Steuerungsleiste am unteren Bildschirmrand zum Durchschalten */}
        <View style={styles.navBar}>
          <Button 
            title="Zurück" 
            disabled={currentScreen === 1} 
            onPress={() => navigateTo(currentScreen - 1)} 
          />
          <Text style={styles.navText}>Fenster: {currentScreen} / 12</Text>
          <Button 
            title="Weiter" 
            disabled={currentScreen === 12} 
            onPress={() => navigateTo(currentScreen + 1)} 
          />
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
