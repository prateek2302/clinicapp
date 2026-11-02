import React from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Header } from '../../components/Header';
import { colors, spacing, radius } from '../../theme';

const sections = [
  {
    title: 'Information we collect',
    body: 'ClinicApp stores the information needed to manage your clinic, including patient details, appointment records, billing information, and account preferences.',
  },
  {
    title: 'How we use your information',
    body: 'Your information is used to manage appointments, support billing workflows, provide reminders, and improve the clinic management experience.',
  },
  {
    title: 'Data protection',
    body: 'We use reasonable technical and organisational safeguards to protect clinic data. Access should be limited to authorised members of your clinic team.',
  },
  {
    title: 'Your choices',
    body: 'You can manage notifications from Settings and request updates or removal of account information by contacting your clinic administrator.',
  },
  {
    title: 'Contact',
    body: 'For privacy questions, contact your ClinicApp administrator or email privacy@clinicapp.com.',
  },
];

export default function PrivacyPolicyScreen({ navigation }: any) {
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
      <Header
        title="Privacy Policy"
        subtitle="How ClinicApp handles your information"
      />
      <View style={styles.introCard}>
        <Text style={styles.introTitle}>Your privacy matters</Text>
        <Text style={styles.introText}>
          This policy explains how information is handled in ClinicApp. Last
          updated 2 November 2026.
        </Text>
      </View>
      {sections.map(section => (
        <View key={section.title} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <Text style={styles.body}>{section.body}</Text>
        </View>
      ))}
    </ScrollView>
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
  introCard: {
    marginHorizontal: spacing.lg,
    padding: spacing.md,
    backgroundColor: colors.secondary,
    borderRadius: radius.lg,
  },
  introTitle: { color: '#FFFFFF', fontSize: 17, fontWeight: '800' },
  introText: { color: '#C4D5DF', fontSize: 12, lineHeight: 19, marginTop: 7 },
  section: {
    marginHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 6,
  },
  body: { color: colors.textLight, fontSize: 13, lineHeight: 20 },
});
