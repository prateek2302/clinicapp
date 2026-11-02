
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { colors, radius, spacing } from '../theme';
import { Card } from './Card';

export const UPIQRCode = ({ amount, upiId='clinic@upi', name='ClinicApp', invoiceId }: { amount:number; upiId?:string; name?:string; invoiceId?:string }) => {
  const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR&tn=${encodeURIComponent(invoiceId || 'Clinic Bill')}`;
  
  return (
    <Card style={styles.container}>
      <Text style={styles.title}>Scan & Pay via UPI</Text>
      <Text style={styles.sub}>{invoiceId} • ₹{amount}</Text>
      <View style={styles.qrWrap}>
        <QRCode value={upiUrl} size={180} color="#000" backgroundColor="white" />
      </View>
      <Text style={styles.upiId}>UPI ID: {upiId}</Text>
      <Text style={styles.hint}>GPay • PhonePe • Paytm • BHIM</Text>
      <View style={styles.amountBox}>
        <Text style={styles.amount}>₹{amount.toLocaleString()}</Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container:{ alignItems:'center', padding:spacing.lg, borderWidth:2, borderColor:colors.primary, borderStyle:'dashed' },
  title:{ fontWeight:'800', fontSize:16, color:colors.text },
  sub:{ color:colors.textLight, fontSize:12, marginTop:2 },
  qrWrap:{ marginVertical:16, padding:12, backgroundColor:'#fff', borderRadius:radius.md, elevation:3 },
  upiId:{ fontWeight:'700', color:colors.text, fontSize:12, marginTop:4, backgroundColor:colors.muted, paddingHorizontal:10, paddingVertical:4, borderRadius:20 },
  hint:{ color:colors.textLight, fontSize:11, marginTop:6 },
  amountBox:{ marginTop:12, backgroundColor:colors.primary, paddingHorizontal:20, paddingVertical:8, borderRadius:20 },
  amount:{ color:'#fff', fontWeight:'800', fontSize:16 }
});
