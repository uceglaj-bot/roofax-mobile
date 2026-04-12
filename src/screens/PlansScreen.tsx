import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../lib/theme';
import { getSubscription } from '../lib/api';

const PLANS = [
  {
    key: 'basic', name: 'Basic', price: 'Free', icon: '📊',
    desc: 'Know your roof condition. Catch issues early.',
    features: ['1 inspection/year', 'Roof Score (0–100)', 'Photo documentation', 'Maintenance alerts', 'Member dashboard'],
    excluded: ['Leak repair coverage'],
  },
  {
    key: 'protect', name: 'Protect', price: 'Coming Soon', icon: '🛡️', featured: true,
    desc: 'Real coverage for real leaks. We handle it.',
    features: ['Everything in Basic', 'Leak coverage up to $1,000/yr', 'Wear & tear, flashing, aging', '$95 service fee per claim', 'Vetted contractor dispatch'],
    excluded: [],
  },
  {
    key: 'pro', name: 'Pro', price: 'Coming Soon', icon: '⚡',
    desc: 'Maximum coverage. Priority everything.',
    features: ['Everything in Protect', 'Coverage up to $2,500/yr', '2 inspections/year', 'Gutter cleaning included', 'Priority dispatch (24–48 hrs)', 'Preventative checks'],
    excluded: [],
  },
];

export function PlansScreen() {
  const [currentPlan, setCurrentPlan] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    getSubscription().then((res) => {
      if (res.data) { setCurrentPlan(res.data.plan); setStatus(res.data.status); }
    });
  }, []);

  const isActive = status === 'active' || status === 'trialing';

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.header}>Choose a Plan</Text>
      <Text style={styles.sub}>Cancel anytime · No long-term contracts</Text>

      {isActive && currentPlan && (
        <View style={styles.currentBadge}>
          <Text style={styles.currentText}>✓ You're on {currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)}</Text>
        </View>
      )}

      {PLANS.map((plan) => {
        const isCurrent = isActive && currentPlan === plan.key;
        return (
          <View key={plan.key} style={[styles.planCard, plan.featured && styles.planFeatured, isCurrent && styles.planCurrent]}>
            {plan.featured && <View style={styles.recBadge}><Text style={styles.recText}>⭐ RECOMMENDED</Text></View>}
            <View style={styles.planHeader}>
              <View>
                <Text style={[styles.planName, plan.featured && { color: colors.teal }]}>{plan.name}</Text>
                <Text style={styles.planPrice}><Text style={styles.planPriceBig}>{plan.price}</Text>{plan.price.startsWith('$') ? '/mo' : ''}</Text>
              </View>
              <Text style={{ fontSize: 28 }}>{plan.icon}</Text>
            </View>
            <Text style={styles.planDesc}>{plan.desc}</Text>
            {plan.features.map((f) => (
              <View key={f} style={styles.featureRow}>
                <Text style={{ color: colors.teal, fontWeight: '700', fontSize: 13 }}>✓</Text>
                <Text style={styles.featureText}>{f}</Text>
              </View>
            ))}
            {plan.excluded.map((f) => (
              <View key={f} style={styles.featureRow}>
                <Text style={{ color: '#d1d5db', fontWeight: '700', fontSize: 13 }}>✕</Text>
                <Text style={[styles.featureText, { color: '#9ca3af', textDecorationLine: 'line-through' }]}>{f}</Text>
              </View>
            ))}
            <TouchableOpacity
              style={[styles.planBtn, plan.key === 'basic' ? styles.planBtnPrimary : styles.planBtnSecondary]}
              onPress={() => {
                if (plan.key !== 'basic') return;
                // Basic is free — no payment needed
              }}
              disabled={plan.key !== 'basic'}
            >
              <Text style={[styles.planBtnText, plan.key === 'basic' ? { color: '#fff' } : { color: '#8E8E93' }]}>
                {isCurrent ? 'Current Plan' : plan.key === 'basic' ? 'Get Started — Free' : 'Coming Soon'}
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}

      <Text style={styles.disclaimer}>Pre-existing damage identified during inspection is not covered. Roofax is a home service contract, not insurance.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.slate[50] },
  content: { padding: 20, paddingBottom: 40 },
  header: { fontSize: 28, fontWeight: '900', color: '#000', textAlign: 'center', letterSpacing: -0.5 },
  sub: { fontSize: 14, color: '#8E8E93', textAlign: 'center', marginTop: 4, marginBottom: 16 },
  currentBadge: { alignSelf: 'center', backgroundColor: 'rgba(0,201,167,0.1)', paddingHorizontal: 16, paddingVertical: 6, borderRadius: 100, marginBottom: 16 },
  currentText: { fontSize: 13, fontWeight: '700', color: colors.teal },
  planCard: { backgroundColor: '#fff', borderRadius: 16, padding: 20, marginBottom: 12, borderWidth: 2, borderColor: 'transparent', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 8, elevation: 2 },
  planFeatured: { borderColor: colors.teal },
  planCurrent: { borderColor: colors.teal },
  recBadge: { position: 'absolute', top: -12, alignSelf: 'center', backgroundColor: colors.teal, paddingHorizontal: 14, paddingVertical: 4, borderRadius: 100 },
  recText: { fontSize: 10, fontWeight: '800', color: '#fff', letterSpacing: 0.5 },
  planHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8, marginTop: 4 },
  planName: { fontSize: 12, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 1.5, color: '#8E8E93' },
  planPrice: { fontSize: 14, color: '#8E8E93', marginTop: 4 },
  planPriceBig: { fontSize: 30, fontWeight: '900', color: '#000' },
  planDesc: { fontSize: 13, color: '#636366', lineHeight: 18, marginBottom: 14 },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  featureText: { fontSize: 13, color: '#000' },
  planBtn: { marginTop: 8, borderRadius: 12, paddingVertical: 14, alignItems: 'center' },
  planBtnPrimary: { backgroundColor: colors.teal },
  planBtnSecondary: { backgroundColor: '#F2F2F7' },
  planBtnText: { fontSize: 15, fontWeight: '700' },
  disclaimer: { fontSize: 11, color: '#8E8E93', textAlign: 'center', marginTop: 8, lineHeight: 16 },
});
