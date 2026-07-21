import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import BackButton from '../components/BackButton';
import Button from '../components/Button';
import ExerciseCard from '../components/ExerciseCard';
import ExerciseFilter from '../components/ExerciseFilter';
import { exercises } from '../data/exercises';

const typeOrder = { mobility: 0, strength: 1, stretch: 2 };
const bodyParts = [
    { id: 'neck', label: 'Neck' },
    { id: 'shoulders', label: 'Shoulders' },
    { id: 'upperBack', label: 'Upper back' },
    { id: 'lowerBack', label: 'Lower back' },
    { id: 'hips', label: 'Hips' },
    { id: 'legs', label: 'Legs' },
];

export default function ExerciseListScreen({ onNext, onBack }) {
    // speichert den Text aus dem Suchfeld
    const [searchQuery, setSearchQuery] = useState('');

    // speichert, welche Karte gerade umgedreht ist
    const [selectedExerciseId, setSelectedExerciseId] = useState(null);

    // speichert den ausgewählten Körperbereich
    const [selectedBodyPart, setSelectedBodyPart] = useState(null);

    // sortiert die Übungen nach Körperbereich und Art
    const orderedExercises = useMemo(() => {
        return exercises
            .filter((exercise) => bodyParts.some((bodyPart) => bodyPart.id === exercise.bodyPart))
            .sort((firstExercise, secondExercise) => {

                const firstBodyPartIndex = bodyParts.findIndex((bodyPart) => bodyPart.id === firstExercise.bodyPart);
                const secondBodyPartIndex = bodyParts.findIndex((bodyPart) => bodyPart.id === secondExercise.bodyPart);
                const bodyPartDifference = firstBodyPartIndex - secondBodyPartIndex;

                if (bodyPartDifference !== 0) {
                    return bodyPartDifference;
                }

                return typeOrder[firstExercise.type] - typeOrder[secondExercise.type];
            });
    }, []);

    // erstellt die Liste neu, wenn sich die Suche ändert
    const visibleExercises = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        // ohne Suche zeigen wir alle Übungen in der festen Reihenfolge
        if (!query) {
            return orderedExercises;
        }

        return orderedExercises.filter((exercise) => {
            const searchableText = [exercise.name, exercise.description, exercise.benefit, exercise.bodyPart, exercise.type]
                .join(' ')
                .toLowerCase();

            return searchableText.includes(query);
        });
    }, [orderedExercises, searchQuery]);

    const exerciseGroups = useMemo(
        () => bodyParts
            .map((bodyPart) => ({
                ...bodyPart,
                exercises: visibleExercises.filter((exercise) => exercise.bodyPart === bodyPart.id),
            }))
            .filter((group) => group.exercises.length > 0),
        [visibleExercises],
    );

    // sucht die erste Übung, die zum aktuell ausgewählten Körperteil gehört
    const firstExerciseOfSelectedBodyPart = useMemo(
        () => orderedExercises.find((exercise) => exercise.bodyPart === selectedBodyPart),
        [orderedExercises, selectedBodyPart],
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <BackButton onPress={onBack} />
                <Text style={styles.title}>Exercise library</Text>
                <Text style={styles.subtitle}>Choose a body part to see its exercises.</Text>
            </View>

            {/* mit diesem Feld kann nach Übungen gesucht werden */}
            {/*  <ExerciseFilter value={searchQuery} onChangeText={setSearchQuery} /> */}

            {/* ein Körperbereich lässt sich antippen und zeigt dann seine Übungen */}
            <FlatList
                data={exerciseGroups}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.grid}
                renderItem={({ item }) => {
                    const isSelectedBodyPart = selectedBodyPart === item.id;

                    return (
                        <View style={styles.group}>
                            <Pressable
                                style={[styles.groupHeader, isSelectedBodyPart && styles.selectedGroupHeader]}
                                onPress={() => setSelectedBodyPart(item.id)}
                            >
                                <Text style={[styles.groupTitle, isSelectedBodyPart && styles.selectedGroupTitle]}>{item.label}</Text>
                                <Text style={[styles.expandIcon, isSelectedBodyPart && styles.selectedGroupTitle]}>{isSelectedBodyPart ? '✓' : '+'}</Text>
                            </Pressable>

                            {isSelectedBodyPart && (
                                <View style={styles.exerciseGrid}>
                                    {item.exercises.map((exercise) => (
                                        <ExerciseCard
                                            key={exercise.id}
                                            item={exercise}
                                            isSelected={selectedExerciseId === exercise.id}
                                            onPress={() => setSelectedExerciseId(exercise.id)}
                                        />
                                    ))}
                                </View>
                            )}
                        </View>
                    );
                }}
                ListEmptyComponent={<Text style={styles.emptyText}>No exercises found.</Text>}
            />

            {/* führt zur nächsten Seite */}
            <View style={styles.actions}>
                <Button
                    title="Start"
                    onPress={() => firstExerciseOfSelectedBodyPart && onNext(firstExerciseOfSelectedBodyPart.id)}
                    extraStyle={{ width: '100%' }}
                />
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
    group: { marginBottom: 14 },
    groupHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 18, paddingVertical: 16, borderRadius: 14, backgroundColor: '#eef6ea', borderWidth: 1, borderColor: '#c8dac4' },
    selectedGroupHeader: { backgroundColor: '#5e8a63', borderColor: '#5e8a63' },
    groupTitle: { fontSize: 18, fontWeight: '800', color: '#233126' },
    selectedGroupTitle: { color: '#fff' },
    expandIcon: { fontSize: 26, lineHeight: 26, fontWeight: '500', color: '#5e8a63' },
    exerciseGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingTop: 14 },
    emptyText: { textAlign: 'center', color: '#666', marginTop: 24 },
    actions: { paddingTop: 4, paddingBottom: 12, width: '100%' },
});
