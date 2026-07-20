import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

export default function ExerciseFilter({ value, onChangeText }) {
  return (
    // shows the search field
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder="Search by exercise, body part, or type"
      placeholderTextColor="#7a7a7a"
      style={styles.input}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#d7d7d7',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 11,
    marginBottom: 16,
    backgroundColor: '#fafafa',
  },
});
