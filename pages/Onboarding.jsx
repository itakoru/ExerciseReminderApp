import React from 'react';
import { StyleSheet, Text, View, Image, Platform, Alert } from 'react-native';
import Button from '../components/Button';
import * as Battery from 'expo-battery';
import * as IntentLauncher from 'expo-intent-launcher';
import * as Application from 'expo-application';

export default function Onboarding({ onNext }) {
  const handleStart = async () => {
    try {
      if (Platform.OS === 'android') {
        const isRestricted = await Battery.isBatteryOptimizationEnabledAsync();
        
        if (isRestricted) {
          Alert.alert(
            "Background Timers",
            "To make sure your flower timer works while your phone is locked, please disable Battery Optimization for this app on the next screen.",
            [
              {
                text: "Got it!",
                onPress: async () => {
                  try {
                    await IntentLauncher.startActivityAsync(
                      IntentLauncher.ActivityAction.REQUEST_IGNORE_BATTERY_OPTIMIZATIONS,
                      { data: 'package:' + Application.applicationId }
                    );
                    
                    // The Double Check!
                    const stillRestricted = await Battery.isBatteryOptimizationEnabledAsync();
                    if (stillRestricted) {
                      Alert.alert("Permission Required", "You must allow background execution so your timers don't break!");
                    } else {
                      onNext();
                    }
                  } catch (e) {
                    console.log("Failed to launch intent", e);
                    onNext();
                  }
                }
              }
            ]
          );
          return; // Stop here, wait for them to click "Got it!"
        }
      }
    } catch (error) {
      console.log("Error checking async storage", error);
    }
    
    // If they already saw it, or not on Android, just go next
    onNext();
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.textBold, styles.abstand]}>Welcome to {"\n"} Your Back Health Journey</Text>
      <Text style={[styles.textReg, styles.abstand]}>I am an app designed to promote {"\n"} your back health</Text>
      <Text style={[styles.textReg, styles.abstand]}>Simply pick your {"\n"} focus time and exercise intervals {"\n"} and do whatever you want</Text>
      <Image source={require('../assets/flower/Untitled-11.png')}
      style={styles.image}
      />
      <Text style={[styles.textBold, styles.abstand, { marginTop: 15 }]}>Your Flower is You</Text>
      <Text style={[styles.textReg, styles.abstand]}>The timer runs in the background {"\n"} and will ring when it is time. {"\n"} Do an exercise and {"\n"} see your flower bloom again!</Text>
      <Text style={styles.disclaimer}>This app does not replace professional medical advice.</Text>
      <Button 
        title="Start" 
        onPress={handleStart}
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
    color: '#233126',
    textAlign: 'center',
  },
  textReg: {
    fontSize: 20,
    fontWeight: '400',
    color: '#667066',
    textAlign: 'center',
  },
  abstand: {
    marginBottom: 15,
  },
  image: {
    marginTop: 30,
    marginBottom: 30,
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  disclaimer: {
  fontSize: 11,
  color: '#667066',
  marginTop: 230,
}
});