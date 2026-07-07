import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function DailySuccessScreen() {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, {fontSize: 40}]}>Excellent</Text>
      <Text style={[styles.text, {marginTop: 15 }]}>Today you have worked</Text>
      <Text style={[styles.text, {marginTop: 15 }]}>n hours</Text>
      <Text style={[styles.text, {marginTop: 15 }]}>and done</Text>
      <Text style={[styles.text, {marginTop: 15 }]}>n exercises</Text>
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