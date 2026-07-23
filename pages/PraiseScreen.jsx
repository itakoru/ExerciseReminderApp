import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button';

export default function PraiseScreen({ onNext, n, again }) { 

  return (
    <View style={styles.container}>
      <Text style={[styles.textBold]}>Excellent</Text>
      <Text style={[styles.textReg, {marginTop: 15 }]}>You have done</Text>
      <Text style={[styles.textReg, {marginTop: 15 }]}>{n} exercises</Text>
      

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
    justifyContent: 'flex-center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 100
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
  topBottom: {
    bottom: 90,
  },
  bottomButton: {
    backgroundColor: '#607062'
  }
});