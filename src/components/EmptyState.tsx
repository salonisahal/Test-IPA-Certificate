import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';

interface EmptyStateProps {
  title: string;
  subtitle: string;
}

export function EmptyState({ title, subtitle }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Ionicons name="alert-circle-outline" size={24} color={colors.textDisabled} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: s(4),
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
    textAlign: 'center',
  },
});
