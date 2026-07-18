import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import BackButton from '../components/BackButton';
import Button from '../components/Button';
import TimeInput from '../components/TimeInput';

export default function ExerciseDurationSetupScreen({ onBack, onNext }) {
  return (
    <View style={styles.container}>
      <Text style={styles.textBold}>When should I remind{"\n"}you for your exercise?</Text>
      
      <Text style={[styles.textReg, {marginTop: 50}]}>Remind</Text>

      <TimeInput/>

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