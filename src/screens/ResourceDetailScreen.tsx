import React, { useMemo, useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../navigation';
import { resources } from '../data/mockData';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';
import { EmptyState } from '../components/EmptyState';

export default function ResourceDetailScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'ResourceDetail'>>();
  const [bookmarked, setBookmarked] = useState(false);
  const resource = useMemo(() => resources.find((item) => item.id === route.params.id), [route.params.id]);

  if (!resource) {
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar style="dark" />
        <EmptyState title="Resource missing" subtitle="Return to the resources list." />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <Text style={styles.title}>{resource.title}</Text>
        <Text style={styles.category}>{resource.category}</Text>
        <View style={styles.contentCard}>
          <Text style={styles.body}>{resource.excerpt}</Text>
          <Text style={styles.body}>Key takeaway: build a repeatable playbook to accelerate adoption.</Text>
        </View>
        <Pressable
          onPress={() => setBookmarked((prev) => !prev)}
          android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
          style={({ pressed }) => [styles.bookmarkButton, pressed && Platform.OS === 'ios' && { opacity: 0.7 }]}
        >
          <Ionicons name={bookmarked ? 'bookmark' : 'bookmark-outline'} size={20} color={colors.textInverse} />
          <Text style={styles.bookmarkText}>{bookmarked ? 'Saved to bookmarks' : 'Save to bookmarks'}</Text>
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
  category: {
    fontSize: s(3),
    fontWeight: '600',
    color: colors.accent,
    letterSpacing: 1.2,
    lineHeight: s(3) * 1.4,
    fontFamily: 'Inter-SemiBold',
    textTransform: 'uppercase',
  },
  contentCard: {
    padding: s(3),
    borderRadius: s(3),
    backgroundColor: colors.card,
    gap: s(2),
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
  body: {
    fontSize: s(4),
    fontWeight: '400',
    color: colors.textSecondary,
    letterSpacing: 0.2,
    lineHeight: s(4) * 1.4,
    fontFamily: 'Inter-Regular',
  },
  bookmarkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: s(2),
    paddingVertical: s(3),
    borderRadius: s(2),
    backgroundColor: colors.primary,
  },
  bookmarkText: {
    fontSize: s(4),
    fontWeight: '600',
    color: colors.textInverse,
    letterSpacing: 0.2,
    lineHeight: s(4) * 1.4,
    fontFamily: 'Inter-SemiBold',
  },
});
