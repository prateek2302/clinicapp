import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '../theme';
export const Header = ({title, subtitle}:{title:string; subtitle?:string})=>(
  <View style={styles.wrap}>
    <Text style={styles.title}>{title}</Text>
    {subtitle && <Text style={styles.sub}>{subtitle}</Text>}
  </View>
);
const styles = StyleSheet.create({
  wrap:{ padding:spacing.lg, paddingBottom:spacing.md },
  title:{ fontSize:24, fontWeight:'800', color:colors.text },
  sub:{ fontSize:14, color:colors.textLight, marginTop:4 }
});
