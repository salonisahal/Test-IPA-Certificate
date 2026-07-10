import React from 'react';
import { Pressable, StyleSheet, Text, View, Platform } from 'react-native';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';

interface SectionCardProps {
  title: string;
  subtitle: string;
  onPress: () => void;
}

export function SectionCard({ title, subtitle, onPress }: SectionCardProps) {
  return (
    <View style={styles.wrapper}>
      <Pressable
        onPress={onPress}
        android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
        style={({ pressed }) => [styles.pressable, pressed && Platform.OS === 'ios' && { opacity: 0.7 }]}
      >
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: s(3),
    backgroundColor: colors.card,
    overflow: 'hidden',
    marginBottom: s(3),
    ...Platform.select({
      ios: {
        shadowColor: colors.shadowColor,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
      android: { elevation: 4 },
      default: {},
    }),
  },
  pressable: {
    padding: s(3),
  },
  content: {
    gap: s(1),
  },
  title: {
    fontSize: s(4),
    fontWeight: '600',
    color: colors.textPrimary,
    letterSpacing: 0.2,
    lineHeight: s(5),
    fontFamily: 'Inter-SemiBold',
  },
  subtitle: {
    fontSize: s(3),
    fontWeight: '400',
    color: colors.textSecondary,
    letterSpacing: 0.2,
    lineHeight: s(4),
    fontFamily: 'Inter-Regular',
  },
});
