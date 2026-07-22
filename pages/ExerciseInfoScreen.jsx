import React, { useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import BackButton from '../components/BackButton';
import Button from '../components/Button';
import ExerciseCard from '../components/ExerciseCard';
import { exercises } from '../data/exercises';

// auf dieser Seite werden nur die ersten sechs Übungen gezeigt
const visibleExercises = exercises.slice(0, 6);

export default function ExerciseInfoScreen({ onNext, onBack }) {
  // speichert, welche Karte gerade umgedreht ist
  const [selectedExerciseId, setSelectedExerciseId] = useState(null);
  // merkt sich, dass die automatische Vorschau nur einmal läuft
  const hasShownPreview = useRef(false);

  // dreht beim Öffnen kurz die erste Karte um und wieder zurück
  useEffect(() => {
    if (hasShownPreview.current) {
      return undefined;
    }

    hasShownPreview.current = true;
    const showBack = setTimeout(() => setSelectedExerciseId(visibleExercises[0].id), 350);
    const showFront = setTimeout(() => setSelectedExerciseId(null), 2250);

    return () => {
      clearTimeout(showBack);
      clearTimeout(showFront);
    };
  }, []);

  return (
    <View style={styles.container}>
      <BackButton onPress={onBack} />
      <View style={styles.header}>
        <Text style={styles.title}>What to expect</Text>
      </View>

      {/* zeigt die sechs Übungen als Karten in zwei Spalten */}
      <FlatList
        data={visibleExercises}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => {
          // nur die ausgewählte Karte zeigt ihre Rückseite
          const isSelected = selectedExerciseId === item.id;

          return (
            <ExerciseCard
              item={item}
              isSelected={isSelected}
              onPress={() => setSelectedExerciseId(isSelected ? null : item.id)}
              animationDuration={900}
            />
          );
        }}
      />

      {/* führt zur nächsten Seite */}
      <View style={styles.actions}>
        <Button title="Start" onPress={onNext} extraStyle={{ width: '100%' }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 24, paddingHorizontal: 16 },
  header: { paddingTop: 32, paddingBottom: 16, alignItems: 'center' },
  title: { fontSize: 24, fontWeight: '800', color: '#233126' },
  subtitle: { fontSize: 14, color: '#667066', textAlign: 'center', marginTop: 6 },
  grid: { paddingBottom: 20 },
  columnWrapper: { justifyContent: 'space-between', marginBottom: 14 },
  actions: { paddingTop: 4, paddingBottom: 12, width: '100%' },
});
