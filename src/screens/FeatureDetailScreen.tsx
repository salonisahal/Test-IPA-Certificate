import React, { useMemo, useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../navigation';
import { features } from '../data/mockData';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';
import { EmptyState } from '../components/EmptyState';

export default function FeatureDetailScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'FeatureDetail'>>();
  const [activated, setActivated] = useState(false);
  const feature = useMemo(() => features.find((item) => item.id === route.params.id), [route.params.id]);

  if (!feature) {
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar style="dark" />
        <EmptyState title="Feature not found" subtitle="Please return to the feature list." />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <Text style={styles.title}>{feature.title}</Text>
        <Text style={styles.summary}>{feature.summary}</Text>
        <View style={styles.detailCard}>
          <Text style={styles.detailTitle}>Key benefit</Text>
          <Text style={styles.detailBody}>{feature.benefit}</Text>
        </View>
        <View style={styles.detailCard}>
          <Text style={styles.detailTitle}>Usage insights</Text>
          <Text style={styles.detailBody}>{feature.usage}</Text>
        </View>
        <Pressable
          onPress={() => setActivated((prev) => !prev)}
          android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
          style={({ pressed }) => [styles.activateButton, pressed && Platform.OS === 'ios' && { opacity: 0.7 }]}
        >
          <Ionicons name={activated ? 'checkmark-circle' : 'rocket'} size={20} color={colors.textInverse} />
          <Text style={styles.activateText}>{activated ? 'Feature activated' : 'Activate workflow'}</Text>
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
    padding: s(4),
    gap: s(3),
  },
  title: {
    fontSize: s(6),
    fontWeight: '700',
    color: colors.textPrimary,
    letterSpacing: -0.5,
    lineHeight: s(6) * 1.2,
    fontFamily: 'Inter-Bold',
  },
  summary: {
    fontSize: s(4),
    fontWeight: '400',
    color: colors.textSecondary,
    letterSpacing: 0.2,
    lineHeight: s(4) * 1.4,
    fontFamily: 'Inter-Regular',
  },
  detailCard: {
    padding: s(3),
    borderRadius: s(3),
    backgroundColor: colors.card,
    gap: s(1),
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
  detailTitle: {
    fontSize: s(3),
    fontWeight: '600',
    color: colors.textPrimary,
    letterSpacing: 0.2,
    lineHeight: s(3) * 1.4,
    fontFamily: 'Inter-SemiBold',
  },
  detailBody: {
    fontSize: s(3),
    fontWeight: '400',
    color: colors.textSecondary,
    letterSpacing: 0.2,
    lineHeight: s(3) * 1.4,
    fontFamily: 'Inter-Regular',
  },
  activateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: s(2),
    paddingVertical: s(3),
    borderRadius: s(2),
    backgroundColor: colors.primary,
  },
  activateText: {
    fontSize: s(4),
    fontWeight: '600',
    color: colors.textInverse,
    letterSpacing: 0.2,
    lineHeight: s(4) * 1.4,
    fontFamily: 'Inter-SemiBold',
  },
});
