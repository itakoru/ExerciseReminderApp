import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BackButton from '../components/BackButton';
import Button from '../components/Button';

export default function ReminderIntervalSetupScreen({ onBack, onNext }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>When should I remind you for your exercise?</Text>
      
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
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
