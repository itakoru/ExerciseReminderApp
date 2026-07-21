import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BackButton from '../components/BackButton';
import Button from '../components/Button';

export default function ReminderIntervalSetupScreen({ onBack, onNext }) {
  const [reminderTime, setReminderTime] = useState('14:00')

  const handleFunish = () => {
    if (onNext) {
      onNext({ reminderTime: reminderTime })
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textBold}>When should I remind{"\n"}you for your exercise?</Text>
      
      <Text style={[styles.textReg, {marginBottom: 50}]}>Let the flower blooming</Text>
      
      <TimeInput onTimeChange={(newTime) => setReminderTime(newTime)} />

      <Text style={[styles.textReg, {marginBottom: 50}]}>Let the flower blooming</Text>
      
      <Image source={require('../assets/flower/Untitled-3.png')}
      style={styles.image}
      />

      <BackButton
        onPress={onBack}
      />
      <Button
        title="Next" 
        onPress={onNext}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  textBold: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#736655',
    textAlign: 'center',
  },
  textReg: {
    fonsize: 16,
    fontWeight: '400',
    color: '#7B7163',
    textAlign: 'center',
  },
  image: {
    marginBottom: 50,
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
});