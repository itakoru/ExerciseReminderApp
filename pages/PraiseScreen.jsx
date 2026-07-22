import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button';

export default function PraiseScreen({ onNext, n, again }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, {fontSize: 40}]}>Excellent</Text>
      <Text style={[styles.text, {marginTop: 15 }]}>You have done</Text>
      <Text style={[styles.text, {marginTop: 15 }]}>{n} exercises</Text>
      
        <Button 
          title="Next" 
          onPress={again}
          extraStyle={styles.topBottom}
        />
          <Button 
          title="Done for today" 
          onPress={onNext}
          extraStyle={styles.bottomButton}
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
    fontWeight: '400',
  },
  topBottom: {
    bottom: 90,
  },
  bottomButton: {
    backgroundColor: '#607062'
  }
});