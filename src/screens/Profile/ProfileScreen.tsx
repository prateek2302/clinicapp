import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, radius } from '../../theme';
import { useAuthStore } from '../../store/useAuthStore';

export default function ProfileScreen() {
  const logout = useAuthStore(s => s.logout);
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: insets.top + spacing.lg }]}>
      <Text style={styles.title}>Clinic Admin</Text>
      <Text style={styles.sub}>admin@clinicapp.com • Receptionist</Text>
      <View style={styles.menu}>
        <TouchableOpacity style={styles.item}>
          <Text>⚙️ Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text>💳 Billing & Invoices</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text>🔒 Privacy Policy</Text>
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
  menu: { marginTop: 32 },
  item: {
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 12,
  },
});
