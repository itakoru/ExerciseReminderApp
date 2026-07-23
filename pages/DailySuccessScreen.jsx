import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
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
      <Text style={[styles.textBold]}>Excellent</Text>
      <Text style={[styles.textReg, {marginTop: 15 }]}>Today you have worked</Text>
      <Text style={[styles.textReg, styles.textHigh, {marginTop: 15 }]}>{formatWorkTime(totalWorkMinutes)}</Text>
      <Text style={[styles.textReg, {marginTop: 15 }]}>and done</Text>
      <Text style={[styles.textReg, styles.textHigh, {marginTop: 15 }]}>{totalExercises} exercises</Text>
      
      <Image
        source={require('../assets/flower/Untitled-10.png')}
        style={styles.image}
      />
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 100
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginTop: 160,
  },
  textBold: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#233126',
    textAlign: 'center',
  },
  textReg: {
    fontSize: 20,
    fontWeight: '400',
    color: '#667066',
    textAlign: 'center',
  },
  textHigh: {
    backgroundColor: '#BBF0C1',
    paddingHorizintal: 1,
    borderRadius: 4
  }
});