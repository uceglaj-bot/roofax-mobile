import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { colors } from '../lib/theme';
import { changePassword } from '../lib/api';

interface Props {
  onComplete: () => void;
}

export function ForcePasswordScreen({ onComplete }: Props) {
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async () => {
    if (newPw.length < 8) { Alert.alert('Error', 'Password must be at least 8 characters'); return; }
    if (newPw !== confirmPw) { Alert.alert('Error', 'Passwords do not match'); return; }
    setSaving(true);
    try {
      const res = await changePassword('1234', newPw);
      if (res.success) {
        onComplete();
      } else {
        Alert.alert('Error', res.error ?? 'Failed to update password');
      }
    } catch {
      Alert.alert('Error', 'Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.inner}>
        <Text style={{ fontSize: 48, textAlign: 'center', marginBottom: 16 }}>🔒</Text>
        <Text style={styles.title}>Set Your Password</Text>
        <Text style={styles.sub}>Please create a new password for your account.</Text>

        <View style={{ gap: 12, marginTop: 24 }}>
          <TextInput
            style={styles.input}
            placeholder="New password (min 8 characters)"
            placeholderTextColor="#8E8E93"
            secureTextEntry
            value={newPw}
            onChangeText={setNewPw}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm password"
            placeholderTextColor="#8E8E93"
            secureTextEntry
            value={confirmPw}
            onChangeText={setConfirmPw}
            onSubmitEditing={handleSubmit}
          />
          <TouchableOpacity
            style={[styles.button, saving && { opacity: 0.6 }]}
            onPress={handleSubmit}
            disabled={saving}
          >
            <Text style={styles.buttonText}>{saving ? 'Saving...' : 'Set Password'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  inner: { flex: 1, justifyContent: 'center', paddingHorizontal: 32 },
  title: { fontSize: 24, fontWeight: '900', color: '#000', textAlign: 'center' },
  sub: { fontSize: 14, color: '#8E8E93', textAlign: 'center', marginTop: 6 },
  input: {
    backgroundColor: 'rgba(118,118,128,0.12)', borderRadius: 12,
    paddingHorizontal: 16, paddingVertical: 14, fontSize: 16, color: '#000',
  },
  button: {
    backgroundColor: colors.teal, borderRadius: 14, paddingVertical: 16, alignItems: 'center', marginTop: 8,
  },
  buttonText: { color: '#fff', fontSize: 17, fontWeight: '700' },
});
