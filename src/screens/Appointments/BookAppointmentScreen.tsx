import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, radius } from '../../theme';
import { Card } from '../../components/Card';
import { patients, doctors } from '../../utils/mockData';
import { api } from '../../utils/api';

const timeSlots = [
  '09:00 AM',
  '09:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '02:00 PM',
  '02:30 PM',
  '03:00 PM',
  '04:00 PM',
];

export default function BookAppointmentScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const [selectedPatient, setSelectedPatient] = useState(patients[0].name);
  const [selectedDoctor, setSelectedDoctor] = useState(doctors[0].name);
  const [selectedDate, setSelectedDate] = useState(2); // index of date
  const [selectedTime, setSelectedTime] = useState('10:30 AM');
  const [type, setType] = useState('Consultation');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      label: d.toLocaleDateString('en-US', { weekday: 'short' }),
      day: d.getDate(),
      full: d.toDateString(),
    };
  });

  const handleBook = async () => {
    setLoading(true);
    try {
      await api.createAppointment({
        patientName: selectedPatient,
        doctorName: selectedDoctor,
        time: selectedTime,
        date: dates[selectedDate].full,
        type,
      });
      Alert.alert(
        'Success',
        `Appointment booked for ${selectedPatient} with ${selectedDoctor} on ${dates[selectedDate].full} at ${selectedTime}`,
        [{ text: 'OK', onPress: () => navigation.goBack() }],
      );
    } catch (error) {
      Alert.alert(
        'Unable to book appointment',
        error instanceof Error ? error.message : 'Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{
        padding: spacing.md,
        paddingTop: insets.top + spacing.md,
      }}
    >
      <Text style={styles.title}>Book Appointment</Text>

      <Text style={styles.label}>Patient</Text>
      <View style={styles.chipRow}>
        {patients.map(p => (
          <TouchableOpacity
            key={p.id}
            style={[
              styles.chip,
              selectedPatient === p.name && styles.chipActive,
            ]}
            onPress={() => setSelectedPatient(p.name)}
          >
            <Text
              style={[
                styles.chipText,
                selectedPatient === p.name && styles.chipTextActive,
              ]}
            >
              {p.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Doctor</Text>
      <View style={styles.chipRow}>
        {doctors.map(d => (
          <TouchableOpacity
            key={d.id}
            style={[
              styles.chip,
              selectedDoctor === d.name && styles.chipActive,
            ]}
            onPress={() => setSelectedDoctor(d.name)}
          >
            <Text
              style={[
                styles.chipText,
                selectedDoctor === d.name && styles.chipTextActive,
              ]}
            >
              {d.name.split(' ').slice(-1)} • {d.specialty}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Date</Text>
      <View style={styles.dateRow}>
        {dates.map((d, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.dateCard, selectedDate === i && styles.dateActive]}
            onPress={() => setSelectedDate(i)}
          >
            <Text
              style={[
                styles.dateLabel,
                selectedDate === i && { color: '#fff' },
              ]}
            >
              {d.label}
            </Text>
            <Text
              style={[styles.dateDay, selectedDate === i && { color: '#fff' }]}
            >
              {d.day}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Time Slot</Text>
      <View style={styles.timeGrid}>
        {timeSlots.map(t => (
          <TouchableOpacity
            key={t}
            style={[styles.timeChip, selectedTime === t && styles.chipActive]}
            onPress={() => setSelectedTime(t)}
          >
            <Text
              style={[
                styles.chipText,
                selectedTime === t && styles.chipTextActive,
              ]}
            >
              {t}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Visit Type</Text>
      <View style={styles.chipRow}>
        {['Consultation', 'Follow-up', 'Check-up', 'Emergency'].map(v => (
          <TouchableOpacity
            key={v}
            style={[styles.chip, type === v && styles.chipActive]}
            onPress={() => setType(v)}
          >
            <Text
              style={[styles.chipText, type === v && styles.chipTextActive]}
            >
              {v}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Notes</Text>
      <TextInput
        value={notes}
        onChangeText={setNotes}
        placeholder="Symptoms, history..."
        multiline
        style={styles.textArea}
        placeholderTextColor={colors.textLight}
      />

      <Card
        style={{
          marginTop: 16,
          backgroundColor: '#EFF6FF',
          borderColor: '#BFDBFE',
        }}
      >
        <Text style={{ fontWeight: '700', color: colors.text }}>Summary</Text>
        <Text style={{ color: colors.textLight, marginTop: 4 }}>
          {selectedPatient} • {selectedDoctor}
          {'\n'}
          {dates[selectedDate].full} at {selectedTime} • {type}
        </Text>
      </Card>

      <TouchableOpacity style={styles.bookBtn} onPress={handleBook}>
        <Text style={styles.bookText}>
          {loading ? 'Booking...' : 'Confirm & Book - ₹500'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: radius.md,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { fontSize: 13, color: colors.text, fontWeight: '500' },
  chipTextActive: { color: '#fff', fontWeight: '700' },
  dateRow: { flexDirection: 'row', gap: 8 },
  dateCard: {
    width: 48,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: radius.md,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dateActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  dateLabel: { fontSize: 11, color: colors.textLight },
  dateDay: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
    marginTop: 2,
  },
  timeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  timeChip: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: radius.md,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    minWidth: 90,
    alignItems: 'center',
  },
  textArea: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: 14,
    height: 80,
    textAlignVertical: 'top',
    color: colors.text,
  },
  bookBtn: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: radius.md,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 40,
  },
  bookText: { color: '#fff', fontWeight: '800', fontSize: 16 },
});
