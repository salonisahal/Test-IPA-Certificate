import React from 'react';
import { Pressable, StyleSheet, Text, View, Platform } from 'react-native';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';

interface SegmentedTabsProps {
  tabs: string[];
  active: string;
  onChange: (tab: string) => void;
}

export function SegmentedTabs({ tabs, active, onChange }: SegmentedTabsProps) {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = tab === active;
        return (
          <Pressable
            key={tab}
            onPress={() => onChange(tab)}
            android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
            style={({ pressed }) => [
              styles.tab,
              isActive && styles.activeTab,
              pressed && Platform.OS === 'ios' && { opacity: 0.7 },
            ]}
          >
            <Text style={[styles.tabText, isActive && styles.activeText]}>{tab}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: s(3),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    paddingVertical: s(2),
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: colors.primaryLight,
  },
  tabText: {
    fontSize: s(3),
    fontWeight: '500',
    color: colors.textSecondary,
    letterSpacing: 0.2,
    lineHeight: s(4),
    fontFamily: 'Inter-Medium',
  },
  activeText: {
    color: colors.primary,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
});
