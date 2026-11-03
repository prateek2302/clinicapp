import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Header } from '../../components/Header';
import { Card } from '../../components/Card';
import { AppIcon } from '../../components/AppIcon';
import { colors, spacing, radius } from '../../theme';
import { patients } from '../../utils/mockData';
import { Patient } from '../../types';

const visitReasons = [
  'General check-up',
  'Follow-up',
  'Fever',
  'Hypertension',
  'Diabetes',
  'Asthma',
  'Other',
];

export default function PatientsScreen({ navigation }: any) {
  const [q, setQ] = useState('');
  const [patientList, setPatientList] = useState<Patient[]>(patients);
  const [formVisible, setFormVisible] = useState(false);
  const [form, setForm] = useState({
    name: '',
    age: '',
    gender: 'M' as Patient['gender'],
    phone: '',
    condition: '',
    customCondition: '',
  });
  const [error, setError] = useState('');
  const filtered = patientList.filter(p =>
    p.name.toLowerCase().includes(q.toLowerCase()),
  );
  const updateForm = (key: keyof typeof form, value: string) => {
    setForm(current => ({ ...current, [key]: value }));
    setError('');
  };
  const closeForm = () => {
    setFormVisible(false);
    setError('');
    setForm({
      name: '',
      age: '',
      gender: 'M',
      phone: '',
      condition: '',
      customCondition: '',
    });
  };
  const addPatient = () => {
    const age = Number(form.age);
    const condition =
      form.condition === 'Other'
        ? form.customCondition.trim()
        : form.condition.trim();
    if (
      !form.name.trim() ||
      !form.age.trim() ||
      form.phone.length !== 10 ||
      !condition
    ) {
      setError('Complete all patient details.');
      return;
    }
    if (!Number.isInteger(age) || age < 0 || age > 120) {
      setError('Enter a valid age.');
      return;
    }
    const newPatient: Patient = {
      id: `patient-${Date.now()}`,
      name: form.name.trim(),
      age,
      gender: form.gender,
      phone: form.phone.trim(),
      condition,
      lastVisit: 'New patient',
    };
    setPatientList(current => [newPatient, ...current]);
    closeForm();
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header title="Patients" subtitle={`${filtered.length} total records`} />
      <View style={{ paddingHorizontal: spacing.md }}>
        <TextInput
          placeholder="Search patients..."
          value={q}
          onChangeText={setQ}
          style={styles.search}
          placeholderTextColor={colors.textLight}
        />
      </View>
      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{patientList.length}</Text>
          <Text style={styles.statLabel}>Total patients</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>
            {patientList.filter(patient => patient.lastVisit === 'New patient').length}
          </Text>
          <Text style={styles.statLabel}>New records</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>
            {new Set(patientList.map(patient => patient.condition)).size}
          </Text>
          <Text style={styles.statLabel}>Conditions</Text>
        </View>
      </View>
      <FlatList
        data={filtered}
        keyExtractor={i => i.id}
        contentContainerStyle={{ padding: spacing.md }}
        renderItem={({ item }) => (
          <Card style={{ marginBottom: 12 }}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.meta}>
                  {item.age}y • {item.gender} • {item.condition}
                </Text>
                <Text style={styles.meta}>{item.phone}</Text>
              </View>
              <TouchableOpacity
                style={styles.viewBtn}
                onPress={() =>
                  navigation.navigate('PatientDetails', { patient: item })
                }
                accessibilityLabel={`View ${item.name}`}
              >
                <Text style={{ color: colors.primary, fontWeight: '700' }}>
                  View
                </Text>
              </TouchableOpacity>
            </View>
          </Card>
        )}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setFormVisible(true)}
        accessibilityRole="button"
        accessibilityLabel="Add new patient"
      >
        <AppIcon name="plus" size={25} color="#fff" />
      </TouchableOpacity>
      <Modal
        visible={formVisible}
        transparent
        animationType="slide"
        onRequestClose={closeForm}
      >
        <KeyboardAvoidingView
          style={styles.modalBackdrop}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={styles.formCard}>
            <View style={styles.formHeader}>
              <View>
                <Text style={styles.formTitle}>Add new patient</Text>
                <Text style={styles.formSubtitle}>Create a patient record</Text>
              </View>
              <TouchableOpacity onPress={closeForm} accessibilityLabel="Close form">
                <Text style={styles.close}>×</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              placeholder="Full name"
              value={form.name}
              onChangeText={value => updateForm('name', value)}
              style={styles.input}
              placeholderTextColor={colors.textLight}
            />
            <View style={styles.inlineFields}>
              <TextInput
                placeholder="Age"
                value={form.age}
                onChangeText={value => updateForm('age', value)}
                keyboardType="number-pad"
                style={[styles.input, styles.ageInput]}
                placeholderTextColor={colors.textLight}
              />
              <TextInput
                placeholder="Phone number"
                value={form.phone}
                onChangeText={value => updateForm('phone', value.replace(/\D/g, ''))}
                keyboardType="phone-pad"
                maxLength={10}
                style={[styles.input, styles.phoneInput]}
                placeholderTextColor={colors.textLight}
              />
            </View>
            <Text style={styles.fieldLabel}>Reason for visit / condition</Text>
            <View style={styles.reasonRow}>
              {visitReasons.map(reason => (
                <TouchableOpacity
                  key={reason}
                  style={[
                    styles.reasonOption,
                    form.condition === reason && styles.reasonActive,
                  ]}
                  onPress={() => updateForm('condition', reason)}
                >
                  <Text
                    style={[
                      styles.reasonText,
                      form.condition === reason && styles.reasonTextActive,
                    ]}
                  >
                    {reason}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {form.condition === 'Other' && (
              <TextInput
                placeholder="Enter reason or condition"
                value={form.customCondition}
                onChangeText={value => updateForm('customCondition', value)}
                style={styles.input}
                placeholderTextColor={colors.textLight}
              />
            )}
            <Text style={styles.genderLabel}>Gender</Text>
            <View style={styles.genderRow}>
              {(['M', 'F', 'Other'] as Patient['gender'][]).map(gender => (
                <TouchableOpacity
                  key={gender}
                  style={[styles.genderOption, form.gender === gender && styles.genderActive]}
                  onPress={() => updateForm('gender', gender)}
                >
                  <Text style={[styles.genderText, form.gender === gender && styles.genderTextActive]}>
                    {gender === 'M' ? 'Male' : gender === 'F' ? 'Female' : 'Other'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {!!error && <Text style={styles.error}>{error}</Text>}
            <TouchableOpacity style={styles.saveButton} onPress={addPatient}>
              <Text style={styles.saveText}>Save patient</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  search: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: 14,
    marginBottom: 4,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: spacing.md,
    marginTop: 10,
  },
  stat: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: 11,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statValue: { color: colors.text, fontSize: 18, fontWeight: '800' },
  statLabel: { color: colors.textLight, fontSize: 10, marginTop: 3 },
  name: { fontWeight: '700', color: colors.text, fontSize: 16 },
  meta: { color: colors.textLight, fontSize: 12, marginTop: 2 },
  viewBtn: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#102A4388',
  },
  formCard: {
    backgroundColor: colors.card,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    padding: spacing.lg,
  },
  formHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 18,
  },
  formTitle: { color: colors.text, fontSize: 20, fontWeight: '800' },
  formSubtitle: { color: colors.textLight, fontSize: 12, marginTop: 4 },
  close: { color: colors.textLight, fontSize: 28, lineHeight: 24 },
  input: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: 13,
    color: colors.text,
    marginBottom: 10,
  },
  inlineFields: { flexDirection: 'row', gap: 10 },
  ageInput: { flex: 0.35 },
  phoneInput: { flex: 1 },
  genderLabel: { color: colors.text, fontSize: 12, fontWeight: '700', marginBottom: 8 },
  fieldLabel: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 4,
    marginBottom: 8,
  },
  reasonRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 10 },
  reasonOption: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  reasonActive: { backgroundColor: colors.muted, borderColor: colors.primary },
  reasonText: { color: colors.textLight, fontSize: 12, fontWeight: '700' },
  reasonTextActive: { color: colors.primary },
  genderRow: { flexDirection: 'row', gap: 8, marginBottom: 4 },
  genderOption: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: 11,
    alignItems: 'center',
  },
  genderActive: { backgroundColor: colors.muted, borderColor: colors.primary },
  genderText: { color: colors.textLight, fontSize: 12, fontWeight: '700' },
  genderTextActive: { color: colors.primary },
  error: { color: colors.danger, fontSize: 12, marginTop: 10 },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    padding: 15,
    alignItems: 'center',
    marginTop: 16,
  },
  saveText: { color: '#fff', fontSize: 15, fontWeight: '800' },
});
