import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function TimePicker({ initialSeconds = 1500, onChange }) {
  // We use string states for the text inputs to handle padding and typing easily
  const [hours, setHours] = useState(Math.floor(initialSeconds / 3600).toString().padStart(2, '0'));
  const [minutes, setMinutes] = useState(Math.floor((initialSeconds % 3600) / 60).toString().padStart(2, '0'));

  const [isHoursFocused, setIsHoursFocused] = useState(false);
  const [isMinutesFocused, setIsMinutesFocused] = useState(false);

  const minutesRef = useRef(null);

  // Sync state upward whenever values change
  useEffect(() => {
    const h = parseInt(hours || '0', 10);
    const m = parseInt(minutes || '0', 10);
    const totalSeconds = (h * 3600) + (m * 60);
    if (onChange) onChange(totalSeconds);
  }, [hours, minutes]);

  const handleHoursChange = (text) => {
    // Only allow numbers
    const numeric = text.replace(/[^0-9]/g, '');
    setHours(numeric);
    // Auto-advance to minutes if 2 digits are typed
    if (numeric.length === 2) {
      minutesRef.current?.focus();
    }
  };

  const handleMinutesChange = (text) => {
    const numeric = text.replace(/[^0-9]/g, '');
    setMinutes(numeric);
  };

  const handleBlur = () => {
    // On blur, format the text beautifully
    let h = parseInt(hours || '0', 10);
    let m = parseInt(minutes || '0', 10);
    
    // Standard timer logic: minutes shouldn't exceed 59 in a clock display
    if (m > 59) m = 59;
    
    setHours(h.toString().padStart(2, '0'));
    setMinutes(m.toString().padStart(2, '0'));
  };

  return (
    <View style={styles.container}>
      {/* HOURS FIELD */}
      <View style={styles.column}>
        <View style={[styles.inputWrapper, isHoursFocused && styles.inputWrapperFocused]}>
          <TextInput
            style={[styles.input, isHoursFocused && styles.inputFocused]}
            keyboardType="number-pad"
            maxLength={2}
            value={hours}
            onChangeText={handleHoursChange}
            onFocus={() => { setIsHoursFocused(true); setHours(''); }}
            onBlur={() => { setIsHoursFocused(false); handleBlur(); }}
            selectTextOnFocus
          />
        </View>
        <Text style={[styles.label, isHoursFocused && styles.labelFocused]}>HOURS</Text>
      </View>
      
      <Text style={styles.colon}>:</Text>

      {/* MINUTES FIELD */}
      <View style={styles.column}>
        <View style={[styles.inputWrapper, isMinutesFocused && styles.inputWrapperFocused]}>
          <TextInput
            ref={minutesRef}
            style={[styles.input, isMinutesFocused && styles.inputFocused]}
            keyboardType="number-pad"
            maxLength={2}
            value={minutes}
            onChangeText={handleMinutesChange}
            onFocus={() => { setIsMinutesFocused(true); setMinutes(''); }}
            onBlur={() => { setIsMinutesFocused(false); handleBlur(); }}
            selectTextOnFocus
          />
        </View>
        <Text style={[styles.label, isMinutesFocused && styles.labelFocused]}>MINUTES</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  column: {
    alignItems: 'center',
  },
  inputWrapper: {
    backgroundColor: '#FAFAFA',
    borderWidth: 2,
    borderColor: '#EEEEEE',
    borderRadius: 16,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputWrapperFocused: {
    backgroundColor: '#E6F4FE',
    borderColor: '#007AFF',
  },
  input: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#A9A9A9',
    textAlign: 'center',
    width: '100%',
    height: '100%',
  },
  inputFocused: {
    color: '#007AFF',
  },
  colon: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#A9A9A9',
    marginHorizontal: 15,
    paddingBottom: 25,
  },
  label: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '600',
    color: '#A9A9A9',
  },
  labelFocused: {
    color: '#007AFF',
  }
});
