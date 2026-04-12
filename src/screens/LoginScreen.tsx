import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { colors } from '../lib/theme';
import { login, getSession } from '../lib/api';

interface Props {
  onLogin: (user: { id: string; name: string; email: string; role: string; mustChangePassword?: boolean }) => void;
}

export function LoginScreen({ onLogin }: Props) {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!emailOrPhone || !password) return;
    setLoading(true);
    try {
      const ok = await login(emailOrPhone, password);
      if (ok) {
        const session = await getSession();
        if (session.data?.user) {
          onLogin(session.data.user);
        } else {
          Alert.alert('Error', 'Failed to get session');
        }
      } else {
        Alert.alert('Login Failed', 'Invalid email/phone or password');
      }
    } catch {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.inner}>
        <Text style={styles.logo}>
          Roof<Text style={{ color: colors.teal }}>ax</Text>
        </Text>
        <Text style={styles.subtitle}>Sign in to your account</Text>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Email or phone number"
            placeholderTextColor={colors.slate[400]}
            value={emailOrPhone}
            onChangeText={setEmailOrPhone}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={colors.slate[400]}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.buttonText}>{loading ? 'Signing in...' : 'Sign In →'}</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>
          Don't have an account?{' '}
          <Text style={{ color: colors.teal, fontWeight: '600' }}>Sign up</Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  inner: { flex: 1, justifyContent: 'center', paddingHorizontal: 32 },
  logo: { fontSize: 36, fontWeight: '900', color: colors.dark, textAlign: 'center', marginBottom: 8 },
  subtitle: { fontSize: 15, color: colors.slate[500], textAlign: 'center', marginBottom: 32 },
  form: { gap: 12 },
  input: {
    backgroundColor: colors.slate[50],
    borderWidth: 2,
    borderColor: colors.slate[200],
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: colors.dark,
  },
  button: {
    backgroundColor: colors.teal,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 4,
    shadowColor: colors.teal,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: colors.white, fontSize: 16, fontWeight: '700' },
  footer: { textAlign: 'center', marginTop: 24, fontSize: 12, color: colors.slate[400] },
});
