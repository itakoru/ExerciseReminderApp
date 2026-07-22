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
      sound: true, // MUST BE BOOLEAN TRUE, NOT A STRING!
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

export async function scheduleLocalTimerNotification(seconds, customTitle, customBody, identifier = 'default-timer') {
  try {
    const triggerSeconds = seconds > 0 ? seconds : 1;
    const triggerDate = new Date(Date.now() + triggerSeconds * 1000);

    const id = await Notifications.scheduleNotificationAsync({
      identifier: identifier,
      content: {
        title: customTitle || "Time for a break! 🌸",
        body: customBody || "Your flow state timer has ended. Time to do some exercises!",
        sound: true,
        channelId: 'default', 
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: triggerDate,
        channelId: 'default', 
      },
    });
    return id;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function cancelAllTimers() {
  await Notifications.cancelAllScheduledNotificationsAsync();
}

export async function cancelTimer(identifier) {
  try {
    await Notifications.cancelScheduledNotificationAsync(identifier);
  } catch (error) {
    console.error(`Failed to cancel timer ${identifier}`, error);
  }
}

export async function scheduleDailyReminder(hour, minute) {
  try {
    const id = await Notifications.scheduleNotificationAsync({
      identifier: 'daily-reminder',
      content: {
        title: "Daily Reminder 🌸",
        body: "It's time to get some work and exercises in!",
        sound: true,
        channelId: 'default',
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour: Number(hour),
        minute: Number(minute),
        channelId: 'default',
      },
    });
    return id;
  } catch (error) {
    console.error("Failed to schedule daily reminder", error);
    return null;
  }
}
