import React, { useMemo, useState } from 'react';
import { FlatList, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';
import { HeaderBar } from '../components/HeaderBar';
import { SegmentedTabs } from '../components/SegmentedTabs';
import { LoadingState } from '../components/LoadingState';
import { EmptyState } from '../components/EmptyState';

const metricRows = [
  { id: 'rev', label: 'Revenue', value: '$98.4k', progress: 0.76 },
  { id: 'users', label: 'Users', value: '12.4k', progress: 0.64 },
  { id: 'tasks', label: 'Tasks', value: '1,492', progress: 0.68 },
  { id: 'eng', label: 'Engagement', value: '74%', progress: 0.82 },
];

export default function DashboardScreen() {
  const [tab, setTab] = useState('Weekly');
  const [loading, setLoading] = useState(false);

  const filtered = useMemo(() => {
    if (tab === 'Daily') {
      return metricRows.slice(0, 3);
    }
    if (tab === 'Monthly') {
      return metricRows.slice(2);
    }
    return metricRows;
  }, [tab]);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 600);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />
      <HeaderBar title="Dashboard" />
      <View style={styles.container}>
        <View style={styles.topRow}>
          <SegmentedTabs tabs={['Daily', 'Weekly', 'Monthly']} active={tab} onChange={setTab} />
          <Pressable
            onPress={handleRefresh}
            android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
            style={({ pressed }) => [styles.refreshButton, pressed && Platform.OS === 'ios' && { opacity: 0.7 }]}
          >
            <Ionicons name="refresh" size={18} color={colors.primary} />
          </Pressable>
        </View>
        {loading ? <LoadingState label="Loading metrics" /> : null}
        {filtered.length === 0 && !loading ? (
          <EmptyState title="No metrics yet" subtitle="Try refreshing or adjusting the filter." />
        ) : (
          <FlatList
            data={filtered}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.metricCard}>
                <View style={styles.metricHeader}>
                  <Text style={styles.metricLabel}>{item.label}</Text>
                  <Text style={styles.metricValue}>{item.value}</Text>
                </View>
                <View style={styles.progressTrack}>
                  <View style={[styles.progressFill, { width: `${item.progress * 100}%` }]} />
                </View>
              </View>
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={Platform.OS === 'android'}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={5}
            contentContainerStyle={styles.listContent}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
    ...(Platform.OS === 'web' ? { overflow: 'hidden' as any, maxHeight: '100vh' as any } : {}),
  },
  container: {
    flex: 1,
    paddingHorizontal: s(4),
    gap: s(3),
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(2),
  },
  refreshButton: {
    padding: s(2),
    borderRadius: s(2),
    backgroundColor: colors.primaryLight,
  },
  listContent: {
    paddingBottom: s(6),
  },
  metricCard: {
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
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: s(3),
    fontWeight: '500',
    color: colors.textSecondary,
    letterSpacing: 0.2,
    lineHeight: s(3) * 1.4,
    fontFamily: 'Inter-Medium',
  },
  metricValue: {
    fontSize: s(4),
    fontWeight: '700',
    color: colors.textPrimary,
    letterSpacing: -0.5,
    lineHeight: s(4) * 1.2,
    fontFamily: 'Inter-Bold',
  },
  progressTrack: {
    height: s(2),
    backgroundColor: colors.border,
    borderRadius: s(2),
    overflow: 'hidden',
    marginTop: s(2),
  },
  progressFill: {
    height: s(2),
    backgroundColor: colors.primary,
  },
  separator: {
    height: s(2),
  },
});
