import React, { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import BackButton from '../components/BackButton';
import Button from '../components/Button';
import ExerciseCard from '../components/ExerciseCard';
import { scheduleLocalTimerNotification } from '../services/NotificationService';
import { exercises } from '../data/exercises';

const typeOrder = { mobility: 0, strength: 1, stretch: 2 };
const formatTime = (seconds) => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
const timerSize = 210;
const timerStrokeWidth = 12;
const timerRadius = (timerSize - timerStrokeWidth) / 2;
const timerCircumference = 2 * Math.PI * timerRadius;

export default function ExerciseDetailScreen({ exerciseId, timerSettings, onBack, onFinish }) {

    // findet die ausgewählte Übung
    const selectedExercise = useMemo(() => exercises.find((item) => item.id === exerciseId), [exerciseId]);

    // holt die drei Übungen für einen Körperbereich
    const bodyPartExercises = useMemo(
        () => selectedExercise
            ? exercises
                .filter((item) => item.bodyPart === selectedExercise.bodyPart)
                .sort((firstExercise, secondExercise) => typeOrder[firstExercise.type] - typeOrder[secondExercise.type])
            : [],
        [selectedExercise],
    );

    const exerciseSeconds = timerSettings?.exerciseSeconds ?? 45;
    const pauseSeconds = timerSettings?.pauseSeconds ?? 15;
    const [exerciseIndex, setExerciseIndex] = useState(0);
    const [phase, setPhase] = useState('exercise');
    const [secondsLeft, setSecondsLeft] = useState(exerciseSeconds);
    const [isFinished, setIsFinished] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);
    const [isCardSelected, setIsCardSelected] = useState(false);

    // ermittelt die aktuell aktive Übung
    const currentExercise = bodyPartExercises[exerciseIndex];
    const phaseDuration = phase === 'pause' ? pauseSeconds : exerciseSeconds;
    const timerProgress = isFinished ? 0 : Math.min(1, secondsLeft / phaseDuration);
    const ringColor = isFinished
        ? '#355b3a'
        : hasStarted && !isRunning
            ? '#b84d4d'
            : phase === 'pause'
                ? '#d1964b'
                : '#5e8a63';

    const restartRoutine = () => {
        // Setzt die Routine für einen Neustart zurück
        setExerciseIndex(0);
        setPhase('exercise');
        setSecondsLeft(exerciseSeconds);
        setIsFinished(false);
        setIsRunning(false);
        setHasStarted(false);
        setIsCardSelected(false);
    };

    useEffect(() => {
        // setzt die Routine zurück, wenn sich der ausgewählte Körperbereich ändert
        restartRoutine();
    }, [exerciseId, exerciseSeconds]);

    useEffect(() => {
        // dreht die neue Karte nach vorne
        setIsCardSelected(false);
    }, [currentExercise?.id]);

    useEffect(() => {
        // zählt herunter, solange der Timer läuft
        if (isFinished || !currentExercise || !isRunning) {
            return undefined;
        }

        const timeout = setTimeout(() => {
            setSecondsLeft((currentSeconds) => {
                if (currentSeconds > 1) {
                    return currentSeconds - 1;
                }

                // Timer hit zero!


                if (phase === 'exercise' && exerciseIndex < bodyPartExercises.length - 1) {
                    if (pauseSeconds > 0) {
                        setPhase('pause');
                        return pauseSeconds;
                    }

                    setExerciseIndex((index) => index + 1);
                    return exerciseSeconds;
                }

                if (phase === 'pause') {
                    setExerciseIndex((index) => index + 1);
                    setPhase('exercise');
                    return exerciseSeconds;
                }

                setIsFinished(true);
                setIsRunning(false);
                return 0;
            });
        }, 1000);

        return () => clearTimeout(timeout);
    }, [bodyPartExercises.length, currentExercise, exerciseIndex, exerciseSeconds, isFinished, isRunning, pauseSeconds, phase, secondsLeft]);

    if (!selectedExercise || !currentExercise) {
        return (
            <View style={styles.container}>
                <BackButton onPress={onBack} />
                <Text style={styles.emptyText}>Please select an exercise first.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <BackButton onPress={onBack} />
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <ExerciseCard
                    item={currentExercise}
                    isSelected={isCardSelected}
                    onPress={() => setIsCardSelected((selected) => !selected)}
                    size="large"
                />
                <Text style={styles.helpText}>
                    {isFinished ? 'Great work!' : phase === 'pause' ? 'Recover before the next exercise.' : currentExercise.benefit}
                </Text>
                <Text style={styles.phase}>{isFinished ? 'Finished' : phase === 'pause' ? 'Pause' : 'Exercise'}</Text>
                <View style={[styles.timer, phase === 'pause' && styles.pauseTimer, hasStarted && !isRunning && styles.stoppedTimer, isFinished && styles.finishedTimer]}>
                    {/* zeigt die verbleibende Zeit als Kreis an */}
                    <Svg width={timerSize} height={timerSize} style={styles.progressRing}>
                        <Circle
                            cx={timerSize / 2}
                            cy={timerSize / 2}
                            r={timerRadius}
                            stroke="#afb2b4"
                            strokeWidth={timerStrokeWidth}
                            fill="transparent"
                        />
                        <Circle
                            cx={timerSize / 2}
                            cy={timerSize / 2}
                            r={timerRadius}
                            stroke={ringColor}
                            strokeWidth={timerStrokeWidth}
                            strokeDasharray={timerCircumference}
                            strokeDashoffset={timerCircumference * (1 - timerProgress)}
                            strokeLinecap="round"
                            fill="transparent"
                            transform={`rotate(-90 ${timerSize / 2} ${timerSize / 2})`}
                        />
                    </Svg>
                    <View style={styles.timerContent}>
                        <Text style={styles.time}>{formatTime(secondsLeft)}</Text>
                        <Text style={styles.exerciseNumber}>Exercise {exerciseIndex + 1} / {bodyPartExercises.length}</Text>
                    </View>
                </View>
                {!isFinished && (
                    /* zeigt die Start- und Stopp-Schaltfläche an */
                    <Pressable
                        style={[styles.timerControl, isRunning && styles.stopControl]}
                        onPress={() => setIsRunning((running) => {
                            if (!running) {
                                setHasStarted(true);
                            }

                            return !running;
                        })}
                    >
                        <Text style={styles.timerControlText}>{isRunning ? 'Stop' : 'Start'}</Text>
                    </Pressable>
                )}
            </ScrollView>
            {isFinished && <Button title="Finish" onPress={onFinish} extraStyle={{ width: '100%' }} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', paddingTop: 24, paddingHorizontal: 16, paddingBottom: 16 },
    content: { alignItems: 'center', paddingTop: 20, paddingBottom: 24 },
    flipHint: { marginTop: -10, marginBottom: 20, fontSize: 14, color: '#667066', textAlign: 'center' },
    phase: { fontSize: 14, fontWeight: '800', color: '#5e8a63', letterSpacing: 1, textTransform: 'uppercase' },
    timer: { width: timerSize, height: timerSize, borderRadius: timerSize / 2, alignItems: 'center', justifyContent: 'center', marginTop: 12, backgroundColor: '#eef6ea' },
    pauseTimer: { backgroundColor: '#fff6e9' },
    stoppedTimer: { backgroundColor: '#fff0f0' },
    finishedTimer: { backgroundColor: '#eef6ea' },
    progressRing: { position: 'absolute', top: 0, left: 0 },
    timerContent: { alignItems: 'center', justifyContent: 'center' },
    time: { fontSize: 46, fontWeight: '800', color: '#233126', fontVariant: ['tabular-nums'] },
    exerciseNumber: { marginTop: 4, fontSize: 15, color: '#667066', fontWeight: '700' },
    timerControl: { width: '100%', marginTop: 16, paddingVertical: 17, borderRadius: 14, backgroundColor: '#5e8a63', alignItems: 'center' },
    stopControl: { backgroundColor: '#b84d4d' },
    timerControlText: { color: '#fff', fontSize: 20, fontWeight: '800' },
    helpText: { marginTop: 5, marginBottom: 10, color: '#667066', textAlign: 'center', lineHeight: 21, paddingHorizontal: 18, fontSize: 20 },
    emptyText: { flex: 1, textAlign: 'center', textAlignVertical: 'center', fontSize: 17, color: '#667066' },
});
