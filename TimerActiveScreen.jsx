import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button, Animated } from 'react-native';
import { useTimerContext } from '../context/TimerContext';

export default function TimerActiveScreen({ onNavigate }) {
  const { remainingSeconds, isActive } = useTimerContext();
  
  // A simple pulse animation for the orange background
  const pulseAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!isActive && remainingSeconds === 0) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1, duration: 1000, useNativeDriver: false }),
          Animated.timing(pulseAnim, { toValue: 0, duration: 1000, useNativeDriver: false })
        ])
      ).start();
    } else {
      pulseAnim.setValue(0);
    }
  }, [isActive, remainingSeconds]);

  const isTimerRunning = isActive || remainingSeconds > 0;
  
  const backgroundColor = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#ffffff', '#ffebcc'] // White to light orange
  });

  return (
    <Animated.View style={[styles.container, { backgroundColor: isTimerRunning ? '#fff' : backgroundColor }]}>
      {isTimerRunning ? (
        <>
          <Text style={styles.flower}>🌷</Text>
          <Text style={styles.text}>Flow Timer Running...</Text>
        </>
      ) : (
        <>
          <Text style={styles.flower}>🥀</Text>
          <Text style={styles.text}>Time for a break!</Text>
          <View style={{ marginTop: 40 }}>
            <Button 
              title="Start Exercises" 
              onPress={() => onNavigate && onNavigate(7)} 
              color="#ff9500" 
            />
          </View>
        </>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flower: {
    fontSize: 100,
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});