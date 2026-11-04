import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Header } from '../../components/Header';
import { Card } from '../../components/Card';
import { AppIcon } from '../../components/AppIcon';
import { colors, spacing, radius } from '../../theme';
import { appointments } from '../../utils/mockData';
import { Appointment } from '../../types';
import { api } from '../../utils/api';

const tabs = ['all', 'upcoming', 'completed', 'cancelled'] as const;

export default function AppointmentsScreen({ navigation }: any) {
  const [tab, setTab] = useState<(typeof tabs)[number]>('all');
  const [appointmentList, setAppointmentList] = useState<Appointment[]>(appointments);
  useEffect(() => {
    api.getAppointments().then(setAppointmentList).catch(() => undefined);
  }, []);
  const data =
    tab === 'all'
      ? appointmentList
      : appointmentList.filter(a => a.status === tab);
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header title="Appointments" subtitle="Manage daily schedule" />
      <View style={styles.tabRow}>
        {tabs.map(t => (
          <TouchableOpacity
            key={t}
            onPress={() => setTab(t)}
            style={[styles.tab, tab === t && styles.tabActive]}
          >
            <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>
              {t}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={data}
        keyExtractor={i => i.id}
        contentContainerStyle={{ padding: spacing.md }}
        renderItem={({ item }) => (
          <Card style={{ marginBottom: 12 }}>
            <Text style={{ fontWeight: '700', color: colors.text }}>
              {item.patientName} → {item.doctorName}
            </Text>
            <Text style={{ color: colors.textLight, marginTop: 4 }}>
              {item.date} at {item.time} • {item.type}
            </Text>
            <View style={{ flexDirection: 'row', gap: 8, marginTop: 10 }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Prescription', {
                    patient: item.patientName,
                  })
                }
                style={[styles.smallBtn, { backgroundColor: colors.secondary }]}
              >
                <Text
                  style={{ color: '#fff', fontSize: 12, fontWeight: '700' }}
                >
                  Rx
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.smallBtn, { backgroundColor: '#FEF3C7' }]}
              >
                <Text style={{ fontSize: 12, fontWeight: '700' }}>
                  Reschedule
                </Text>
              </TouchableOpacity>
              <View
                style={[
                  styles.status,
                  {
                    backgroundColor:
                      item.status === 'completed'
                        ? '#DCFCE7'
                        : item.status === 'cancelled'
                        ? '#FEE2E2'
                        : '#DBEAFE',
                  },
                ]}
              >
                <Text style={{ fontSize: 11, fontWeight: '600' }}>
                  {item.status}
                </Text>
              </View>
            </View>
          </Card>
        )}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('BookAppointment')}
        accessibilityLabel="Book appointment"
      >
        <AppIcon name="plus" size={25} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  tabRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    gap: 8,
    marginBottom: 8,
  },
  tab: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radius.md,
    backgroundColor: colors.muted,
  },
  tabActive: { backgroundColor: colors.primary },
  tabText: {
    fontSize: 12,
    textTransform: 'capitalize',
    color: colors.textLight,
    fontWeight: '600',
  },
  tabTextActive: { color: '#fff' },
  status: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'center',
  },
  smallBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
  },
});
