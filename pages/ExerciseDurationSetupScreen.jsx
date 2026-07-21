import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import BackButton from '../components/BackButton';
import Button from '../components/Button';
import Dropdown from '../components/Dropdown';

export default function ExerciseDurationSetupScreen({ onBack, onNext }) {
  // diese Werte kann die Person im Formular ändern
  const [exerciseSeconds, setExerciseSeconds] = useState('45');
  
  const exerciseOptions = ['15', '30', '45', '60', '90', '120'];

  return (
    <View style={styles.container}>
      <BackButton onPress={onBack} />
        <Text style={styles.title}>Set your timer</Text>
        <Text style={styles.subtitle}>Choose how long each one lasts, and how much time you want to rest.</Text>

        <View style={styles.form}>
        <View style={styles.field}>
          <Text style={styles.label}>Exercise time</Text>
          <Dropdown 
            selectedValue={exerciseSeconds}
            options={exerciseOptions}
            unit="sec"
            onSelect={(val) => setExerciseSeconds(val)}
          />
        </View>
        </View>

      {/* startet nach dem Speichern der Einstellungen den Timer */}
      <View style={styles.actions}>
        <Button
          title="Next"
          onPress={() => onNext({
            exerciseSeconds: Number(exerciseSeconds) || 45
          })}
          extraStyle={{ width: '100%' }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 24, paddingHorizontal: 16 },
  content: { paddingTop: 82, paddingBottom: 24 },
  title: { fontSize: 27, fontWeight: '800', color: '#233126', textAlign: 'center' },
  subtitle: { fontSize: 15, lineHeight: 22, color: '#667066', textAlign: 'center', marginTop: 8, paddingHorizontal: 12 },
  form: { gap: 16, marginTop: 30 },
  field: { gap: 7 },
  label: { fontSize: 15, fontWeight: '700', color: '#233126' },
  input: { borderWidth: 1, borderColor: '#c8dac4', borderRadius: 14, backgroundColor: '#f7faf5', paddingHorizontal: 16, paddingVertical: 14, fontSize: 18, fontWeight: '700', color: '#233126', fontVariant: ['tabular-nums'] },
  inputWithUnit: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#c8dac4', borderRadius: 14, backgroundColor: '#f7faf5', paddingLeft: 16 },
  unitInput: { flex: 1, paddingVertical: 14, fontSize: 18, fontWeight: '700', color: '#233126', fontVariant: ['tabular-nums'] },
  unit: { paddingHorizontal: 16, color: '#667066', fontSize: 14 },
  summary: { alignItems: 'center', backgroundColor: '#eef6ea', borderRadius: 16, marginTop: 28, paddingVertical: 18 },
  summaryLabel: { fontSize: 11, fontWeight: '800', color: '#5e8a63', letterSpacing: 1 },
  summaryValue: { fontSize: 24, fontWeight: '800', color: '#355b3a', marginTop: 5, fontVariant: ['tabular-nums'] },
  actions: { paddingTop: 8, paddingBottom: 12, width: '100%' },
});
