import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import BackButton from '../components/BackButton';
import Button from '../components/Button';
import Dropdown from '../components/Dropdown';
import TimeInput from '../components/TimeInput';

export default function FlowSetupScreen({ initialSnoozeMinutes = '15', onNext, onBack }) {
  const [snoozeMinutes, setSnoozeMinutes] = useState(initialSnoozeMinutes);

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { textAlign: 'center' }]}>When can I remind you{"\n"}in your flow state?</Text>

      <Text style={{ fontSize: 16, color: '#7B7163', marginTop: 50 }}>Remind me again in</Text>
      <TimeInput initialValue={snoozeMinutes} onTimeChange={setSnoozeMinutes} />

      <Button
        title="Next"
        onPress={() => onNext && onNext({ snoozeMinutes })}
      />

      <BackButton
        onPress={onBack}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '35%',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingBottom: 80,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#233126',
  },
});