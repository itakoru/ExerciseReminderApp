import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useTimerContext } from '../context/TimerContext';

export default function FlowSetupScreen({ onNavigate }) {
  const { startTimer } = useTimerContext();
  const [selectedSeconds, setSelectedSeconds] = useState(25 * 60); // default 25 mins

  const handleStart = () => {
    startTimer(selectedSeconds);
    if (onNavigate) onNavigate(6); // Go to Window 6 (Flower screen)
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello!</Text>
      <Text style={styles.subtitle}>What are your preferences today?</Text>
      
      <Text style={styles.label}>When should I remind you?</Text>
      
      <View style={styles.buttonRow}>
        <Button 
          title="10s (Test)" 
          onPress={() => setSelectedSeconds(10)} 
          color={selectedSeconds === 10 ? "#007AFF" : "#A9A9A9"} 
        />
        <Button 
          title="25 min" 
          onPress={() => setSelectedSeconds(25 * 60)} 
          color={selectedSeconds === 25 * 60 ? "#007AFF" : "#A9A9A9"} 
        />
        <Button 
          title="60 min" 
          onPress={() => setSelectedSeconds(60 * 60)} 
          color={selectedSeconds === 60 * 60 ? "#007AFF" : "#A9A9A9"} 
        />
      </View>
      
      <View style={styles.nextButtonContainer}>
        <Button title="Next" onPress={handleStart} color="#4CAF50" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  nextButtonContainer: {
    marginTop: 20,
  }
});