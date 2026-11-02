import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppIcon } from './AppIcon';
import { colors, spacing } from '../theme';
export const Header = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrap, { paddingTop: insets.top + spacing.sm }]}>
      <View style={styles.titleRow}>
        <View style={styles.brandMark}>
          <AppIcon name="clinic" size={20} color={colors.inkOnPrimary} />
        </View>
        <View style={styles.titleCopy}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.sub}>{subtitle}</Text>}
        </View>
        <View style={styles.notification}>
          <AppIcon name="notifications" size={21} color={colors.text} />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  titleRow: { flexDirection: 'row', alignItems: 'center' },
  brandMark: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleCopy: { flex: 1, marginLeft: 11 },
  title: { fontSize: 21, fontWeight: '800', color: colors.text },
  sub: { fontSize: 12, color: colors.textLight, marginTop: 3 },
  notification: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
