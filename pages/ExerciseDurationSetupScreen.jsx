import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import BackButton from '../components/BackButton';
import Button from '../components/Button';

// entfernt Buchstaben und Sonderzeichen aus der Eingabe
const keepNumbersOnly = (value) => value.replace(/[^0-9]/g, '');

export default function ExerciseDurationSetupScreen({ onBack, onNext }) {
  // diese Werte kann die Person im Formular ändern
  const [exerciseSeconds, setExerciseSeconds] = useState('45');
  const [pauseSeconds, setPauseSeconds] = useState('15');

  // jede Routine besteht aus drei Übungen und zwei Pausen dazwischen
  const totalSeconds = 3 * (Number(exerciseSeconds) || 0) + 2 * (Number(pauseSeconds) || 0);
  
  // teilt die Sekunden für die Anzeige in Minuten und Restsekunden auf
  const totalMinutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = totalSeconds % 60;

  return (
    <View style={styles.container}>
      <BackButton onPress={onBack} />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Set your timer</Text>
        <Text style={styles.subtitle}>Choose how long each one lasts, and how much time you want to rest.</Text>

        {/* eingaben für die Einstellungen des Timers */}
        <View style={styles.form}>
          <View style={styles.field}>
            <Text style={styles.label}>Exercise time</Text>
            <View style={styles.inputWithUnit}>
              <TextInput value={exerciseSeconds} onChangeText={(value) => setExerciseSeconds(keepNumbersOnly(value))} keyboardType="number-pad" style={styles.unitInput} maxLength={3} />
              <Text style={styles.unit}>seconds</Text>
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Pause between exercises</Text>
            <View style={styles.inputWithUnit}>
              <TextInput value={pauseSeconds} onChangeText={(value) => setPauseSeconds(keepNumbersOnly(value))} keyboardType="number-pad" style={styles.unitInput} maxLength={3} />
              <Text style={styles.unit}>seconds</Text>
            </View>
          </View>
        </View>

        {/* zeigt die berechnete Dauer direkt an */}
        <View style={styles.summary}>
          <Text style={styles.summaryLabel}>ESTIMATED ROUTINE TIME</Text>
          <Text style={styles.summaryValue}>{totalMinutes} min {remainingSeconds} sec</Text>
        </View>
      </ScrollView>

      {/* startet nach dem Speichern der Einstellungen den Timer */}
      <View style={styles.actions}>
        <Button
          title="Start timer"
          onPress={() => onNext({
            exerciseSeconds: Math.max(1, Number(exerciseSeconds) || 1),
            pauseSeconds: Math.max(0, Number(pauseSeconds) || 0),
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
