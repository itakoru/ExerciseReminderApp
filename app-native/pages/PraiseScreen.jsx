import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button';

export default function PraiseScreen({ onNext, n }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, {fontSize: 40}]}>Excellent</Text>
      <Text style={[styles.text, {marginTop: 15 }]}>You have done</Text>
      <Text style={[styles.text, {marginTop: 15 }]}>{n} exercises</Text>
      <View style={styles.buttonGroup}>
        <Button 
          title="Next" 
          onPress={() => console.log('Next')}
        />
          <Button 
          title="Done for today" 
          onPress={onNext}
        />
      </View>
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
    fontWeight: '400',
  },
  buttonGroup: {
    marginTop: 40,
    width: '100%',
    alignItems: 'center',
    gap: 15,
  }
});