import React from 'react';
import { Pressable, StyleSheet, Text, Platform, ViewStyle } from 'react-native';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  style?: ViewStyle;
}

export function PrimaryButton({ label, onPress, style }: PrimaryButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: 'rgba(255,255,255,0.2)' }}
      style={({ pressed }) => [styles.button, style, pressed && Platform.OS === 'ios' && { opacity: 0.8 }]}
    >
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: s(3),
    borderRadius: s(2),
    alignItems: 'center',
  },
  label: {
    fontSize: s(4),
    fontWeight: '600',
    color: colors.textInverse,
    letterSpacing: 0.2,
    lineHeight: s(5),
    fontFamily: 'Inter-SemiBold',
  },
});
