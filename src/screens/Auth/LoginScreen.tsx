import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { colors, spacing, radius } from '../../theme';
import { useAuthStore } from '../../store/useAuthStore';

export default function LoginScreen(){
  const login = useAuthStore(s=>s.login);
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🏥 ClinicApp</Text>
      <Text style={styles.sub}>Clinic Management for Modern Practices</Text>
      <View style={styles.form}>
        <TextInput placeholder="Email" style={styles.input} placeholderTextColor={colors.textLight} />
        <TextInput placeholder="Password" secureTextEntry style={styles.input} placeholderTextColor={colors.textLight} />
        <TouchableOpacity style={styles.btn} onPress={login}>
          <Text style={styles.btnText}>Sign In</Text>
        </TouchableOpacity>
        <Text style={styles.hint}>Demo: tap Sign In directly (no API yet)</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container:{ flex:1, backgroundColor:colors.background, justifyContent:'center', padding:spacing.lg },
  logo:{ fontSize:32, fontWeight:'900', color:colors.primary, textAlign:'center' },
  sub:{ textAlign:'center', color:colors.textLight, marginTop:8, marginBottom:32 },
  form:{ backgroundColor:colors.card, padding:spacing.lg, borderRadius:radius.lg, borderWidth:1, borderColor:colors.border },
  input:{ borderWidth:1, borderColor:colors.border, borderRadius:radius.md, padding:14, marginBottom:12, color:colors.text },
  btn:{ backgroundColor:colors.primary, padding:16, borderRadius:radius.md, alignItems:'center', marginTop:8 },
  btnText:{ color:'#fff', fontWeight:'700', fontSize:16 },
  hint:{ textAlign:'center', color:colors.textLight, marginTop:12, fontSize:12 }
});
