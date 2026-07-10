import React from 'react';
import { Pressable, StyleSheet, Text, View, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';

interface HeaderBarProps {
  title: string;
  actionLabel?: string;
  onActionPress?: () => void;
}

export function HeaderBar({ title, actionLabel, onActionPress }: HeaderBarProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {actionLabel && onActionPress ? (
        <Pressable
          onPress={onActionPress}
          android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
          style={({ pressed }) => [styles.action, pressed && Platform.OS === 'ios' && { opacity: 0.7 }]}
        >
          <Ionicons name="ellipsis-horizontal" size={20} color={colors.primary} />
          <Text style={styles.actionText}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: s(4),
    paddingVertical: s(3),
  },
  title: {
    fontSize: s(5),
    fontWeight: '700',
    color: colors.textPrimary,
    letterSpacing: -0.5,
    lineHeight: s(6),
    fontFamily: 'Inter-Bold',
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: s(2),
    paddingVertical: s(1),
    borderRadius: s(2),
    backgroundColor: colors.primaryLight,
    gap: s(1),
  },
  actionText: {
    fontSize: s(3),
    fontWeight: '600',
    color: colors.primary,
    letterSpacing: 0.2,
    lineHeight: s(4),
    fontFamily: 'Inter-SemiBold',
  },
});
