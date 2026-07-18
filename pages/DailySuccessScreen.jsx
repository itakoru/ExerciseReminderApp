import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button';

export default function DailySuccessScreen({ onNext, n }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, {fontSize: 40}]}>Excellent</Text>
      <Text style={[styles.text, {marginTop: 15 }]}>Today you have worked</Text>
      <Text style={[styles.text, {marginTop: 15 }]}>{n} hours</Text>
      <Text style={[styles.text, {marginTop: 15 }]}>and done</Text>
      <Text style={[styles.text, {marginTop: 15 }]}>{n} exercises</Text>
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