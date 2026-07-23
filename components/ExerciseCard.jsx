import React, { useEffect, useRef, useState } from 'react';
import { Animated, Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { exerciseImages } from '../data/exerciseImages';

export default function ExerciseCard({ item, isSelected, onPress, size = 'default', animationDuration = 350 }) {
    // merkt sich die Drehung von vorne nach hinten
    const flipAnimation = useRef(new Animated.Value(isSelected ? 1 : 0)).current;
    const [showDescription, setShowDescription] = useState(false);

    useEffect(() => {
        // dreht die Karte wenn sie ausgewählt wird
        Animated.timing(flipAnimation, {
            toValue: isSelected ? 1 : 0,
            duration: animationDuration,
            useNativeDriver: true,
        }).start();
    }, [animationDuration, flipAnimation, isSelected]);

    // vordere seite mit Bild
    const frontRotate = flipAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });

    // hintere Seite mit Text
    const backRotate = flipAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['180deg', '360deg'],
    });

    // blendet die vordere Seite aus
    const frontOpacity = flipAnimation.interpolate({
        inputRange: [0, 0.49, 0.5, 1],
        outputRange: [1, 1, 0, 0],
    });

    // blendet die hintere Seite ein
    const backOpacity = flipAnimation.interpolate({
        inputRange: [0, 0.49, 0.5, 1],
        outputRange: [0, 0, 1, 1],
    });

    // passendes Bild zur Übung holen
    const imageSource = exerciseImages[item.id];

    return (
        <>
            <View style={[styles.cardOuter, size === 'large' && styles.largeCardOuter]}>
                <Pressable style={[styles.card, size === 'large' && styles.largeCard]} onPress={onPress}>
                    {/* vordere seite mit Bild */}
                    <Animated.View
                        style={[
                            styles.cardFace,
                            styles.cardFront,
                            {
                                opacity: frontOpacity,
                                transform: [{ perspective: 1000 }, { rotateY: frontRotate }],
                            },
                        ]}
                    >
                        <Image source={imageSource} style={[styles.image, size === 'large' && styles.largeImage]} resizeMode="contain" />
                        <Text style={[styles.name, size === 'large' && styles.largeName]}>{item.name}</Text>
                    </Animated.View>

                    {/* hintere seite mit Text */}
                    <Animated.View
                        style={[
                            styles.cardFace,
                            styles.cardBack,
                            {
                                opacity: backOpacity,
                                transform: [{ perspective: 1000 }, { rotateY: backRotate }],
                            },
                        ]}
                    >
                        <Text style={[styles.name, size === 'large' && styles.largeName]}>{item.name}</Text>
                        <Text style={styles.benefit}>{item.benefit}</Text>
                        <View style={styles.descriptionBox}>
                            <Pressable onPress={() => setShowDescription(true)}>
                                <Text style={styles.descriptionTitle}>How to do it</Text>
                            </Pressable>
                        </View>
                    </Animated.View>
                </Pressable>
            </View>

            {/* zeigt die Übungsanleitung als Dialog über der Karte */}
            <Modal
                animationType="fade"
                statusBarTranslucent
                transparent
                visible={showDescription}
                onRequestClose={() => setShowDescription(false)}
            >
                <View style={styles.modalOverlay}>
                    <Pressable
                        accessibilityLabel="Close exercise instructions"
                        accessibilityRole="button"
                        onPress={() => setShowDescription(false)}
                        style={StyleSheet.absoluteFill}
                    />
                    <View accessibilityViewIsModal style={styles.modalContent}>
                        <Text style={styles.modalEyebrow}>How to do it</Text>
                        <Text style={styles.modalTitle}>{item.name}</Text>
                        <Text selectable style={styles.modalDescription}>{item.description}</Text>
                        <Pressable style={styles.modalCloseButton} onPress={() => setShowDescription(false)}>
                            <Text style={styles.modalCloseText}>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    cardOuter: {
        width: '48%',
        marginBottom: 14,
    },
    card: {
        height: 240,
        position: 'relative',
        marginTop: 40
    },
    largeCardOuter: {
        width: '100%',
        marginBottom: 20,
    },
    largeCard: {
        height: 330,
    },
    cardFace: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#fff',
        borderRadius: 16,
        borderWidth: 2,
        borderColor: '#8FA888',
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backfaceVisibility: 'hidden',
        overflow: 'hidden',
    },
    cardFront: {
        backgroundColor: '#fff',
    },
    cardBack: {
        backgroundColor: '#eef6ea',
        borderColor: '#5e8a63',
    },
    descriptionBox: {
        width: '100%',
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 12,
        backgroundColor: '#F7FAF5',
        borderLeftWidth: 4,
        borderLeftColor: '#5E8A63',
    },
    descriptionTitle: {
        fontSize: 12,
        fontWeight: '700',
        color: '#5E8A63',
        textTransform: 'uppercase',
        letterSpacing: 0.8,
        textAlign: 'center',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        padding: 24,
        backgroundColor: 'rgba(20, 30, 22, 0.55)',
    },
    modalContent: {
        width: '100%',
        maxWidth: 480,
        alignSelf: 'center',
        padding: 24,
        borderRadius: 20,
        backgroundColor: '#fff',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
    },
    modalEyebrow: {
        fontSize: 12,
        fontWeight: '800',
        color: '#5E8A63',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    modalTitle: {
        marginTop: 8,
        fontSize: 22,
        fontWeight: '800',
        color: '#233126',
    },
    modalDescription: {
        marginTop: 14,
        fontSize: 17,
        lineHeight: 25,
        color: '#333',
    },
    modalCloseButton: {
        alignItems: 'center',
        marginTop: 22,
        paddingVertical: 14,
        borderRadius: 12,
        backgroundColor: '#5E8A63',
    },
    modalCloseText: {
        fontSize: 16,
        fontWeight: '800',
        color: '#fff',
    },
    image: {
        width: '100%',
        height: 110,
        marginBottom: 10,
    },
    largeImage: {
        height: 170,
    },
    name: {
        fontSize: 15,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 4,
    },
    largeName: {
        fontSize: 21,
    },
    benefit: {
        fontSize: 12,
        color: '#2f4f35',
        textAlign: 'center',
        marginTop: 6,
        fontStyle: 'italic',
    },
});
