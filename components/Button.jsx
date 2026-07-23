import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function Button({ title, onPress, extraStyle, shadowColor, hasShadow }){

const shadowStyles = hasShadow ? {
    // --- iOS Schatten ---
    shadowColor: shadowColor || '#759579', 
    shadowOffset: { width: 0, height: 6 }, 
    shadowOpacity: 0.8,                    
    shadowRadius: 15,                       
    
    // --- Android Schatten ---
    elevation: 8,                          
  } : {};

  return (
    <TouchableOpacity 
      style={[styles.button, extraStyle, shadowStyles]}
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