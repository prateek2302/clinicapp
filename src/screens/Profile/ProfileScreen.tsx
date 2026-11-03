import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, radius } from '../../theme';
import { useAuthStore } from '../../store/useAuthStore';

export default function ProfileScreen({ navigation }: any) {
  const logout = useAuthStore(s => s.logout);
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: insets.top + spacing.lg }]}>
      <View style={styles.profileHero}>
        <View style={styles.avatar}><Text style={styles.avatarText}>CA</Text></View>
        <View>
          <Text style={styles.title}>Clinic Admin</Text>
          <Text style={styles.sub}>admin@clinicapp.com • Receptionist</Text>
          <View style={styles.activeBadge}><View style={styles.activeDot} /><Text style={styles.activeText}>Active account</Text></View>
        </View>
      </View>
      <Text style={styles.sectionLabel}>WORKSPACE</Text>
      <View style={styles.menu}>
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate('Settings')}
        >
          <Text style={styles.itemText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate('BillingInvoices')}
        >
          <Text style={styles.itemText}>Billing & Invoices</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate('PrivacyPolicy')}
        >
          <Text style={styles.itemText}>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.item, { marginTop: 24, backgroundColor: '#FEE2E2' }]}
          onPress={logout}
        >
          <Text style={{ color: colors.danger, fontWeight: '700' }}>
            Log Out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  title: { fontSize: 24, fontWeight: '800', color: colors.text },
  sub: { color: colors.textLight, marginTop: 4 },
  profileHero: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card, padding: 16, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border },
  avatar: { width: 58, height: 58, borderRadius: 20, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', marginRight: 13 },
  avatarText: { color: '#fff', fontSize: 20, fontWeight: '800' },
  activeBadge: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  activeDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.success, marginRight: 5 },
  activeText: { color: colors.success, fontSize: 10, fontWeight: '700' },
  sectionLabel: { color: colors.textLight, fontSize: 10, fontWeight: '800', letterSpacing: 1, marginTop: 26 },
  menu: { marginTop: 32 },
  itemText: { color: colors.text, fontSize: 14, fontWeight: '700' },
  item: {
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 12,
  },
});
