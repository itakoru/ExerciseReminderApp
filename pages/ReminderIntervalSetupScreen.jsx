import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import BackButton from '../components/BackButton';
import Button from '../components/Button';
import TimeInput from '../components/TimeInput';

export default function ReminderIntervalSetupScreen({ initialFlowMinutes = '60', onBack, onNext }) {
  const [flowMinutes, setFlowMinutes] = useState(initialFlowMinutes)

  const handleFinish = async () => {
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
    color: '#7B7163',
    textAlign: 'center',
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginTop: 10,
  },
});