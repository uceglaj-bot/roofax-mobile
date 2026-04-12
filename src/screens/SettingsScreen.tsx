import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { colors } from '../lib/theme';
import { changePassword } from '../lib/api';

interface Props {
  user: { name: string; email: string } | null;
  onLogout: () => void;
}

export function SettingsScreen({ user, onLogout }: Props) {
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [saving, setSaving] = useState(false);

  const handleChangePassword = async () => {
    if (newPw.length < 8) { Alert.alert('Error', 'Password must be at least 8 characters'); return; }
    if (newPw !== confirmPw) { Alert.alert('Error', 'Passwords do not match'); return; }
    setSaving(true);
    try {
      const res = await changePassword(currentPw, newPw);
      if (res.success) {
        Alert.alert('Success', 'Password updated');
        setCurrentPw(''); setNewPw(''); setConfirmPw('');
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
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.header}>Settings</Text>

      {/* Profile */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>👤 Profile</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Name</Text>
          <Text style={styles.infoValue}>{user?.name ?? '—'}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Email</Text>
          <Text style={styles.infoValue}>{user?.email ?? '—'}</Text>
        </View>
      </View>

      {/* Change Password */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🔒 Change Password</Text>
        <TextInput style={styles.input} placeholder="Current password" placeholderTextColor={colors.slate[400]}
          secureTextEntry value={currentPw} onChangeText={setCurrentPw} />
        <TextInput style={styles.input} placeholder="New password (min 8 chars)" placeholderTextColor={colors.slate[400]}
          secureTextEntry value={newPw} onChangeText={setNewPw} />
        <TextInput style={styles.input} placeholder="Confirm new password" placeholderTextColor={colors.slate[400]}
          secureTextEntry value={confirmPw} onChangeText={setConfirmPw} />
        <TouchableOpacity style={[styles.saveBtn, saving && { opacity: 0.6 }]} onPress={handleChangePassword} disabled={saving}>
          <Text style={styles.saveBtnText}>{saving ? 'Updating...' : 'Update Password'}</Text>
        </TouchableOpacity>
      </View>

      {/* Logout */}
      <TouchableOpacity style={styles.logoutBtn} onPress={onLogout}>
        <Text style={styles.logoutText}>🚪 Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.slate[50] },
  content: { padding: 16, paddingBottom: 48 },
  header: { fontSize: 22, fontWeight: '900', color: colors.dark, marginBottom: 16 },
  card: { backgroundColor: colors.white, borderRadius: 16, padding: 18, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 2, gap: 10 },
  cardTitle: { fontSize: 15, fontWeight: '800', color: colors.dark },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between' },
  infoLabel: { fontSize: 13, color: colors.slate[500] },
  infoValue: { fontSize: 13, fontWeight: '600', color: colors.dark },
  input: { backgroundColor: colors.slate[50], borderWidth: 2, borderColor: colors.slate[200], borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, fontSize: 14, color: colors.dark },
  saveBtn: { backgroundColor: colors.teal, borderRadius: 12, paddingVertical: 14, alignItems: 'center' },
  saveBtnText: { color: '#fff', fontSize: 14, fontWeight: '700' },
  logoutBtn: { backgroundColor: colors.white, borderRadius: 14, paddingVertical: 16, alignItems: 'center', marginTop: 8, borderWidth: 1.5, borderColor: colors.red },
  logoutText: { fontSize: 14, fontWeight: '700', color: colors.red },
});
