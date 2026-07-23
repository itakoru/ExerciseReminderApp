import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import BackButton from '../components/BackButton';
import Button from '../components/Button';
import TimeInput from '../components/TimeInput';
import { scheduleLocalTimerNotification } from '../services/NotificationService';

export default function ReminderIntervalSetupScreen({ initialFlowMinutes = '60', onBack, onNext }) {
  const [flowMinutes, setFlowMinutes] = useState(initialFlowMinutes)

  const handleFinish = async () => {
    try {
      const minutes = Number(flowMinutes);
      if (minutes > 0) {
        await scheduleLocalTimerNotification(
          minutes * 60, 
          "Daily Exercise Check-in", 
          "Hey! Don't forget to get some exercises in today!", 
          "exercise-reminder" // Unique identifier!
        );
      }
    } catch (e) {
      console.log("Failed to schedule reminder", e);
    }

    if (onNext) {
      onNext({ flowMinutes });
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textBold}>When should I remind{"\n"}you to do your exercises?</Text>
      
      <Text style={[styles.textReg, {marginTop: 50}]}>Remind me</Text>

      <TimeInput initialValue={flowMinutes} onTimeChange={setFlowMinutes} />

      <Text style={[styles.textReg, {marginBottom: 20}]}>Let the flower bloom!</Text>
      
      <Image source={require('../assets/flower/Untitled-3.png')}
      style={styles.image}
      />

      <BackButton
        onPress={onBack}
      />
      <Button
        title="Next" 
        onPress={handleFinish}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '35%',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingBottom: 80, // Padding to avoid hitting the bottom buttons
  },
  textBold: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#233126',
    textAlign: 'center',
  },
  textReg: {
    fontSize: 16,
    fontWeight: '400',
    color: '#667066',
    textAlign: 'center',
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginTop: 10,
  },
});