import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { Header } from '../../components/Header';
import { AppIcon } from '../../components/AppIcon';
import { colors, spacing, radius } from '../../theme';

export default function SettingsScreen({ navigation }: any) {
  const [notifications, setNotifications] = useState(true);
  const [reminders, setReminders] = useState(true);
  const [activePanel, setActivePanel] = useState<
    'clinic' | 'payment' | null
  >(null);
  const [clinicName, setClinicName] = useState('ClinicApp Medical Centre');
  const [clinicAddress, setClinicAddress] = useState('12 Health Street');
  const [clinicPhone, setClinicPhone] = useState('+91 9876543210');
  const [upiId, setUpiId] = useState('clinic@upi');
  const [acceptCash, setAcceptCash] = useState(true);
  const [acceptUpi, setAcceptUpi] = useState(true);
  const [acceptCard, setAcceptCard] = useState(true);

  const closePanel = () => setActivePanel(null);
  const saveClinicInformation = () => {
    if (!clinicName.trim() || !clinicAddress.trim() || !clinicPhone.trim()) {
      Alert.alert('Missing information', 'Please complete all clinic details.');
      return;
    }
    closePanel();
  };
  const savePaymentPreferences = () => {
    if (acceptUpi && !upiId.trim()) {
      Alert.alert('Missing UPI ID', 'Enter a UPI ID or turn off UPI payments.');
      return;
    }
    closePanel();
  };

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
        <TouchableOpacity
          style={styles.linkRow}
          onPress={() => setActivePanel('clinic')}
          accessibilityRole="button"
        >
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
        <TouchableOpacity
          style={styles.linkRow}
          onPress={() => setActivePanel('payment')}
          accessibilityRole="button"
        >
          <View style={[styles.iconBox, styles.paymentIconBox]}>
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

      <Modal
        visible={activePanel !== null}
        transparent
        animationType="slide"
        onRequestClose={closePanel}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalCard}>
            {activePanel === 'clinic' ? (
              <>
                <Text style={styles.modalTitle}>Clinic Information</Text>
                <Text style={styles.modalSubtitle}>
                  Keep your clinic details up to date.
                </Text>
                <FormField
                  label="Clinic name"
                  value={clinicName}
                  onChangeText={setClinicName}
                />
                <FormField
                  label="Address"
                  value={clinicAddress}
                  onChangeText={setClinicAddress}
                />
                <FormField
                  label="Phone number"
                  value={clinicPhone}
                  onChangeText={setClinicPhone}
                  keyboardType="phone-pad"
                />
                <ModalActions
                  onCancel={closePanel}
                  onSave={saveClinicInformation}
                />
              </>
            ) : (
              <>
                <Text style={styles.modalTitle}>Payment Preferences</Text>
                <Text style={styles.modalSubtitle}>
                  Choose how patients can pay their bills.
                </Text>
                <SettingRow
                  icon="wallet"
                  title="Cash payments"
                  subtitle="Allow bills to be marked as paid in cash"
                  value={acceptCash}
                  onValueChange={setAcceptCash}
                />
                <SettingRow
                  icon="wallet"
                  title="UPI payments"
                  subtitle="Accept payments through UPI apps"
                  value={acceptUpi}
                  onValueChange={setAcceptUpi}
                />
                {acceptUpi && (
                  <FormField
                    label="UPI ID"
                    value={upiId}
                    onChangeText={setUpiId}
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />
                )}
                <SettingRow
                  icon="wallet"
                  title="Card payments"
                  subtitle="Accept card payments through Razorpay"
                  value={acceptCard}
                  onValueChange={setAcceptCard}
                />
                <ModalActions
                  onCancel={closePanel}
                  onSave={savePaymentPreferences}
                />
              </>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

function FormField({
  label,
  value,
  onChangeText,
  ...props
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  keyboardType?: 'default' | 'email-address' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences';
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        {...props}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        placeholderTextColor={colors.textLight}
      />
    </View>
  );
}

function ModalActions({
  onCancel,
  onSave,
}: {
  onCancel: () => void;
  onSave: () => void;
}) {
  return (
    <View style={styles.modalActions}>
      <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onSave} style={styles.saveButton}>
        <Text style={styles.saveText}>Save changes</Text>
      </TouchableOpacity>
    </View>
  );
}

function SettingRow({
  icon,
  title,
  subtitle,
  value,
  onValueChange,
}: {
  icon: 'notifications' | 'calendar' | 'wallet';
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
  paymentIconBox: { backgroundColor: '#FFF3E7' },
  version: {
    marginTop: 28,
    textAlign: 'center',
    color: colors.textLight,
    fontSize: 11,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
  },
  modalCard: {
    padding: spacing.lg,
    backgroundColor: colors.card,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
  },
  modalTitle: { color: colors.text, fontSize: 20, fontWeight: '800' },
  modalSubtitle: { color: colors.textLight, fontSize: 12, marginTop: 4 },
  field: { marginTop: 16 },
  fieldLabel: { color: colors.text, fontSize: 12, fontWeight: '700', marginBottom: 6 },
  input: {
    minHeight: 44,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    color: colors.text,
    backgroundColor: colors.background,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 24,
  },
  cancelButton: { paddingHorizontal: 16, paddingVertical: 12 },
  cancelText: { color: colors.textLight, fontWeight: '700' },
  saveButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
  },
  saveText: { color: '#FFFFFF', fontWeight: '800' },
});
