import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Button from '../components/Button';

export default function Onboarding({ onNext }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.textBold, styles.abstand]}>Welcome to {"\n"} Your Back Health Journey</Text>
      <Text style={[styles.textReg, styles.abstand]}>I am an app designed to promote {"\n"} your back health</Text>
      <Text style={[styles.textReg, styles.abstand]}>Simply pick your {"\n"} focus time and exercise intrervals {"\n"} and do whatever you want</Text>
      <Image source={require('../assets/flower/Untitled-11.png')}
      style={styles.image}
      />
      <Text style={[styles.textBold, styles.abstand, { marginTop: 15 }]}>Your Flower is You</Text>
      <Text style={[styles.textReg, styles.abstand]}>The timer runs in the backround {"\n"} and will ring when it is time. {"\n"} Do an exercise and {"\n"} see your flower bloom again!</Text>
      <Button 
        title="Start" 
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
    backgroundColor: '#F7F5F2',
  },
  textBold: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#737373',
    textAlign: 'center',
  },
  textReg: {
    fonsize: 20,
    fontWeight: '400',
    color: '#CCCCCC',
    textAlign: 'center',
  },
  abstand: {
    marginBottom: 15,
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  }
});