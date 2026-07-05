import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { useTimerContext } from '../context/TimerContext';
import TimePicker from '../components/TimePicker';

export default function FlowSetupScreen({ onNavigate }) {
  const { startTimer } = useTimerContext();
  const [selectedSeconds, setSelectedSeconds] = useState(25 * 60);

  const handleStart = () => {
    startTimer(selectedSeconds);
    if (onNavigate) onNavigate(6);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello!</Text>
      <Text style={styles.subtitle}>What are your preferences today?</Text>
      
      <Text style={styles.label}>When should I remind you?</Text>
      
      <View style={styles.pickerWrapper}>
        <TimePicker initialSeconds={selectedSeconds} onChange={setSelectedSeconds} />
      </View>
      
      <View style={styles.nextButtonContainer}>
        <Button title="Start Flow Timer" onPress={handleStart} color="#007AFF" />
        <View style={{ marginTop: 10 }}>
          <Button 
            title="🛠️ Test Notification (10s)" 
            onPress={() => {
              startTimer(10);
              if (onNavigate) onNavigate(6);
            }} 
            color="#A9A9A9" 
          />
        </View>
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
    textAlign: 'center',
  },
  pickerWrapper: {
    marginBottom: 40,
  },
  nextButtonContainer: {
    marginTop: 20,
    borderRadius: 8,
    overflow: 'hidden',
  }
});