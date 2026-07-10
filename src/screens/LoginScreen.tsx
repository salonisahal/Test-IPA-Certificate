import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../navigation';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';
import { PrimaryButton } from '../components/PrimaryButton';

export default function LoginScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Login'>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }
    if (email === 'demo@saas.com' && password === 'password') {
      setError('');
      navigation.replace('MainTabs');
      return;
    }
    setError('Invalid credentials. Try demo@saas.com / password.');
  };

  const handlePlaceholder = (label: string) => {
    setError(`${label} sign-in is a placeholder.`);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to manage your SaaS workspace.</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="you@company.com"
                placeholderTextColor={colors.textDisabled}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                underlineColorAndroid="transparent"
                selectionColor={colors.primary}
                style={styles.input}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                placeholderTextColor={colors.textDisabled}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry
                returnKeyType="done"
                underlineColorAndroid="transparent"
                selectionColor={colors.primary}
                style={styles.input}
              />
            </View>
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <PrimaryButton label="Sign In" onPress={handleLogin} />
            <Pressable
              onPress={() => navigation.navigate('ForgotPassword')}
              android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
              style={({ pressed }) => [styles.link, pressed && Platform.OS === 'ios' && { opacity: 0.7 }]}
            >
              <Text style={styles.linkText}>Forgot password?</Text>
            </Pressable>
          </View>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.socialRow}>
            <Pressable
              onPress={() => handlePlaceholder('Apple')}
              android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
              style={({ pressed }) => [styles.socialButton, pressed && Platform.OS === 'ios' && { opacity: 0.7 }]}
            >
              <Ionicons name="logo-apple" size={20} color={colors.textPrimary} />
              <Text style={styles.socialText}>Apple</Text>
            </Pressable>
            <Pressable
              onPress={() => handlePlaceholder('Google')}
              android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
              style={({ pressed }) => [styles.socialButton, pressed && Platform.OS === 'ios' && { opacity: 0.7 }]}
            >
              <Ionicons name="logo-google" size={20} color={colors.textPrimary} />
              <Text style={styles.socialText}>Google</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
    ...(Platform.OS === 'web' ? { overflow: 'hidden' as any, maxHeight: '100vh' as any } : {}),
  },
  keyboard: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: s(4),
    paddingTop: s(6),
    gap: s(4),
  },
  header: {
    gap: s(1),
  },
  title: {
    fontSize: s(7),
    fontWeight: '700',
    color: colors.textPrimary,
    letterSpacing: -0.5,
    lineHeight: s(7) * 1.2,
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
  form: {
    gap: s(3),
  },
  inputGroup: {
    gap: s(1),
  },
  label: {
    fontSize: s(3),
    fontWeight: '500',
    color: colors.textSecondary,
    letterSpacing: 0.2,
    lineHeight: s(3) * 1.4,
    fontFamily: 'Inter-Medium',
  },
  input: {
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
  error: {
    fontSize: s(3),
    fontWeight: '500',
    color: colors.error,
    letterSpacing: 0.2,
    lineHeight: s(3) * 1.4,
    fontFamily: 'Inter-Medium',
  },
  link: {
    alignSelf: 'flex-start',
    paddingVertical: s(1),
  },
  linkText: {
    fontSize: s(3),
    fontWeight: '600',
    color: colors.primary,
    letterSpacing: 0.2,
    lineHeight: s(3) * 1.4,
    fontFamily: 'Inter-SemiBold',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(2),
  },
  dividerLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
  },
  dividerText: {
    fontSize: s(3),
    fontWeight: '500',
    color: colors.textSecondary,
    letterSpacing: 0.2,
    lineHeight: s(3) * 1.4,
    fontFamily: 'Inter-Medium',
  },
  socialRow: {
    flexDirection: 'row',
    gap: s(3),
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: s(2),
    paddingVertical: s(3),
    borderRadius: s(2),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  socialText: {
    fontSize: s(3),
    fontWeight: '600',
    color: colors.textPrimary,
    letterSpacing: 0.2,
    lineHeight: s(3) * 1.4,
    fontFamily: 'Inter-SemiBold',
  },
});
