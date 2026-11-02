import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
} from 'react-native';
import { Header } from '../../components/Header';
import { AppIcon } from '../../components/AppIcon';
import { colors, spacing, radius } from '../../theme';

export default function SettingsScreen({ navigation }: any) {
  const [notifications, setNotifications] = useState(true);
  const [reminders, setReminders] = useState(true);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.backRow}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backArrow}>‹</Text>
          <Text style={styles.backText}>Profile</Text>
        </TouchableOpacity>
      </View>
      <Header title="Settings" subtitle="Manage your clinic preferences" />

      <Text style={styles.sectionTitle}>Notifications</Text>
      <View style={styles.card}>
        <SettingRow
          icon="notifications"
          title="Push notifications"
          subtitle="Receive updates about your clinic"
          value={notifications}
          onValueChange={setNotifications}
        />
        <View style={styles.divider} />
        <SettingRow
          icon="calendar"
          title="Appointment reminders"
          subtitle="Get reminders before appointments"
          value={reminders}
          onValueChange={setReminders}
        />
      </View>

      <Text style={styles.sectionTitle}>Clinic preferences</Text>
      <View style={styles.card}>
        <TouchableOpacity style={styles.linkRow}>
          <View style={styles.iconBox}>
            <AppIcon name="clinic" size={19} color={colors.primary} />
          </View>
          <View style={styles.rowCopy}>
            <Text style={styles.rowTitle}>Clinic information</Text>
            <Text style={styles.rowSubtitle}>
              Name, address and contact details
            </Text>
          </View>
          <AppIcon name="chevron" size={17} color={colors.textLight} />
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.linkRow}>
          <View style={[styles.iconBox, { backgroundColor: '#FFF3E7' }]}>
            <Text style={styles.currency}>₹</Text>
          </View>
          <View style={styles.rowCopy}>
            <Text style={styles.rowTitle}>Payment preferences</Text>
            <Text style={styles.rowSubtitle}>
              Manage billing and payment options
            </Text>
          </View>
          <AppIcon name="chevron" size={17} color={colors.textLight} />
        </TouchableOpacity>
      </View>

      <Text style={styles.version}>ClinicApp · Version 1.0.0</Text>
    </ScrollView>
  );
}

function SettingRow({
  icon,
  title,
  subtitle,
  value,
  onValueChange,
}: {
  icon: 'notifications' | 'calendar';
  title: string;
  subtitle: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}) {
  return (
    <View style={styles.linkRow}>
      <View style={styles.iconBox}>
        <AppIcon name={icon} size={19} color={colors.primary} />
      </View>
      <View style={styles.rowCopy}>
        <Text style={styles.rowTitle}>{title}</Text>
        <Text style={styles.rowSubtitle}>{subtitle}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: colors.border, true: '#A8D9D4' }}
        thumbColor={value ? colors.primary : '#FFFFFF'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { paddingBottom: spacing.xl },
  backRow: { paddingHorizontal: spacing.lg, paddingTop: spacing.sm },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  backArrow: {
    fontSize: 30,
    lineHeight: 27,
    color: colors.primary,
    marginRight: 5,
  },
  backText: { color: colors.primary, fontSize: 13, fontWeight: '700' },
  sectionTitle: {
    marginHorizontal: spacing.lg,
    marginTop: 16,
    marginBottom: 10,
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
  },
  card: {
    marginHorizontal: spacing.lg,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  linkRow: { minHeight: 70, flexDirection: 'row', alignItems: 'center' },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: colors.muted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowCopy: { flex: 1, marginHorizontal: 12 },
  rowTitle: { color: colors.text, fontSize: 14, fontWeight: '700' },
  rowSubtitle: { color: colors.textLight, fontSize: 11, marginTop: 3 },
  divider: { height: 1, backgroundColor: colors.border },
  currency: { color: '#D97706', fontSize: 19, fontWeight: '800' },
  version: {
    marginTop: 28,
    textAlign: 'center',
    color: colors.textLight,
    fontSize: 11,
  },
});
