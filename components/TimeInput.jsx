import React, { useState } from 'react';
import { StyleSheet, TextInput, Text, View } from 'react-native';

export default function TimeInput() {
  const [text, setText] = useState('');

  return (
    <View style={styles.container}>
        <View style={styles.rowContainer}>
            <Text style={styles.unitText}>in</Text>
            <View>
                <TextInput
                style={styles.input}
                placeholder="Schreibe etwas..."
                placeholderTextColor="#999"
                value={text}
                onChangeText={(value) => setText(value)} // Aktualisiert den State
                />
        </View>
        <Text style={styles.unitText}>min</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 100,
    justifyContent: 'center',
  },
  rowContainer: {
    flexDirection: 'row',     
    alignItems: 'center',   
    justifyContent: 'center', 
    width: '100%',
    },
  input: {
    width: 150,
    height: 50,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#759579',
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#333333',
  },
  unitText:{
        fontSize: 16,
        marginLeft: 10, 
        marginRight: 10,          
        color: '#7B7163',
  },
});