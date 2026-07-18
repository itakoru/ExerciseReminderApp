import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button'
import BackButton from '../components/BackButton';

export default function ExerciseTimeScreen({ onNext, onBack }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>How long should your exercise be?</Text>

      <Button 
      title="Next"
      onPress={ onNext }/>

      <BackButton 
      onPress={ onBack }/>

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