import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { Header } from '../../components/Header';
import { Card } from '../../components/Card';
import { AppIcon } from '../../components/AppIcon';
import { colors, spacing, radius } from '../../theme';
import { Patient } from '../../types';

export default function PatientDetailsScreen({ route, navigation }: any) {
  const [patient, setPatient] = React.useState(
    route.params?.patient as Patient,
  );
  const [editVisible, setEditVisible] = React.useState(false);
  const [draft, setDraft] = React.useState(patient);

  const openEditor = () => {
    setDraft(patient);
    setEditVisible(true);
  };
  const saveRecord = () => {
    if (
      !draft.name.trim() ||
      !draft.phone.trim() ||
      !draft.condition.trim() ||
      !draft.lastVisit.trim() ||
      !Number.isInteger(draft.age) ||
      draft.age < 0
    ) {
      Alert.alert('Invalid record', 'Please complete all patient details.');
      return;
    }
    setPatient(draft);
    setEditVisible(false);
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.backRow}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backArrow}>‹</Text>
          <Text style={styles.backText}>Patients</Text>
        </TouchableOpacity>
      </View>
      <Header title="Patient details" subtitle="Complete health record" />

      <View style={styles.profile}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{patient.name.charAt(0)}</Text>
        </View>
        <Text style={styles.name}>{patient.name}</Text>
        <Text style={styles.meta}>
          {patient.age} years ·{' '}
          {patient.gender === 'M'
            ? 'Male'
            : patient.gender === 'F'
            ? 'Female'
            : 'Other'}
        </Text>
        <View style={styles.condition}>
          <Text style={styles.conditionText}>{patient.condition}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Contact information</Text>
      <Card style={styles.infoCard}>
        <InfoRow icon="people" label="Phone" value={patient.phone} />
        <View style={styles.divider} />
        <InfoRow icon="calendar" label="Last visit" value={patient.lastVisit} />
      </Card>

      <Text style={styles.sectionTitle}>Health overview</Text>
      <Card style={styles.overviewCard}>
        <Text style={styles.overviewTitle}>Primary condition</Text>
        <Text style={styles.overviewValue}>{patient.condition}</Text>
        <Text style={styles.overviewHint}>
          Keep this record updated after every consultation.
        </Text>
      </Card>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.primaryAction}
          onPress={() => navigation.navigate('AppointmentsTab')}
        >
          <AppIcon name="calendar" size={18} color="#FFFFFF" />
          <Text style={styles.primaryActionText}>Book appointment</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.secondaryAction}
          onPress={openEditor}
          accessibilityRole="button"
          accessibilityLabel="Edit patient record"
        >
          <Text style={styles.secondaryActionText}>Edit Record</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={editVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setEditVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Edit patient record</Text>
            <Text style={styles.modalSubtitle}>
              Update the patient information below.
            </Text>
            <EditField
              label="Name"
              value={draft.name}
              onChangeText={value => setDraft({ ...draft, name: value })}
            />
            <EditField
              label="Age"
              value={String(draft.age)}
              keyboardType="number-pad"
              onChangeText={value =>
                setDraft({ ...draft, age: Number(value) || 0 })
              }
            />
            <EditField
              label="Phone"
              value={draft.phone}
              keyboardType="phone-pad"
              onChangeText={value => setDraft({ ...draft, phone: value })}
            />
            <EditField
              label="Condition"
              value={draft.condition}
              onChangeText={value => setDraft({ ...draft, condition: value })}
            />
            <EditField
              label="Last visit"
              value={draft.lastVisit}
              onChangeText={value => setDraft({ ...draft, lastVisit: value })}
            />
            <View style={styles.modalActions}>
              <TouchableOpacity
                onPress={() => setEditVisible(false)}
                style={styles.cancelButton}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={saveRecord} style={styles.saveButton}>
                <Text style={styles.saveText}>Save changes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

function EditField({
  label,
  value,
  onChangeText,
  keyboardType = 'default',
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  keyboardType?: 'default' | 'number-pad' | 'phone-pad';
}) {
  return (
    <View style={styles.editField}>
      <Text style={styles.editLabel}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        style={styles.editInput}
        placeholderTextColor={colors.textLight}
      />
    </View>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: 'people' | 'calendar';
  label: string;
  value: string;
}) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.iconBox}>
        <AppIcon name={icon} size={18} color={colors.primary} />
      </View>
      <View>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
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
  profile: {
    alignItems: 'center',
    marginHorizontal: spacing.lg,
    padding: spacing.lg,
    backgroundColor: colors.secondary,
    borderRadius: radius.xl,
  },
  avatar: {
    width: 68,
    height: 68,
    borderRadius: 24,
    backgroundColor: '#B9E2DE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: colors.primaryDark, fontSize: 30, fontWeight: '800' },
  name: { color: '#FFFFFF', fontSize: 21, fontWeight: '800', marginTop: 12 },
  meta: { color: '#BCD0DB', fontSize: 12, marginTop: 4 },
  condition: {
    backgroundColor: '#FFFFFF18',
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 12,
  },
  conditionText: { color: '#A8E0D9', fontSize: 11, fontWeight: '700' },
  sectionTitle: {
    marginHorizontal: spacing.lg,
    marginTop: 22,
    marginBottom: 10,
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
  },
  infoCard: { marginHorizontal: spacing.lg, paddingVertical: 4 },
  infoRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 13 },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: colors.muted,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  infoLabel: { color: colors.textLight, fontSize: 11 },
  infoValue: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
    marginTop: 3,
  },
  divider: { height: 1, backgroundColor: colors.border },
  overviewCard: { marginHorizontal: spacing.lg },
  overviewTitle: { color: colors.textLight, fontSize: 11 },
  overviewValue: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
    marginTop: 5,
  },
  overviewHint: {
    color: colors.textLight,
    fontSize: 11,
    lineHeight: 17,
    marginTop: 7,
  },
  actions: { marginHorizontal: spacing.lg, marginTop: 22, gap: 10 },
  primaryAction: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    minHeight: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  primaryActionText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },
  secondaryAction: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    minHeight: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryActionText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '800',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(16, 42, 67, 0.45)',
  },
  modalCard: {
    backgroundColor: colors.card,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    padding: spacing.lg,
  },
  modalTitle: { color: colors.text, fontSize: 20, fontWeight: '800' },
  modalSubtitle: { color: colors.textLight, fontSize: 12, marginTop: 4 },
  editField: { marginTop: 12 },
  editLabel: { color: colors.text, fontSize: 11, fontWeight: '700', marginBottom: 5 },
  editInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    color: colors.text,
    padding: 11,
    minHeight: 42,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 22,
  },
  cancelButton: { paddingHorizontal: 14, paddingVertical: 12 },
  cancelText: { color: colors.textLight, fontWeight: '700' },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  saveText: { color: '#FFFFFF', fontWeight: '800' },
});
