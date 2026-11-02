import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors, radius, spacing } from '../theme';
export const Card = ({children, style}:{children:React.ReactNode; style?:ViewStyle}) => (
  <View style={[styles.card, style]}>{children}</View>
);
const styles = StyleSheet.create({
  card:{ backgroundColor:colors.card, borderRadius:radius.md, padding:spacing.md, borderWidth:1, borderColor:colors.border, shadowColor:'#000', shadowOpacity:0.05, shadowRadius:8, elevation:2 }
});
