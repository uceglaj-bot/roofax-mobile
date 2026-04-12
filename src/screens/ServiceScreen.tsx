import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, Alert, Linking } from 'react-native';
import { colors } from '../lib/theme';

export function ServiceScreen() {
  const [type, setType] = useState<'inspection' | 'repair' | null>(null);
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!type) { Alert.alert('Select a service type'); return; }
    // TODO: Call API to create service request
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <View style={styles.successContainer}>
        <Text style={{ fontSize: 48, marginBottom: 16 }}>✅</Text>
        <Text style={styles.successTitle}>Request Submitted!</Text>
        <Text style={styles.successSub}>We'll contact you within 24 hours to schedule your {type}.</Text>
        <TouchableOpacity style={styles.resetBtn} onPress={() => { setSubmitted(false); setType(null); setDescription(''); }}>
          <Text style={styles.resetText}>Submit Another Request</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.header}>What do you need?</Text>
      <Text style={styles.sub}>Select a service and we'll dispatch a vetted contractor.</Text>

      {/* Service type selection */}
      <TouchableOpacity
        style={[styles.optionCard, type === 'inspection' && styles.optionSelected]}
        onPress={() => setType('inspection')}
      >
        <Text style={styles.optionIcon}>🔍</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.optionTitle}>Roof Inspection</Text>
          <Text style={styles.optionDesc}>Professional assessment of your roof condition, Roof Score update, photo documentation.</Text>
        </View>
        <View style={[styles.radio, type === 'inspection' && styles.radioSelected]}>
          {type === 'inspection' && <View style={styles.radioDot} />}
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.optionCard, type === 'repair' && styles.optionSelected]}
        onPress={() => setType('repair')}
      >
        <Text style={styles.optionIcon}>🔧</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.optionTitle}>Repair Request</Text>
          <Text style={styles.optionDesc}>Leak, damaged shingles, flashing issues — we'll send a contractor to fix it.</Text>
        </View>
        <View style={[styles.radio, type === 'repair' && styles.radioSelected]}>
          {type === 'repair' && <View style={styles.radioDot} />}
        </View>
      </TouchableOpacity>

      {type && (
        <>
          <Text style={styles.sectionTitle}>Describe the issue</Text>
          <TextInput
            style={styles.textArea}
            placeholder={type === 'inspection' ? 'Any specific concerns? (optional)' : 'Describe the damage or issue...'}
            placeholderTextColor="#8E8E93"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />

          {type === 'repair' && (
            <View style={styles.feeNote}>
              <Text style={styles.feeIcon}>🛡️</Text>
              <Text style={styles.feeText}>Covered repairs: flat $95 service fee. We handle the rest up to your plan's annual limit.</Text>
            </View>
          )}

          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
            <Text style={styles.submitText}>Submit Request</Text>
          </TouchableOpacity>
        </>
      )}

      <View style={styles.callCard}>
        <Text style={{ fontSize: 18 }}>📞</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.callTitle}>Need immediate help?</Text>
          <Text style={styles.callSub}>Call your contractor directly</Text>
        </View>
        <TouchableOpacity style={styles.callBtn} onPress={() => Linking.openURL('tel:+12145077843')}>
          <Text style={styles.callBtnText}>Call</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F7' },
  content: { padding: 20, paddingBottom: 40 },
  header: { fontSize: 24, fontWeight: '900', color: '#000', letterSpacing: -0.5 },
  sub: { fontSize: 14, color: '#8E8E93', marginTop: 4, marginBottom: 20 },
  optionCard: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 10,
    borderWidth: 2, borderColor: 'transparent',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4,
  },
  optionSelected: { borderColor: colors.teal, backgroundColor: 'rgba(0,201,167,0.03)' },
  optionIcon: { fontSize: 28 },
  optionTitle: { fontSize: 16, fontWeight: '700', color: '#000' },
  optionDesc: { fontSize: 12, color: '#636366', marginTop: 2, lineHeight: 16 },
  radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: '#D1D1D6', justifyContent: 'center', alignItems: 'center' },
  radioSelected: { borderColor: colors.teal },
  radioDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: colors.teal },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: '#000', marginTop: 20, marginBottom: 10 },
  textArea: {
    backgroundColor: '#fff', borderRadius: 14, padding: 16, fontSize: 15,
    minHeight: 100, color: '#000', borderWidth: 1, borderColor: 'rgba(0,0,0,0.06)',
  },
  feeNote: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 10,
    backgroundColor: 'rgba(0,201,167,0.06)', borderRadius: 12, padding: 14, marginTop: 12,
  },
  feeIcon: { fontSize: 16, marginTop: 1 },
  feeText: { fontSize: 12, color: '#3A3A3C', lineHeight: 17, flex: 1 },
  submitBtn: { backgroundColor: colors.teal, borderRadius: 14, paddingVertical: 16, alignItems: 'center', marginTop: 16 },
  submitText: { color: '#fff', fontSize: 17, fontWeight: '700' },
  callCard: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: '#fff', borderRadius: 16, padding: 16, marginTop: 20,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4,
  },
  callTitle: { fontSize: 14, fontWeight: '700', color: '#000' },
  callSub: { fontSize: 11, color: '#8E8E93', marginTop: 1 },
  callBtn: { backgroundColor: '#007AFF', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10 },
  callBtnText: { color: '#fff', fontSize: 14, fontWeight: '700' },
  successContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F2F2F7', padding: 32 },
  successTitle: { fontSize: 24, fontWeight: '900', color: '#000' },
  successSub: { fontSize: 15, color: '#636366', textAlign: 'center', marginTop: 8, lineHeight: 22 },
  resetBtn: { marginTop: 24, paddingHorizontal: 24, paddingVertical: 14, borderRadius: 12, backgroundColor: 'rgba(0,0,0,0.04)' },
  resetText: { fontSize: 15, fontWeight: '600', color: '#000' },
});
