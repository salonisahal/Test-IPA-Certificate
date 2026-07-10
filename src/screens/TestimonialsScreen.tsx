import React, { useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { testimonials } from '../data/mockData';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';

export default function TestimonialsScreen() {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.title}>Customer stories</Text>
        <Text style={styles.subtitle}>Swipe to explore how teams grow with us.</Text>
      </View>
      <ScrollView
        horizontal
        directionalLockEnabled
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carousel}
      >
        {testimonials.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.ratingRow}>
              {Array.from({ length: item.rating }).map((_, idx) => (
                <Ionicons key={`${item.id}-star-${idx}`} name="star" size={16} color={colors.warning} />
              ))}
            </View>
            <Text style={styles.quote}>{item.outcome}</Text>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.role}>{item.role} · {item.company}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.pagination}>
        <Pressable
          onPress={handlePrev}
          android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
          style={({ pressed }) => [styles.pageButton, pressed && Platform.OS === 'ios' && { opacity: 0.7 }]}
        >
          <Ionicons name="chevron-back" size={18} color={colors.primary} />
          <Text style={styles.pageText}>Prev</Text>
        </Pressable>
        <Text style={styles.pageIndicator}>{index + 1} / {testimonials.length}</Text>
        <Pressable
          onPress={handleNext}
          android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
          style={({ pressed }) => [styles.pageButton, pressed && Platform.OS === 'ios' && { opacity: 0.7 }]}
        >
          <Text style={styles.pageText}>Next</Text>
          <Ionicons name="chevron-forward" size={18} color={colors.primary} />
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
  header: {
    paddingHorizontal: s(4),
    paddingTop: s(5),
    gap: s(1),
  },
  title: {
    fontSize: s(6),
    fontWeight: '700',
    color: colors.textPrimary,
    letterSpacing: -0.5,
    lineHeight: s(6) * 1.2,
    fontFamily: 'Inter-Bold',
  },
  subtitle: {
    fontSize: s(4),
    fontWeight: '400',
    color: colors.textSecondary,
    letterSpacing: 0.2,
    lineHeight: s(4) * 1.4,
    fontFamily: 'Inter-Regular',
  },
  carousel: {
    paddingHorizontal: s(4),
    paddingVertical: s(4),
    gap: s(3),
  },
  card: {
    width: s(70),
    padding: s(4),
    borderRadius: s(3),
    backgroundColor: colors.card,
    gap: s(2),
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
  ratingRow: {
    flexDirection: 'row',
    gap: s(1),
  },
  quote: {
    fontSize: s(4),
    fontWeight: '500',
    color: colors.textPrimary,
    letterSpacing: 0.2,
    lineHeight: s(4) * 1.4,
    fontFamily: 'Inter-Medium',
  },
  name: {
    fontSize: s(4),
    fontWeight: '600',
    color: colors.textPrimary,
    letterSpacing: 0.2,
    lineHeight: s(4) * 1.4,
    fontFamily: 'Inter-SemiBold',
  },
  role: {
    fontSize: s(3),
    fontWeight: '400',
    color: colors.textSecondary,
    letterSpacing: 0.2,
    lineHeight: s(3) * 1.4,
    fontFamily: 'Inter-Regular',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: s(4),
    paddingBottom: s(4),
  },
  pageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(1),
    paddingHorizontal: s(2),
    paddingVertical: s(1),
    borderRadius: s(2),
    backgroundColor: colors.primaryLight,
  },
  pageText: {
    fontSize: s(3),
    fontWeight: '600',
    color: colors.primary,
    letterSpacing: 0.2,
    lineHeight: s(3) * 1.4,
    fontFamily: 'Inter-SemiBold',
  },
  pageIndicator: {
    fontSize: s(3),
    fontWeight: '500',
    color: colors.textSecondary,
    letterSpacing: 0.2,
    lineHeight: s(3) * 1.4,
    fontFamily: 'Inter-Medium',
  },
});
