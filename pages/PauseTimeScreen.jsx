import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BackButton from '../components/BackButton';
import Button from '../components/Button';
import Dropdown from '../components/Dropdown';

export default function PauseTimeScreen({ onNext, onBack, exerciseSeconds }) {
    const [pauseSeconds, setPauseSeconds] = useState('15');

    const pauseOptions = ['10', '15', '20', '30', '45', '60'];

    // jede Routine besteht aus drei Übungen und zwei Pausen dazwischen
    const totalSeconds = 3 * (Number(exerciseSeconds) || 0) + 2 * (Number(pauseSeconds) || 0);
  
    // teilt die Sekunden für die Anzeige in Minuten und Restsekunden auf
    const totalMinutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;

    const handleStartWorkout = () => {
        if (onNext) {
            onNext({
                exerciseSeconds: Number(exerciseSeconds) || 45,
                pauseSeconds: Number(pauseSeconds) || 15,
            });
        }
    };

    return (
        <View style={styles.container}>
            <BackButton onPress={onBack} />

            <View style={styles.header}>
                <Text style={styles.title}>Set your pause time</Text>
                <Text style={styles.subtitle}>
                    Choose how much time you want to rest between exercises.
                </Text>
            </View>

            <View style={styles.form}>
                <View style={styles.field}>
                    <Text style={styles.label}>Pause between exercises</Text>
                    <Dropdown 
                        selectedValue={pauseSeconds}
                        options={pauseOptions}
                        unit="sec"
                        onSelect={(val) => setPauseSeconds(val)}
                    />
                </View>

                {/* Arturs Live-Berechnung */}
                <View style={styles.summary}>
                    <Text style={styles.summaryLabel}>ESTIMATED ROUTINE TIME</Text>
                    <Text style={styles.summaryValue}>
                        {totalMinutes} min {remainingSeconds} sec
                    </Text>
                </View>
            </View>

            <View style={styles.actions}>
                <Button 
                    title="Start Workout"
                    onPress={handleStartWorkout}
                    extraStyle={{ width: '100%' }}
                />
            </View>
        </View>
    );
} 

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 60, paddingHorizontal: 16, justifyContent: 'space-between', paddingBottom: 24 },
  header: { alignItems: 'center' },
  title: { fontSize: 27, fontWeight: '800', color: '#233126', textAlign: 'center' },
  subtitle: { fontSize: 15, lineHeight: 22, color: '#667066', textAlign: 'center', marginTop: 8, paddingHorizontal: 12 },
  form: { flex: 1, justifyContent: 'center' },
  field: { gap: 7, alignItems: 'center' },
  label: { fontSize: 15, fontWeight: '700', color: '#233126', alignSelf: 'flex-start', marginLeft: 20 },
  summary: { alignItems: 'center', backgroundColor: '#eef6ea', borderRadius: 16, marginTop: 28, paddingVertical: 18, width: '100%' },
  summaryLabel: { fontSize: 11, fontWeight: '800', color: '#5e8a63', letterSpacing: 1 },
  summaryValue: { fontSize: 24, fontWeight: '800', color: '#355b3a', marginTop: 5, fontVariant: ['tabular-nums'] },
  actions: { width: '100%' },
});