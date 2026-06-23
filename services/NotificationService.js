import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

// First, set the handler that will cause the notification
// to show the alert even when the app is active
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      console.warn('Failed to get push token for push notification!');
      return false;
    }
  } else {
    console.warn('Must use physical device for Push Notifications');
  }

  return true;
}

export async function scheduleLocalTimerNotification(seconds) {
  // Cancel all previously scheduled notifications to ensure only one timer runs
  await Notifications.cancelAllScheduledNotificationsAsync();

  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: "Time for a break! 🌸",
      body: "Your flow state timer has ended. Time to do some exercises!",
      sound: true,
    },
    trigger: {
      seconds: seconds,
      channelId: 'default', // Required for Android
    },
  });
  
  return id;
}

export async function cancelAllTimers() {
  await Notifications.cancelAllScheduledNotificationsAsync();
}
