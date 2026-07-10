import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';
import { KPI } from '../types';

interface StatCardProps {
  item: KPI;
}

export function StatCard({ item }: StatCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{item.label}</Text>
      <Text style={styles.value}>{item.value}</Text>
      <Text style={styles.trend}>{item.trend}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: s(28),
    padding: s(3),
    borderRadius: s(3),
    backgroundColor: colors.card,
    marginRight: s(3),
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
  label: {
    fontSize: s(3),
    fontWeight: '500',
    color: colors.textSecondary,
    letterSpacing: 0.2,
    lineHeight: s(4),
    fontFamily: 'Inter-Medium',
  },
  value: {
    fontSize: s(5),
    fontWeight: '700',
    color: colors.textPrimary,
    letterSpacing: -0.5,
    lineHeight: s(6),
    fontFamily: 'Inter-Bold',
    marginTop: s(1),
  },
  trend: {
    fontSize: s(3),
    fontWeight: '600',
    color: colors.success,
    letterSpacing: 0.2,
    lineHeight: s(4),
    fontFamily: 'Inter-SemiBold',
    marginTop: s(1),
  },
});
