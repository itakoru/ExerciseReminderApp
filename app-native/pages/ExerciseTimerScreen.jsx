import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ExerciseTimeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Fenster 7 (Timer Übungsdauer)</Text>
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