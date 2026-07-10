import React, { useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../navigation';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';
import { AvatarPlaceholder } from '../components/AvatarPlaceholder';

export default function ProfileScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'MainTabs'>>();
  const [notifications, setNotifications] = useState(true);
  const [darkTheme, setDarkTheme] = useState(false);
  const [message, setMessage] = useState('');

  const handleClear = () => {
    setNotifications(false);
    setDarkTheme(false);
    setMessage('Local preferences cleared.');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <AvatarPlaceholder />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>Taylor Jordan</Text>
            <Text style={styles.role}>Product Lead</Text>
            <Text style={styles.plan}>Plan: Professional</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <Pressable
            onPress={() => setNotifications((prev) => !prev)}
            android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
            style={({ pressed }) => [styles.row, pressed && Platform.OS === 'ios' && { opacity: 0.7 }]}
          >
            <Text style={styles.rowText}>Notification settings</Text>
            <Ionicons name={notifications ? 'notifications' : 'notifications-off'} size={20} color={colors.primary} />
          </Pressable>
          <Pressable
            onPress={() => setDarkTheme((prev) => !prev)}
            android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
            style={({ pressed }) => [styles.row, pressed && Platform.OS === 'ios' && { opacity: 0.7 }]}
          >
            <Text style={styles.rowText}>Theme preference</Text>
            <Text style={styles.rowValue}>{darkTheme ? 'Dark' : 'Light'}</Text>
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <Pressable
            onPress={() => navigation.navigate('Contact')}
            android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
            style={({ pressed }) => [styles.row, pressed && Platform.OS === 'ios' && { opacity: 0.7 }]}
          >
            <Text style={styles.rowText}>Edit profile</Text>
            <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
          </Pressable>
          <Pressable
            onPress={handleClear}
            android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
            style={({ pressed }) => [styles.row, pressed && Platform.OS === 'ios' && { opacity: 0.7 }]}
          >
            <Text style={styles.rowText}>Clear local data</Text>
            <Ionicons name="trash" size={18} color={colors.error} />
          </Pressable>
        </View>

        {message ? <Text style={styles.message}>{message}</Text> : null}

        <Pressable
          onPress={() => navigation.replace('Login')}
          android_ripple={{ color: 'rgba(255,255,255,0.2)' }}
          style={({ pressed }) => [styles.logoutButton, pressed && Platform.OS === 'ios' && { opacity: 0.8 }]}
        >
          <Text style={styles.logoutText}>Log out</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
    ...(Platform.OS === 'web' ? { overflow: 'hidden' as any, maxHeight: '100vh' as any } : {}),
  },
  content: {
    padding: s(4),
    gap: s(4),
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(3),
    padding: s(3),
    borderRadius: s(3),
    backgroundColor: colors.card,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadowColor,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
      },
      android: { elevation: 3 },
      default: {},
    }),
  },
  profileInfo: {
    gap: s(1),
  },
  name: {
    fontSize: s(5),
    fontWeight: '700',
    color: colors.textPrimary,
    letterSpacing: -0.5,
    lineHeight: s(5) * 1.2,
    fontFamily: 'Inter-Bold',
  },
  role: {
    fontSize: s(3),
    fontWeight: '400',
    color: colors.textSecondary,
    letterSpacing: 0.2,
    lineHeight: s(3) * 1.4,
    fontFamily: 'Inter-Regular',
  },
  plan: {
    fontSize: s(3),
    fontWeight: '500',
    color: colors.primary,
    letterSpacing: 0.2,
    lineHeight: s(3) * 1.4,
    fontFamily: 'Inter-Medium',
  },
  section: {
    gap: s(2),
  },
  sectionTitle: {
    fontSize: s(4),
    fontWeight: '600',
    color: colors.textPrimary,
    letterSpacing: 0.2,
    lineHeight: s(5),
    fontFamily: 'Inter-SemiBold',
  },
  row: {
    padding: s(3),
    borderRadius: s(3),
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowText: {
    fontSize: s(4),
    fontWeight: '500',
    color: colors.textPrimary,
    letterSpacing: 0.2,
    lineHeight: s(4) * 1.4,
    fontFamily: 'Inter-Medium',
  },
  rowValue: {
    fontSize: s(3),
    fontWeight: '600',
    color: colors.primary,
    letterSpacing: 0.2,
    lineHeight: s(3) * 1.4,
    fontFamily: 'Inter-SemiBold',
  },
  message: {
    fontSize: s(3),
    fontWeight: '500',
    color: colors.info,
    letterSpacing: 0.2,
    lineHeight: s(3) * 1.4,
    fontFamily: 'Inter-Medium',
  },
  logoutButton: {
    backgroundColor: colors.error,
    paddingVertical: s(3),
    borderRadius: s(2),
    alignItems: 'center',
  },
  logoutText: {
    fontSize: s(4),
    fontWeight: '600',
    color: colors.textInverse,
    letterSpacing: 0.2,
    lineHeight: s(4) * 1.4,
    fontFamily: 'Inter-SemiBold',
  },
});
