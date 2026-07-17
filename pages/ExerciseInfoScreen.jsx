import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import BackButton from '../components/BackButton';
import Button from '../components/Button';
import ExerciseCard from '../components/ExerciseCard';
import { exercises } from '../data/exercises';

export default function ExerciseInfoScreen({ onNext, onBack }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExerciseId, setSelectedExerciseId] = useState(null);

  // useMemo merkt sich die Liste
  // so wird sie nur neu gerechnet, wenn sich die Suche ändert
  const visibleExercises = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    // ohne Suche zeigen wir nur 6 Übungen
    if (!query) {
      return exercises.slice(0, 6);
    }

    // mit Suche wird alles durchsucht
    return exercises.filter((exercise) => {
      const searchableText = [exercise.name, exercise.description, exercise.benefit, exercise.bodyPart, exercise.type]
        .join(' ')
        .toLowerCase();

      return searchableText.includes(query);
    });
  }, [searchQuery]);

  useEffect(() => {
    if (!visibleExercises.length) {
      setSelectedExerciseId(null);
      return;
    }

    const selectedStillVisible = visibleExercises.some((exercise) => exercise.id === selectedExerciseId);

    if (!selectedExerciseId || !selectedStillVisible) {
      setSelectedExerciseId(visibleExercises[0].id);
    }
  }, [selectedExerciseId, visibleExercises]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Exercise Info</Text>

      <TextInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search by exercise, body part, or type"
        placeholderTextColor="#7a7a7a"
        style={styles.searchInput}
      />

      {/* hier kommen die Übungs-Karten */}
      <FlatList
        data={visibleExercises}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => {
          const isSelected = selectedExerciseId === item.id;

          return (
            <ExerciseCard
              item={item}
              isSelected={isSelected}
              onPress={() => setSelectedExerciseId(isSelected ? null : item.id)}
            />
          );
        }}
        ListEmptyComponent={<Text style={styles.emptyText}>No exercises found.</Text>}
      />

      <View style={styles.actions}>
        <Button
          title="Start"
          onPress={onNext}
        />

        <BackButton
          onPress={onBack}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 24,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 14,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#d7d7d7',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 11,
    marginBottom: 16,
    backgroundColor: '#fafafa',
  },
  grid: {
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 24,
  },
  actions: {
    paddingTop: 4,
    paddingBottom: 12,
  },
});