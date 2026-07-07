import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function ExerciseTimerScreen({ onNavigate }) {
  // Dynamic variables (to be set by factors TBA)
  const DYNAMIC_EXERCISE_DURATION = 60; // e.g., 60 seconds
  const TOTAL_SETS = 3;

  const [currentSet, setCurrentSet] = useState(1);
  const [timeLeft, setTimeLeft] = useState(DYNAMIC_EXERCISE_DURATION);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      clearInterval(interval);
      setIsActive(false);
      
      // Auto-increment set logic
      if (currentSet < TOTAL_SETS) {
        setCurrentSet(s => s + 1);
        setTimeLeft(DYNAMIC_EXERCISE_DURATION); // Reset timer for next set
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, currentSet]);

  const handleStartSet = () => setIsActive(true);
  
  const isFinishedAllSets = currentSet === TOTAL_SETS && timeLeft === 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Backward Shoulder Circles</Text>
      
      <View style={styles.timerCircle}>
        <Text style={styles.timerText}>{timeLeft}</Text>
        <Text style={styles.timerSub}>sec</Text>
      </View>

      <Text style={styles.setCounter}>{currentSet} / {TOTAL_SETS} exercises</Text>

      <View style={styles.controls}>
        {isFinishedAllSets ? (
          <Button title="Finish Exercise!" onPress={() => onNavigate && onNavigate(9)} color="#4CAF50" />
        ) : (
          <Button 
            title={isActive ? "Pause" : "Start Set"} 
            onPress={() => setIsActive(!isActive)} 
            color={isActive ? "#ff9500" : "#007AFF"}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 80,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 60,
  },
  timerCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  timerText: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#333',
  },
  timerSub: {
    fontSize: 18,
    color: '#666',
  },
  setCounter: {
    fontSize: 18,
    color: '#666',
    marginBottom: 40,
  },
  controls: {
    marginTop: 20,
    minWidth: 200,
  }
});