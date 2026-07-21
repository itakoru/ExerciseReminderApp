import React, { useEffect, useRef, useState } from 'react';
import { Animated, Image, Pressable, StyleSheet, Text, View } from 'react-native';
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
                    <Pressable onPress={() => setShowDescription(!showDescription)}>
                        <Text style={styles.descriptionTitle}>
                            {showDescription ? '▼ How to do it' : '▶ How to do it'}
                        </Text>
                    </Pressable>

                    {showDescription && (
                        <Text style={styles.description}>
                            {item.description}
                        </Text>
                    )}
                </View>
            </Animated.View>
            </Pressable>
        </View>
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
        marginBottom: 6,
    },
    description: {
        fontSize: 12,
        lineHeight: 18,
        color: '#333',
        textAlign: 'left',
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
