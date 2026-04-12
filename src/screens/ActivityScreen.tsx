import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, RefreshControl } from 'react-native';
import { colors } from '../lib/theme';
import { getProperties, getProperty, WorkRecord, PropertyDetail } from '../lib/api';

export function ActivityScreen({ navigation }: { navigation: any }) {
  const [records, setRecords] = useState<WorkRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = async () => {
    try {
      const props = await getProperties();
      const first = props.data?.items?.[0];
      if (first) {
        const detail = await getProperty(first.id);
        if (detail.data?.workRecords) setRecords(detail.data.workRecords);
      }
    } catch { /* ignore */ }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const onRefresh = async () => { setRefreshing(true); await load(); setRefreshing(false); };

  const statusColor: Record<string, string> = {
    SUBMITTED: colors.orange,
    MATCHED: colors.teal,
    COMPLETE: colors.green,
    IN_PROGRESS: colors.amber,
  };

  const tradeIcon: Record<string, string> = {
    ROOFING: '🏗️', GUTTERS: '💧', FLASHING: '🔩', VENTILATION: '💨',
    INSULATION: '🧱', HAIL_DAMAGE: '⛈️', SUNLIGHT: '☀️', OTHER: '📌',
  };

  if (loading) {
    return <View style={styles.loading}><Text style={{ fontSize: 14, color: colors.slate[400] }}>Loading activity...</Text></View>;
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.teal} />}
    >
      <Text style={styles.header}>Activity</Text>
      <Text style={styles.subheader}>{records.length} work record{records.length !== 1 ? 's' : ''}</Text>

      {records.length === 0 ? (
        <View style={styles.empty}>
          <Text style={{ fontSize: 40, marginBottom: 8 }}>📋</Text>
          <Text style={styles.emptyText}>No work records yet</Text>
          <Text style={styles.emptySubtext}>Your contractor activity will appear here</Text>
        </View>
      ) : (
        <View style={{ gap: 8, marginTop: 16 }}>
          {records
            .sort((a, b) => new Date(b.jobDate).getTime() - new Date(a.jobDate).getTime())
            .map((r) => (
              <TouchableOpacity
                key={r.id}
                style={styles.recordCard}
                onPress={() => navigation.navigate('ProjectDetail', { recordId: r.id })}
                activeOpacity={0.7}
              >
                <View style={styles.recordIcon}>
                  <Text style={{ fontSize: 18 }}>{tradeIcon[r.trade] ?? '📋'}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.recordTitle}>{r.jobType}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 }}>
                    {r.contractor?.logoUrl && (
                      <Image source={{ uri: r.contractor.logoUrl }} style={{ width: 12, height: 12, borderRadius: 3 }} />
                    )}
                    <Text style={styles.recordContractor}>{r.contractor?.companyName ?? 'Contractor'}</Text>
                  </View>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <View style={[styles.statusBadge, { backgroundColor: (statusColor[r.status] ?? colors.slate[400]) + '20' }]}>
                    <Text style={[styles.statusText, { color: statusColor[r.status] ?? colors.slate[500] }]}>
                      {r.status.replace('_', ' ')}
                    </Text>
                  </View>
                  <Text style={styles.recordDate}>
                    {new Date(r.jobDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.slate[50] },
  content: { padding: 16, paddingBottom: 32 },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { fontSize: 22, fontWeight: '900', color: colors.dark },
  subheader: { fontSize: 13, color: colors.slate[500], marginTop: 2 },
  empty: { alignItems: 'center', paddingVertical: 48, backgroundColor: colors.white, borderRadius: 16, marginTop: 16 },
  emptyText: { fontSize: 15, fontWeight: '600', color: colors.slate[500] },
  emptySubtext: { fontSize: 12, color: colors.slate[400], marginTop: 4 },
  recordCard: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: colors.white, borderRadius: 14, padding: 14,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 2,
  },
  recordIcon: { width: 40, height: 40, borderRadius: 12, backgroundColor: colors.slate[50], justifyContent: 'center', alignItems: 'center' },
  recordTitle: { fontSize: 14, fontWeight: '700', color: colors.dark },
  recordContractor: { fontSize: 11, color: colors.slate[400] },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 },
  statusText: { fontSize: 9, fontWeight: '800' },
  recordDate: { fontSize: 10, color: colors.slate[400], marginTop: 4 },
});
