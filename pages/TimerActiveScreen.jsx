import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Animated, Image } from 'react-native';
import { useTimerContext } from '../context/TimerContext';
import Button from '../components/Button';
import BackButton from '../components/BackButton';

export default function TimerActiveScreen({ autoStart = false, flowMinutes = 45, snoozeMinutes = 15, hasSnoozed = false, onBack, onCancel, onNext, onSnooze }) {
  const { remainingSeconds, totalSeconds, isActive, startTimer, stopTimer } = useTimerContext();
  
  const getFlowerImage = () => {
    // If we have no total seconds yet or the timer is done
    if (!totalSeconds || remainingSeconds === 0) return require('../assets/flower/Untitled-9.png');
    
    const progress = remainingSeconds / totalSeconds;
    
    if (progress > 0.66) return require('../assets/flower/Untitled-3.png');
    if (progress > 0.33) return require('../assets/flower/Untitled-8.png');
    if (progress > 0) return require('../assets/flower/Untitled-7.png');
    
    return require('../assets/flower/Untitled-9.png');
  };
  
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

  // Start the timer automatically when the screen mounts (with a 300ms delay for smooth transition)
  useEffect(() => {
    // ONLY auto-start if we explicitly arrived from Window 4
    if (autoStart && !isActive && remainingSeconds === 0) {
      const timerId = setTimeout(() => {
        startTimer(Number(flowMinutes) * 60);
      }, 300);
      return () => clearTimeout(timerId);
    }
  }, [autoStart]);

  const isTimerRunning = isActive || remainingSeconds > 0;
  
  const backgroundColor = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#ffffff', '#ffebcc'] // White to light orange
  });

  return (
    <Animated.View style={[styles.container, { backgroundColor: isTimerRunning ? '#fff' : backgroundColor }]}>
      <BackButton onPress={onBack} />
      
      {isTimerRunning ? (
        <>
          <Image source={getFlowerImage()} style={styles.flowerImage} />
          <Text style={styles.text}>Timer is running...</Text>
          <Text style={styles.timerText}>
            {Math.floor(remainingSeconds / 60)}:{String(remainingSeconds % 60).padStart(2, '0')}
          </Text>
          <View style={{ marginTop: 40, width: '100%', alignItems: 'center' }}>
            <Button 
              title="Cancel Timer" 
              onPress={() => {
                stopTimer();
                if (onCancel) onCancel(); 
              }} 
              extraStyle={{ position: 'relative', bottom: 0, backgroundColor: '#b84d4d' }}
            />
          </View>
        </>
      ) : (
        <>
          <Image source={getFlowerImage()} style={styles.flowerImage} />
          <Text style={styles.text}>Time for a break!</Text>
          <View style={{ marginTop: 40, width: '100%', alignItems: 'center' }}>
            <Button 
              title="Start Exercises" 
              onPress={() => onNext && onNext()} 
              extraStyle={{ position: 'relative', bottom: 0, width: '80%' }}
            />
            {!hasSnoozed && (
              <Button 
                title="Enter Flow"
                onPress={() => {
                  if (onSnooze) onSnooze();
                  startTimer(Number(snoozeMinutes) * 60);
                }} 
                extraStyle={{ position: 'relative', bottom: 0, marginTop: 15, width: '80%', backgroundColor: '#e6cfa3' }}
              />
            )}
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
  flowerImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  timerText: {
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#5e8a63',
    fontVariant: ['tabular-nums'],
  },
});