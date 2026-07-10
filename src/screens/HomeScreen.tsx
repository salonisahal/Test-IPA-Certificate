import React, { useMemo, useState } from 'react';
import { FlatList, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../navigation';
import { activities, kpis } from '../data/mockData';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';
import { HeaderBar } from '../components/HeaderBar';
import { SectionCard } from '../components/SectionCard';
import { StatCard } from '../components/StatCard';

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'MainTabs'>>();
  const [refreshing, setRefreshing] = useState(false);

  const header = useMemo(() => (
    <View style={styles.headerContent}>
      <Text style={styles.greeting}>Good afternoon, Taylor</Text>
      <Text style={styles.subheading}>Here is your SaaS workspace overview.</Text>
      <ScrollView
        horizontal
        directionalLockEnabled
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.kpiRow}
      >
        {kpis.map((item) => (
          <StatCard key={item.id} item={item} />
        ))}
      </ScrollView>
      <View style={styles.quickActions}>
        <SectionCard
          title="Contact support"
          subtitle="Send a message to the team"
          onPress={() => navigation.navigate('Contact')}
        />
        <SectionCard
          title="Notification center"
          subtitle="Review alerts and updates"
          onPress={() => navigation.navigate('Notifications')}
        />
        <SectionCard
          title="Customer stories"
          subtitle="Swipe through testimonials"
          onPress={() => navigation.navigate('Testimonials')}
        />
      </View>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent activity</Text>
        <Pressable
          onPress={handleRefresh}
          android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
          style={({ pressed }) => [styles.refreshButton, pressed && Platform.OS === 'ios' && { opacity: 0.7 }]}
        >
          <Ionicons name="refresh" size={16} color={colors.primary} />
          <Text style={styles.refreshText}>{refreshing ? 'Refreshing' : 'Refresh'}</Text>
        </Pressable>
      </View>
    </View>
  ), [navigation, refreshing]);

  const handleActivityPress = (id: string) => {
    navigation.navigate('Notifications');
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 600);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />
      <HeaderBar title="Home" />
      <FlatList
        data={activities}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => handleActivityPress(item.id)}
            android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
            style={({ pressed }) => [styles.activityCard, pressed && Platform.OS === 'ios' && { opacity: 0.7 }]}
          >
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>{item.title}</Text>
              <Text style={styles.activitySubtitle}>{item.subtitle}</Text>
            </View>
            <Text style={styles.activityTime}>{item.time}</Text>
          </Pressable>
        )}
        ListHeaderComponent={header}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={Platform.OS === 'android'}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
    ...(Platform.OS === 'web' ? { overflow: 'hidden' as any, maxHeight: '100vh' as any } : {}),
  },
  headerContent: {
    paddingHorizontal: s(4),
    paddingBottom: s(3),
    gap: s(3),
  },
  greeting: {
    fontSize: s(6),
    fontWeight: '700',
    color: colors.textPrimary,
    letterSpacing: -0.5,
    lineHeight: s(6) * 1.2,
    fontFamily: 'Inter-Bold',
  },
  subheading: {
    fontSize: s(4),
    fontWeight: '400',
    color: colors.textSecondary,
    letterSpacing: 0.2,
    lineHeight: s(4) * 1.4,
    fontFamily: 'Inter-Regular',
  },
  kpiRow: {
    paddingVertical: s(1),
    paddingRight: s(4),
  },
  quickActions: {
    gap: s(2),
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: s(2),
  },
  sectionTitle: {
    fontSize: s(4),
    fontWeight: '600',
    color: colors.textPrimary,
    letterSpacing: 0.2,
    lineHeight: s(5),
    fontFamily: 'Inter-SemiBold',
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(1),
    paddingHorizontal: s(2),
    paddingVertical: s(1),
    borderRadius: s(2),
    backgroundColor: colors.primaryLight,
  },
  refreshText: {
    fontSize: s(3),
    fontWeight: '600',
    color: colors.primary,
    letterSpacing: 0.2,
    lineHeight: s(4),
    fontFamily: 'Inter-SemiBold',
  },
  listContent: {
    paddingBottom: s(6),
  },
  activityCard: {
    marginHorizontal: s(4),
    padding: s(3),
    borderRadius: s(3),
    backgroundColor: colors.card,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  activityContent: {
    gap: s(1),
    flex: 1,
  },
  activityTitle: {
    fontSize: s(4),
    fontWeight: '600',
    color: colors.textPrimary,
    letterSpacing: 0.2,
    lineHeight: s(5),
    fontFamily: 'Inter-SemiBold',
  },
  activitySubtitle: {
    fontSize: s(3),
    fontWeight: '400',
    color: colors.textSecondary,
    letterSpacing: 0.2,
    lineHeight: s(4),
    fontFamily: 'Inter-Regular',
  },
  activityTime: {
    fontSize: s(3),
    fontWeight: '500',
    color: colors.textDisabled,
    letterSpacing: 0.2,
    lineHeight: s(4),
    fontFamily: 'Inter-Medium',
    marginLeft: s(2),
  },
  separator: {
    height: s(2),
  },
});
