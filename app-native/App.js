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
import ExerciseTimerScreen from './pages/ExerciseTimerScreen';
import ExerciseDetailScreen from './pages/ExerciseDetailScreen';
import PraiseScreen from './pages/PraiseScreen';
import DailySuccessScreen from './pages/DailySuccessScreen';

export default function App() {
  // TIPP: Ändere die Zahl hier (1 bis 11), um das jeweilige Fenster live zu sehen!
  const [currentScreen, setCurrentScreen] = useState(1);

  // Diese Funktion entscheidet, welches Fenster gezeichnet wird
  const renderScreen = () => {
    switch (currentScreen) {
      case 1: return <Onboarding onNext={() => setCurrentScreen(2)} />;
      case 2: return <ExerciseDurationSetupScreen onBack={() => setCurrentScreen(1)} onNext={() => setCurrentScreen(3)}/>;
      case 3: return <FlowSetupScreen />;
      case 4: return <ExerciseListScreen />;
      case 5: return <ExerciseInfoScreen />; 
      case 6: return <ReminderIntervalSetupScreen />;
      case 7: return <TimerActiveScreen />;
      case 8: return <ExerciseTimerScreen />;
      case 9: return <ExerciseDetailScreen />;
      case 10: return <PraiseScreen onNext={() => setCurrentScreen(11)} again={() => setCurrentScreen(7)}/>;
      case 11: return <DailySuccessScreen onNext={() => setCurrentScreen(1)} />;
      default: return <Onboarding />;
    }
  };

  return (
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
          onPress={() => setCurrentScreen(currentScreen - 1)} 
        />
        <Text style={styles.navText}>Fenster: {currentScreen} / 11</Text>
        <Button 
          title="Weiter" 
          disabled={currentScreen === 11} 
          onPress={() => setCurrentScreen(currentScreen + 1)} 
        />
      </View>
    </View>
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