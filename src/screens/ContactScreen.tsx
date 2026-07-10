import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';
import { PrimaryButton } from '../components/PrimaryButton';

export default function ContactScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = () => {
    if (!name || !email || !message) {
      setStatus('Name, email, and message are required.');
      return;
    }
    setStatus('Submitted successfully. We will reply within 24 hours.');
    setName('');
    setEmail('');
    setCompany('');
    setMessage('');
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
          <Text style={styles.title}>Contact us</Text>
          <Text style={styles.subtitle}>Send a note to the support team.</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full name</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Alex Morgan"
              placeholderTextColor={colors.textDisabled}
              autoCapitalize="words"
              autoCorrect={false}
              returnKeyType="next"
              underlineColorAndroid="transparent"
              selectionColor={colors.primary}
              style={styles.input}
            />
          </View>
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
            <Text style={styles.label}>Company</Text>
            <TextInput
              value={company}
              onChangeText={setCompany}
              placeholder="Acme Inc"
              placeholderTextColor={colors.textDisabled}
              autoCapitalize="words"
              autoCorrect={false}
              returnKeyType="next"
              underlineColorAndroid="transparent"
              selectionColor={colors.primary}
              style={styles.input}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Message</Text>
            <TextInput
              value={message}
              onChangeText={setMessage}
              placeholder="How can we help?"
              placeholderTextColor={colors.textDisabled}
              autoCapitalize="sentences"
              autoCorrect={true}
              returnKeyType="done"
              underlineColorAndroid="transparent"
              selectionColor={colors.primary}
              style={styles.messageInput}
              multiline
            />
          </View>
          {status ? <Text style={styles.status}>{status}</Text> : null}
          <PrimaryButton label="Send message" onPress={handleSubmit} />
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
    paddingTop: s(5),
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
  subtitle: {
    fontSize: s(4),
    fontWeight: '400',
    color: colors.textSecondary,
    letterSpacing: 0.2,
    lineHeight: s(4) * 1.4,
    fontFamily: 'Inter-Regular',
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
  messageInput: {
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
    minHeight: s(20),
    textAlignVertical: 'top',
  },
  status: {
    fontSize: s(3),
    fontWeight: '500',
    color: colors.info,
    letterSpacing: 0.2,
    lineHeight: s(3) * 1.4,
    fontFamily: 'Inter-Medium',
  },
});
