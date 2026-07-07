# Timer & Alarm Integration - Dokumentation

Dieses Dokument dient als Übersicht für das Team über die implementierte Timer-Logik, die Push-Benachrichtigungen (Alarme) und die damit verbundenen Komponenten. Es hilft dabei, an den bestehenden Code anzuknüpfen (insbesondere für Issue #8 "Benachrichtigungen" und Issue #3 "flow state fenster").

## 1. Abgeschlossene Issues (In Progress)
- **#1: 1 Person, die sich mit Timer beschäftigt** (Timer-Logik & Global State)
- **#9: Alarm** (Native Push-Benachrichtigung mit Sound am Ende des Timers)

*Hinweis: Für den Alarm wurde bereits das Grundgerüst für Issue #8 (Widget oder Benachrichtigung) über `expo-notifications` implementiert.*

---

## 2. Wo befindet sich was? (Dateistruktur)

### 🧩 UI Komponenten & Seiten
- `components/TimePicker.jsx`: Ein reines JavaScript-basiertes Eingabefeld (Stunden:Minuten). Es verzichtet bewusst auf fehlerhafte Native-Picker-Bibliotheken und formatiert sich beim Tippen automatisch (Smart Focus).
- `pages/FlowSetupScreen.jsx` (Fenster 1): Nutzt den `TimePicker` und übergibt die Gesamtsekunden an den Global Context.
- `pages/TimerActiveScreen.jsx` (Fenster 6): Zeigt den visuellen Zustand des Timers an (Läuft / Abgelaufen) und nutzt eine einfache Puls-Animation.

### ⚙️ Logik & Zustand (State)
- `services/NotificationService.js`: Kümmert sich um die direkte Kommunikation mit Android/iOS. Fordert Berechtigungen an, erstellt laute Notification-Channels (Android 8+) und plant Timer-Benachrichtigungen exakt auf die Sekunde genau.
- `hooks/useTimer.js`: Der Haupt-Hook, der die visuelle JavaScript-Uhr mit den nativen System-Benachrichtigungen synchronisiert. Pausiert effizient, wenn die App in den Hintergrund geht, und berechnet die Zeit beim Öffnen neu (`AppState`-Listener).
- `context/TimerContext.jsx`: Der Global Provider. Er macht die Timer-Funktionen in der gesamten App verfügbar, ohne dass Props tief weitergereicht werden müssen.
- `App.js`: Initialisiert die Push-Benachrichtigungs-Berechtigungen direkt beim Start der App.

---

## 3. Schnittstellen (Was das Team nutzen kann)

Wenn jemand im Team auf den Timer oder Benachrichtigungen zugreifen muss, stehen folgende Exporte zur Verfügung:

### A. Den Timer steuern (`useTimerContext`)
Überall in der App kann auf den Timer zugegriffen werden:
```javascript
import { useTimerContext } from '../context/TimerContext';

export default function MyComponent() {
  const { remainingSeconds, isActive, startTimer, stopTimer } = useTimerContext();

  // Beispiel: startTimer(60) startet einen 1-Minuten-Timer und 
  // plant automatisch den Alarm für 60 Sekunden in der Zukunft.
}
```

### B. Manuelle Benachrichtigungen (`NotificationService.js`)
Wer an Issue #8 arbeitet, kann den Service einfach erweitern oder bestehende Funktionen nutzen:
```javascript
import { scheduleLocalTimerNotification, cancelAllTimers } from '../services/NotificationService';

// Bricht alle aktiven Alarme ab
await cancelAllTimers();

// Plant eine Benachrichtigung über einen exakten Datums-Trigger
await scheduleLocalTimerNotification(120); 
```

## 4. Wichtige technische Details
- **Android-Sound Bugfix:** Android blockiert Alarmtöne standardmäßig. Es wurde explizit ein `channelId: 'default'` mit `sound: true` eingerichtet. Falls das Team eigene Töne hinzufügen will, muss der Channel-Name geändert oder die App beim Testen gelöscht/neuinstalliert werden (Android speichert fehlerhafte Channels dauerhaft).
- **Zeit-Trigger:** Wir nutzen einen exakten `Date`-Trigger (Timestamp in der Zukunft) anstelle von fehlerhaften Sekunden-Intervallen, da Expo sonst bei einigen Versionen sofortige "Sofort-Alarme" (Instant Fire) auslöst.
