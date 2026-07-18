import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function Button({ title, onPress, extraStyle }){
  return (
    <TouchableOpacity 
      style={[styles.button, extraStyle]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position:'absolute',
    bottom: 30,
    backgroundColor: '#759579',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    width: '70%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});