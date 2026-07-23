import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button';

export default function DailySuccessScreen({ onNext, totalExercises = 0, totalWorkMinutes = 0 }) {
  
  const formatWorkTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins} mins`;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours} hours`;
  };
  
  return (
    <View style={styles.container}>
      <Text style={[styles.text, {fontSize: 40}]}>Excellent</Text>
      <Text style={[styles.text, {marginTop: 15 }]}>Today you have worked</Text>
      <Text style={[styles.text, {marginTop: 15 }]}>{formatWorkTime(totalWorkMinutes)}</Text>
      <Text style={[styles.text, {marginTop: 15 }]}>and done</Text>
      <Text style={[styles.text, {marginTop: 15 }]}>{totalExercises} exercises</Text>
      <Button
      title="Back to the start screen"
      onPress={onNext}
      />
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
    fontWeight: 400,
  },
});