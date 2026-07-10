import React from 'react';
import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';

export default function NotFoundScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const firstScreen = Object.keys({} as RootStackParamList)[0] as keyof RootStackParamList;
  return (
    <SafeAreaView style={styles.safe}>
      <Text style={styles.text}>Screen not found</Text>
      <Pressable
        onPress={() => navigation.goBack()}
        android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
        style={({ pressed }) => [styles.btn, pressed && Platform.OS === 'ios' && { opacity: 0.7 }]}
      >
        <Text style={styles.btnText}>Go Back</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    ...(Platform.OS === 'web' ? { overflow: 'hidden' as any, maxHeight: '100vh' as any } : {}),
  },
  text: {
    fontSize: s(4),
    fontWeight: '500',
    color: colors.textPrimary,
    letterSpacing: 0.2,
    lineHeight: s(4) * 1.4,
    fontFamily: 'Inter-Medium',
  },
  btn: {
    marginTop: s(4),
    paddingHorizontal: s(6),
    paddingVertical: s(3),
    borderRadius: s(2),
    backgroundColor: colors.primary,
  },
  btnText: {
    color: colors.textInverse,
    fontWeight: '600',
    letterSpacing: 0.2,
    lineHeight: s(3) * 1.4,
    fontFamily: 'Inter-SemiBold',
  },
});
