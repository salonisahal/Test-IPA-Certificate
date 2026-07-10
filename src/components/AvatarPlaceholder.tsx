import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';

interface AvatarPlaceholderProps {
  size?: number;
}

export function AvatarPlaceholder({ size = s(10) }: AvatarPlaceholderProps) {
  return (
    <View style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]}> 
      <Ionicons name="person" size={size / 2} color={colors.textInverse} />
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
