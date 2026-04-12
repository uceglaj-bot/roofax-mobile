import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, RefreshControl, TouchableOpacity, Image } from 'react-native';
import { colors } from '../lib/theme';
import { getProperties, getSubscription, Property } from '../lib/api';
import Svg, { Circle } from 'react-native-svg';

export function DashboardScreen({ navigation }: { navigation: any }) {
  const [property, setProperty] = useState<Property | null>(null);
  const [sub, setSub] = useState<{ plan: string | null; status: string | null } | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    try {
      const [propRes, subRes] = await Promise.all([getProperties(), getSubscription()]);
      if (propRes.data?.items?.[0]) setProperty(propRes.data.items[0]);
      if (subRes.data) setSub(subRes.data);
    } catch { /* ignore */ }
    setLoading(false);
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingEmoji}>🏠</Text>
        <Text style={styles.loadingText}>Loading your home...</Text>
      </View>
    );
  }

  const score = property?.roofScore;
  const hasScore = score !== null && score !== undefined;
  const scoreColor = !hasScore ? colors.slate[400] : score >= 75 ? colors.green : score >= 50 ? colors.amber : colors.red;
  const scoreLabel = !hasScore ? '—' : score >= 75 ? 'Good' : score >= 50 ? 'Fair' : 'Poor';

  const isActive = sub?.status === 'active' || sub?.status === 'trialing';
  const plan = sub?.plan ?? '';
  const planLabel = plan === 'pro' ? 'Pro' : plan === 'protect' ? 'Protect' : plan === 'basic' ? 'Basic' : null;
  const coverageLimit = plan === 'pro' ? 2500 : plan === 'protect' ? 1000 : 0;

  const r = 50;
  const circ = 2 * Math.PI * r;
  const offset = hasScore ? circ - (score / 100) * circ : circ;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.teal} />}
    >
      {/* Address header */}
      {property && (
        <View style={styles.addressBar}>
          <Text style={styles.addressText}>📍 {property.address}, {property.city} {property.state}</Text>
          <Text style={styles.homeId}>{property.homeId}</Text>
        </View>
      )}

      {/* Score + Spend side by side */}
      <View style={styles.cardRow}>
        {/* Roof Score Card */}
        <View style={styles.card}>
          <View style={styles.cardDarkHeader}>
            <View style={styles.cardHeaderRow}>
              <Text style={styles.cardTitle}>🏠 Score</Text>
              {hasScore && (
                <View style={[styles.badge, { backgroundColor: scoreColor }]}>
                  <Text style={styles.badgeText}>{scoreLabel}</Text>
                </View>
              )}
            </View>
            <View style={styles.ringContainer}>
              <Svg width={100} height={100} viewBox="0 0 112 112" style={{ transform: [{ rotate: '-90deg' }] }}>
                <Circle cx={56} cy={56} r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={8} />
                <Circle cx={56} cy={56} r={r} fill="none" stroke={scoreColor} strokeWidth={8} strokeLinecap="round"
                  strokeDasharray={`${circ}`} strokeDashoffset={`${offset}`} />
              </Svg>
              <View style={styles.ringCenter}>
                <Text style={[styles.scoreNumber, { color: '#fff' }]}>{hasScore ? score : '?'}</Text>
                <Text style={styles.scoreLabel}>/ 100</Text>
              </View>
            </View>
          </View>
          <View style={styles.cardLightBody}>
            <View style={styles.metricsGrid}>
              <MetricBox label="Condition" value={property?.roofCondition ?? '—'} color={scoreColor} />
              <MetricBox label="Roof Age" value={property?.roofAgeYears ? `${property.roofAgeYears} yrs` : '—'} />
              <MetricBox label="Life Left" value={property?.roofRemainingYears ? `${property.roofRemainingYears} yrs` : '—'} />
              <MetricBox label="Inspected" value={property?.roofScoreDate ? new Date(property.roofScoreDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '—'} />
            </View>
          </View>
        </View>

        {/* Spend Card */}
        <View style={styles.card}>
          <View style={styles.cardDarkHeader}>
            <View style={styles.cardHeaderRow}>
              <Text style={styles.cardTitle}>💰 Spend</Text>
              {isActive && planLabel ? (
                <View style={[styles.badge, { backgroundColor: colors.teal }]}>
                  <Text style={styles.badgeText}>{planLabel}</Text>
                </View>
              ) : (
                <View style={[styles.badge, { backgroundColor: 'rgba(255,255,255,0.15)' }]}>
                  <Text style={[styles.badgeText, { opacity: 0.7 }]}>No Plan</Text>
                </View>
              )}
            </View>
            <View style={{ alignItems: 'center', paddingVertical: 12 }}>
              <Text style={styles.spendAmount}>$0</Text>
              <Text style={styles.spendLabel}>total spent</Text>
              <View style={styles.scaleBar}>
                <View style={[styles.scaleFill, { width: '0%', backgroundColor: colors.teal }]} />
                <View style={[styles.scaleMark, { left: '40%' }]} />
              </View>
              <View style={styles.scaleLabels}>
                <Text style={styles.scaleText}>$0</Text>
                <Text style={styles.scaleText}>$2,500</Text>
              </View>
            </View>
          </View>
          <View style={styles.cardLightBody}>
            <View style={styles.metricsGrid}>
              <MetricBox label="Records" value="0" />
              <MetricBox label="Active" value="0" />
              <MetricBox label="Coverage" value={coverageLimit > 0 ? `$${coverageLimit.toLocaleString()}` : '—'} color={coverageLimit > 0 ? colors.teal : undefined} />
              <MetricBox label="Plan" value={planLabel ?? 'None'} color={isActive ? colors.teal : undefined} />
            </View>
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.actionBtn} onPress={() => navigation.navigate('Activity')}>
          <Text style={styles.actionIcon}>📋</Text>
          <Text style={styles.actionLabel}>Activity</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} onPress={() => navigation.navigate('Plans')}>
          <Text style={styles.actionIcon}>🛡️</Text>
          <Text style={styles.actionLabel}>Plans</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <Text style={styles.actionIcon}>🔧</Text>
          <Text style={styles.actionLabel}>Repair</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} onPress={() => navigation.navigate('Settings')}>
          <Text style={styles.actionIcon}>⚙️</Text>
          <Text style={styles.actionLabel}>Settings</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function MetricBox({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <View style={styles.metricBox}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={[styles.metricValue, color ? { color } : {}]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.slate[50] },
  content: { padding: 16, paddingBottom: 32 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.slate[50] },
  loadingEmoji: { fontSize: 40, marginBottom: 12 },
  loadingText: { fontSize: 14, color: colors.slate[400] },

  addressBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, paddingHorizontal: 4 },
  addressText: { fontSize: 13, fontWeight: '600', color: colors.slate[700], flex: 1 },
  homeId: { fontSize: 11, fontWeight: '700', color: colors.teal, backgroundColor: colors.tealBg, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8, overflow: 'hidden' },

  cardRow: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  card: { flex: 1, borderRadius: 16, overflow: 'hidden', backgroundColor: colors.white, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  cardDarkHeader: { backgroundColor: colors.dark, padding: 14, minHeight: 180 },
  cardHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  cardTitle: { fontSize: 13, fontWeight: '700', color: '#fff' },
  badge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  badgeText: { fontSize: 9, fontWeight: '800', color: '#fff' },

  cardLightBody: { padding: 10 },
  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  metricBox: { width: '47%', backgroundColor: colors.slate[50], borderRadius: 10, paddingVertical: 8, paddingHorizontal: 10, alignItems: 'center' },
  metricLabel: { fontSize: 8, fontWeight: '800', color: colors.slate[400], textTransform: 'uppercase', letterSpacing: 0.5 },
  metricValue: { fontSize: 13, fontWeight: '900', color: colors.dark, marginTop: 2 },

  ringContainer: { alignItems: 'center', justifyContent: 'center', marginTop: 4 },
  ringCenter: { position: 'absolute', alignItems: 'center' },
  scoreNumber: { fontSize: 28, fontWeight: '900' },
  scoreLabel: { fontSize: 9, color: 'rgba(255,255,255,0.5)', marginTop: -2 },

  spendAmount: { fontSize: 32, fontWeight: '900', color: '#fff' },
  spendLabel: { fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 2, marginBottom: 12 },
  scaleBar: { width: '100%', height: 8, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 4, overflow: 'visible', position: 'relative' },
  scaleFill: { height: '100%', borderRadius: 4 },
  scaleMark: { position: 'absolute', top: 0, width: 1, height: 8, backgroundColor: 'rgba(255,255,255,0.3)' },
  scaleLabels: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 4 },
  scaleText: { fontSize: 8, color: 'rgba(255,255,255,0.3)' },

  actionsRow: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  actionBtn: { flex: 1, backgroundColor: colors.white, borderRadius: 14, paddingVertical: 16, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 2 },
  actionIcon: { fontSize: 24, marginBottom: 6 },
  actionLabel: { fontSize: 11, fontWeight: '700', color: colors.slate[700] },
});
