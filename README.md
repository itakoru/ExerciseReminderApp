# Exercise Reminder App

## Wertversprechen

Wir helfen Menschen mit sitzenden Berufen (im Home-Office) und Rückenschmerzen dabei, ihre Rückengesundheit zu fördern, indem wir sie daran erinnern Pausen einzulegen und körperliche Übungen durchzuführen, ohne Flow-Zustand und mit dem lauten Ton zu stören.

## Funktionen

- Ein intelligenter Timer für regelmäßige Pausen
- Integrierte, gezielte Rückenübungen
- Benachrichtigungen für Übungszeiten (lautlose/sanfte Erinnerung)
- Unterstützung des Flow-States

## Tech Stack

- React Native / Expo
- Javascript
- VS Code

## Projekt starten

### Voraussetzungen

- Node.js & npm installiert
- Expo CLI: `npm install -g expo-cli`

### Installation & Start

```bash
npm install
npx expo start
```

### App ausführen

- **Simulator (iOS):** Press `i` zum iOS Simulator zu öffnen
- **Android Emulator:** Press `a`
- **Handy:** Expo Go App scannen QR-Code

### Bekannte Einschränkungen

- Notifications funktionieren nur auf dem physischen Gerät (nicht im Simulator)
- iOS Simulator benötigt Xcode

## Projektstruktur

- assets: Bilder
- componentes: UI-Komponente
- context: Timer-Context
- data: Übungen
- hooks: Timer
- pages: Screens
- services: Notification-Service
- utils
- App.js
- app.json
- index.jsx
- package-lock.json
- package.json

## Quellen

Die Übungen wurden nach allgemeinen Prinzipien der Verletzungsprävention ausgewählt. Jede Übungseinheit beginnt mit Aufwärmübungen, gefolgt von Kräftigungsübungen und endet mit Dehnübungen. Diese Reihenfolge dient dazu, den Körper auf die Belastung vorzubereiten, die Muskulatur zu aktivieren und das Verletzungsrisiko zu reduzieren.
Die Übungen basieren auf den folgenden Quellen:

https://www.heart.org/en/healthy-living/exercise-and-physical-activity/staying-motivated/stretches-for-exercise-and-flexibility?

https://www.suelevinephysio.co.uk/exercises

https://www.nasm.org/resource-center/exercise-library

https://www.muscleandfitness.com/workouts/workout-tips/14-secrets-people-who-never-get-exercise-injuries/

Die Illustrationen der Übungen wurden mit ChatGPT generiert.
Die Illustrationen der Blume von Ingrid Koutcherova

## Autoren
Gabriel Gajda, 
Ingrid Koutcherova, 
Artur Meshalkin, 
Sofiia Shabashova

## Lizenz

Diese Software wird „wie besehen“ bereitgestellt, ohne jegliche Garantie oder Gewährleistung. Die Nutzung erfolgt auf
eigene Verantwortung. Der Ersteller übernimmt keine Haftung für Schäden oder Probleme, die durch die Verwendung dieser
Software entstehen.

Dieses Projekt ist lizenziert unter der [CC BY 4.0 Lizenz]( https://creativecommons.org/licenses/by/4.0/)

