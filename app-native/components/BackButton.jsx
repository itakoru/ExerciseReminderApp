import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default function BackButton({ onPress, extraStyle }){
  return (
    <TouchableOpacity 
      style={[styles.button, extraStyle]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Ionicons name="chevron-back" size={24} color="#759579"/>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
});