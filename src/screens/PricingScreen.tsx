import React, { useMemo, useState } from 'react';
import { FlatList, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { plans } from '../data/mockData';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';
import { HeaderBar } from '../components/HeaderBar';
import { SegmentedTabs } from '../components/SegmentedTabs';

export default function PricingScreen() {
  const [cycle, setCycle] = useState('Monthly');
  const [selectedId, setSelectedId] = useState<string | null>(plans[1]?.id ?? null);
  const [message, setMessage] = useState('');

  const pricingData = useMemo(() => {
    return plans.map((plan) => {
      const amount = cycle === 'Monthly' ? plan.monthly : plan.yearly;
      const savings = cycle === 'Yearly' ? Math.round((plan.monthly * 12 - plan.yearly) / 12) : 0;
      return { ...plan, amount, savings };
    });
  }, [cycle]);

  const handleConfirm = () => {
    const selected = pricingData.find((plan) => plan.id === selectedId);
    if (!selected) {
      setMessage('Select a plan to continue.');
      return;
    }
    setMessage(`Selected ${selected.name} (${cycle}). Saved locally.`);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <HeaderBar title="Pricing" />
      <View style={styles.container}>
        <SegmentedTabs tabs={['Monthly', 'Yearly']} active={cycle} onChange={setCycle} />
        <Text style={styles.helper}>Switch to yearly billing to save every month.</Text>
        <FlatList
          data={pricingData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const selected = item.id === selectedId;
            return (
              <Pressable
                onPress={() => setSelectedId(item.id)}
                android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
                style={({ pressed }) => [styles.planCard, selected && styles.planSelected, pressed && Platform.OS === 'ios' && { opacity: 0.7 }]}
              >
                <View style={styles.planContent}>
                  <View>
                    <Text style={styles.planName}>{item.name}</Text>
                    <Text style={styles.planDesc}>{item.description}</Text>
                  </View>
                  <View style={styles.priceColumn}>
                    <Text style={styles.planPrice}>${item.amount}</Text>
                    <Text style={styles.planCycle}>/{cycle === 'Monthly' ? 'mo' : 'yr'}</Text>
                  </View>
                </View>
                {cycle === 'Yearly' ? (
                  <Text style={styles.planSavings}>Save ${item.savings}/mo</Text>
                ) : null}
              </Pressable>
            );
          }}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={Platform.OS === 'android'}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
          contentContainerStyle={styles.listContent}
        />
        {message ? <Text style={styles.message}>{message}</Text> : null}
        <Pressable
          onPress={handleConfirm}
          android_ripple={{ color: 'rgba(255,255,255,0.2)' }}
          style={({ pressed }) => [styles.confirmButton, pressed && Platform.OS === 'ios' && { opacity: 0.8 }]}
        >
          <Text style={styles.confirmText}>Confirm plan</Text>
        </Pressable>
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
  helper: {
    fontSize: s(3),
    fontWeight: '400',
    color: colors.textSecondary,
    letterSpacing: 0.2,
    lineHeight: s(3) * 1.4,
    fontFamily: 'Inter-Regular',
  },
  listContent: {
    paddingBottom: s(2),
  },
  planCard: {
    padding: s(3),
    borderRadius: s(3),
    backgroundColor: colors.card,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  planSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  planContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  planName: {
    fontSize: s(4),
    fontWeight: '600',
    color: colors.textPrimary,
    letterSpacing: 0.2,
    lineHeight: s(5),
    fontFamily: 'Inter-SemiBold',
  },
  planDesc: {
    fontSize: s(3),
    fontWeight: '400',
    color: colors.textSecondary,
    letterSpacing: 0.2,
    lineHeight: s(3) * 1.4,
    fontFamily: 'Inter-Regular',
    marginTop: s(1),
  },
  priceColumn: {
    alignItems: 'flex-end',
  },
  planPrice: {
    fontSize: s(5),
    fontWeight: '700',
    color: colors.textPrimary,
    letterSpacing: -0.5,
    lineHeight: s(5) * 1.2,
    fontFamily: 'Inter-Bold',
  },
  planCycle: {
    fontSize: s(3),
    fontWeight: '500',
    color: colors.textSecondary,
    letterSpacing: 0.2,
    lineHeight: s(3) * 1.4,
    fontFamily: 'Inter-Medium',
  },
  planSavings: {
    marginTop: s(2),
    fontSize: s(3),
    fontWeight: '600',
    color: colors.success,
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
  confirmButton: {
    backgroundColor: colors.primary,
    paddingVertical: s(3),
    borderRadius: s(2),
    alignItems: 'center',
  },
  confirmText: {
    fontSize: s(4),
    fontWeight: '600',
    color: colors.textInverse,
    letterSpacing: 0.2,
    lineHeight: s(4) * 1.4,
    fontFamily: 'Inter-SemiBold',
  },
  separator: {
    height: s(2),
  },
});
