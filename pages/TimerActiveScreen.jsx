import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button, Animated, Image } from 'react-native';
import { useTimerContext } from '../context/TimerContext';

export default function TimerActiveScreen({ onNavigate }) {
  const { remainingSeconds, totalSeconds, isActive, stopTimer } = useTimerContext();
  
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

  const isTimerRunning = isActive || remainingSeconds > 0;
  
  const backgroundColor = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#ffffff', '#ffebcc'] // White to light orange
  });

  return (
    <Animated.View style={[styles.container, { backgroundColor: isTimerRunning ? '#fff' : backgroundColor }]}>
      {isTimerRunning ? (
        <>
          <Image source={getFlowerImage()} style={styles.flowerImage} />
          <Text style={styles.text}>Flow Timer Running...</Text>
          <View style={{ marginTop: 40 }}>
            <Button 
              title="Cancel Timer" 
              onPress={() => {
                stopTimer();
                if (onNavigate) onNavigate(1); // Go back to setup screen
              }} 
              color="#ff3b30" // Red color for cancel
            />
          </View>
        </>
      ) : (
        <>
          <Image source={getFlowerImage()} style={styles.flowerImage} />
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
});