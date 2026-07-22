import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Button from '../components/Button';
import BackButton from '../components/BackButton';

// The posture sequence: Head Down -> Arched Back -> Straight -> (Loop to Head Down)
const POSTURE_FRAMES = [
  require('../assets/flower/Untitled-7.png'), // Head Down
  require('../assets/flower/Untitled-8.png'), // Arched Back
  require('../assets/flower/Untitled-3.png'), // Straight
];

export default function PreFlowScreen({ reminderTimestamp, onBack, onStartFlow, onCancel }) {
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [frameIndex, setFrameIndex] = useState(0);

  // 1. The Countdown Engine
  useEffect(() => {
    if (!reminderTimestamp) return;

    const calculateTime = () => {
      const now = Date.now();
      const diffInSeconds = Math.floor((reminderTimestamp - now) / 1000);
      if (diffInSeconds <= 0) {
        setRemainingSeconds(0);
        // Optional: We could auto-start the flow here, but we'll rely on the notification click
        // to be safe and avoid jumping the screen while their phone is in their pocket.
      } else {
        setRemainingSeconds(diffInSeconds);
      }
    };

    calculateTime(); // Initial run
    const intervalId = setInterval(calculateTime, 1000);

    return () => clearInterval(intervalId);
  }, [reminderTimestamp]);

  // 2. The "Industrial" Posture Animation Engine (2 seconds per frame)
  useEffect(() => {
    const animationId = setInterval(() => {
      setFrameIndex((prevIndex) => (prevIndex + 1) % POSTURE_FRAMES.length);
    }, 2000); // 2 seconds per frame

    return () => clearInterval(animationId);
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${String(s).padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textBold}>This is you.{"\n"}You haven't reached your flow state yet.</Text>
      
      <Text style={[styles.textReg, styles.abstand]}>
        Try again in {remainingSeconds > 0 ? formatTime(remainingSeconds) : '0:00'} minutes.{"\n"}
        You can close the app in the meantime,{"\n"}we will message you.
      </Text>

      <Image 
        source={POSTURE_FRAMES[frameIndex]}
        style={styles.image}
      />

      <BackButton onPress={onBack} />
      
      <Button 
        title="Start Flow Now" 
        onPress={onStartFlow}
        extraStyle={styles.failsafeButton}
      />
      
      {onCancel && (
        <Text style={styles.cancelText} onPress={onCancel}>
          Cancel Timer
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '35%',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingBottom: 80,
  },
  textBold: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#233126',
    textAlign: 'center',
    marginBottom: 20,
  },
  textReg: {
    fontSize: 16,
    fontWeight: '400',
    color: '#7B7163',
    textAlign: 'center',
    lineHeight: 24,
  },
  abstand: {
    marginBottom: 40,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginTop: 20,
  },
  failsafeButton: {
    position: 'absolute',
    bottom: 80,
    backgroundColor: '#e6cfa3',
  },
  cancelText: {
    position: 'absolute',
    bottom: 40,
    fontSize: 16,
    color: '#a39887',
    textDecorationLine: 'underline',
  }
});
