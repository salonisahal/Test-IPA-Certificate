import React, { useMemo, useState } from 'react';
import { FlatList, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { resources } from '../data/mockData';
import { RootStackParamList } from '../navigation';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';
import { HeaderBar } from '../components/HeaderBar';
import { EmptyState } from '../components/EmptyState';

export default function ResourcesScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'MainTabs'>>();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query) return resources;
    return resources.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <HeaderBar title="Resources" />
      <View style={styles.container}>
        <View style={styles.searchWrap}>
          <Text style={styles.searchLabel}>Search library</Text>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search articles, tutorials, FAQs"
            placeholderTextColor={colors.textDisabled}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
            underlineColorAndroid="transparent"
            selectionColor={colors.primary}
            style={styles.searchInput}
          />
        </View>
        {filtered.length === 0 ? (
          <EmptyState title="No results" subtitle="Try a different search term." />
        ) : (
          <FlatList
            data={filtered}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => navigation.navigate('ResourceDetail', { id: item.id })}
                android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
                style={({ pressed }) => [styles.card, pressed && Platform.OS === 'ios' && { opacity: 0.7 }]}
              >
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardExcerpt}>{item.excerpt}</Text>
                </View>
                <Text style={styles.cardCategory}>{item.category}</Text>
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
  searchWrap: {
    gap: s(1),
  },
  searchLabel: {
    fontSize: s(3),
    fontWeight: '500',
    color: colors.textSecondary,
    letterSpacing: 0.2,
    lineHeight: s(3) * 1.4,
    fontFamily: 'Inter-Medium',
  },
  searchInput: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    borderRadius: s(2),
    paddingHorizontal: s(3),
    paddingVertical: s(3),
    fontSize: s(4),
    color: colors.textPrimary,
    letterSpacing: 0.2,
    lineHeight: s(4) * 1.4,
    fontFamily: 'Inter-Regular',
    backgroundColor: colors.surface,
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
  cardExcerpt: {
    fontSize: s(3),
    fontWeight: '400',
    color: colors.textSecondary,
    letterSpacing: 0.2,
    lineHeight: s(3) * 1.4,
    fontFamily: 'Inter-Regular',
  },
  cardCategory: {
    fontSize: s(3),
    fontWeight: '500',
    color: colors.accent,
    letterSpacing: 0.2,
    lineHeight: s(3) * 1.4,
    fontFamily: 'Inter-Medium',
    marginLeft: s(2),
  },
  separator: {
    height: s(2),
  },
});
