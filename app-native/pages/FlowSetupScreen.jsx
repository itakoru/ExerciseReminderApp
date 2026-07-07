import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function FlowSetupScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Flow Fenster (Timer)</Text>
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