import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { AppIcon, AppIconName } from '../../components/AppIcon';
import { Header } from '../../components/Header';
import { Card } from '../../components/Card';
import { colors, spacing, radius } from '../../theme';
import { appointments, patients, doctors } from '../../utils/mockData';

const Metric = ({
  icon,
  value,
  label,
  tint,
}: {
  icon: AppIconName;
  value: string;
  label: string;
  tint: string;
}) => (
  <Card style={styles.metric}>
    <View style={[styles.metricIcon, { backgroundColor: tint + '18' }]}>
      <AppIcon name={icon} size={18} color={tint} />
    </View>
    <Text style={styles.metricValue}>{value}</Text>
    <Text style={styles.metricLabel}>{label}</Text>
  </Card>
);

export default function DashboardScreen({ navigation }: any) {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Header title="Good morning, Admin" subtitle="Monday, 2 November 2026" />
      <View style={styles.hero}>
        <View style={styles.heroCopy}>
          <Text style={styles.heroEyebrow}>TODAY AT A GLANCE</Text>
          <Text style={styles.heroTitle}>Care that keeps moving forward.</Text>
          <Text style={styles.heroText}>
            Your clinic is running smoothly today.
          </Text>
        </View>
        <View style={styles.heroIcon}>
          <AppIcon name="pulse" size={38} color={colors.accent} />
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Overview</Text>
        <Text style={styles.updated}>Live data</Text>
      </View>
      <View style={styles.metricsRow}>
        <Metric
          icon="people"
          value={`${patients.length * 12}`}
          label="Total patients"
          tint={colors.primary}
        />
        <Metric
          icon="calendar"
          value={`${appointments.length}`}
          label="Appointments"
          tint="#D97706"
        />
      </View>
      <View style={styles.metricsRow}>
        <Metric
          icon="medkit"
          value={`${doctors.filter(d => d.available).length}`}
          label="Doctors online"
          tint={colors.success}
        />
        <Metric
          icon="wallet"
          value="₹18.5k"
          label="Today's revenue"
          tint="#B05FC2"
        />
      </View>

      <View style={[styles.sectionHeader, { marginTop: 10 }]}>
        <Text style={styles.sectionTitle}>Upcoming appointments</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Patients')}
          accessibilityRole="button"
          accessibilityLabel="View all patients"
        >
          <Text style={styles.viewAll}>View all</Text>
        </TouchableOpacity>
      </View>
      {appointments.slice(0, 3).map((appointment, index) => (
        <Card key={appointment.id} style={styles.appointment}>
          <View
            style={[
              styles.timeRail,
              { backgroundColor: index === 0 ? colors.primary : colors.accent },
            ]}
          />
          <View style={styles.appointmentMain}>
            <View style={styles.appointmentTop}>
              <Text style={styles.time}>{appointment.time}</Text>
              <View style={styles.status}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>{appointment.status}</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                const patient = patients.find(
                  item => item.name === appointment.patientName,
                );
                if (patient) {
                  navigation.navigate('Patients', {
                    screen: 'PatientDetails',
                    params: { patient },
                  });
                }
              }}
              accessibilityRole="button"
              accessibilityLabel={`View ${appointment.patientName} details`}
            >
              <Text style={styles.patient}>{appointment.patientName}</Text>
            </TouchableOpacity>
            <Text style={styles.doctor}>
              {appointment.doctorName} · {appointment.type}
            </Text>
          </View>
          <AppIcon name="chevron" size={18} color={colors.textLight} />
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { paddingBottom: spacing.lg },
  hero: {
    marginHorizontal: spacing.lg,
    padding: spacing.lg,
    borderRadius: radius.xl,
    backgroundColor: colors.secondary,
    flexDirection: 'row',
    overflow: 'hidden',
    minHeight: 148,
  },
  heroCopy: { flex: 1 },
  heroEyebrow: {
    fontSize: 10,
    letterSpacing: 1.4,
    fontWeight: '800',
    color: '#8CCAC5',
  },
  heroTitle: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 9,
  },
  heroText: { fontSize: 12, color: '#B8C9D5', marginTop: 8 },
  heroIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#FFFFFF12',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: spacing.lg,
    marginTop: 24,
    marginBottom: 11,
  },
  sectionTitle: { fontSize: 17, fontWeight: '800', color: colors.text },
  updated: { fontSize: 11, color: colors.success, fontWeight: '700' },
  viewAll: { fontSize: 12, fontWeight: '700', color: colors.primary },
  metricsRow: {
    flexDirection: 'row',
    gap: 12,
    marginHorizontal: spacing.lg,
    marginBottom: 12,
  },
  metric: { flex: 1, padding: 14 },
  metricIcon: {
    width: 34,
    height: 34,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  metricValue: { fontSize: 23, fontWeight: '800', color: colors.text },
  metricLabel: { fontSize: 11, color: colors.textLight, marginTop: 3 },
  appointment: {
    marginHorizontal: spacing.lg,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
  },
  timeRail: {
    width: 4,
    alignSelf: 'stretch',
    borderRadius: 4,
    marginRight: 12,
  },
  appointmentMain: { flex: 1 },
  appointmentTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  time: { fontSize: 12, fontWeight: '800', color: colors.primary },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F3F2',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  statusDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.success,
    marginRight: 5,
  },
  statusText: {
    fontSize: 9,
    fontWeight: '700',
    color: colors.success,
    textTransform: 'capitalize',
  },
  patient: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.text,
    marginTop: 8,
  },
  doctor: { fontSize: 11, color: colors.textLight, marginTop: 3 },
});
