import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BackButton from '../components/BackButton';
import Button from '../components/Button';
import Dropdown from '../components/Dropdown';

export default function FlowSetupScreen({ onNext, onBack }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>When can I remind you in your flow state?</Text>

      <Dropdown

      />

      <Button 
      title="Next"
      onPress={ onNext }
      />

      <BackButton
      onPress={ onBack }
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
    fontWeight: 'bold',
  },
});