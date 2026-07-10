import React, { useMemo, useState } from 'react';
import { FlatList, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { notifications as seedNotifications } from '../data/mockData';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';
import { EmptyState } from '../components/EmptyState';

export default function NotificationsScreen() {
  const [items, setItems] = useState(seedNotifications);

  const unreadCount = useMemo(() => items.filter((item) => item.unread).length, [items]);

  const toggleRead = (id: string) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, unread: !item.unread } : item)));
  };

  const markAllRead = () => {
    setItems((prev) => prev.map((item) => ({ ...item, unread: false })));
  };

  const dismissRead = () => {
    setItems((prev) => prev.filter((item) => item.unread));
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.title}>Notifications</Text>
        <Text style={styles.count}>{unreadCount} unread</Text>
      </View>
      <View style={styles.actions}>
        <Pressable
          onPress={markAllRead}
          android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
          style={({ pressed }) => [styles.actionButton, pressed && Platform.OS === 'ios' && { opacity: 0.7 }]}
        >
          <Text style={styles.actionText}>Mark all read</Text>
        </Pressable>
        <Pressable
          onPress={dismissRead}
          android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
          style={({ pressed }) => [styles.actionButton, pressed && Platform.OS === 'ios' && { opacity: 0.7 }]}
        >
          <Text style={styles.actionText}>Dismiss read</Text>
        </Pressable>
      </View>
      {items.length === 0 ? (
        <EmptyState title="All caught up" subtitle="No notifications to show." />
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => toggleRead(item.id)}
              android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
              style={({ pressed }) => [styles.card, item.unread && styles.unreadCard, pressed && Platform.OS === 'ios' && { opacity: 0.7 }]}
            >
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardBody}>{item.body}</Text>
              </View>
              <Text style={styles.cardStatus}>{item.unread ? 'New' : 'Read'}</Text>
            </Pressable>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: s(4),
    ...(Platform.OS === 'web' ? { overflow: 'hidden' as any, maxHeight: '100vh' as any } : {}),
  },
  header: {
    paddingTop: s(4),
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
  count: {
    fontSize: s(3),
    fontWeight: '500',
    color: colors.textSecondary,
    letterSpacing: 0.2,
    lineHeight: s(3) * 1.4,
    fontFamily: 'Inter-Medium',
  },
  actions: {
    flexDirection: 'row',
    gap: s(2),
    marginTop: s(3),
    marginBottom: s(2),
  },
  actionButton: {
    flex: 1,
    paddingVertical: s(2),
    borderRadius: s(2),
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
  },
  actionText: {
    fontSize: s(3),
    fontWeight: '600',
    color: colors.primary,
    letterSpacing: 0.2,
    lineHeight: s(3) * 1.4,
    fontFamily: 'Inter-SemiBold',
  },
  listContent: {
    paddingBottom: s(6),
  },
  card: {
    padding: s(3),
    borderRadius: s(3),
    backgroundColor: colors.card,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  unreadCard: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  cardContent: {
    gap: s(1),
    flex: 1,
  },
  cardTitle: {
    fontSize: s(4),
    fontWeight: '600',
    color: colors.textPrimary,
    letterSpacing: 0.2,
    lineHeight: s(5),
    fontFamily: 'Inter-SemiBold',
  },
  cardBody: {
    fontSize: s(3),
    fontWeight: '400',
    color: colors.textSecondary,
    letterSpacing: 0.2,
    lineHeight: s(3) * 1.4,
    fontFamily: 'Inter-Regular',
  },
  cardStatus: {
    fontSize: s(3),
    fontWeight: '600',
    color: colors.info,
    letterSpacing: 0.2,
    lineHeight: s(3) * 1.4,
    fontFamily: 'Inter-SemiBold',
    marginLeft: s(2),
  },
  separator: {
    height: s(2),
  },
});
