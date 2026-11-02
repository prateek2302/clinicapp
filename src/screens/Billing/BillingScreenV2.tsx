
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, Modal, TextInput } from 'react-native';
import { Header } from '../../components/Header';
import { Card } from '../../components/Card';
import { colors, spacing, radius } from '../../theme';
import { payWithRazorpay, payWithUPI } from '../../utils/payment';

type Invoice = { id:string; patient:string; amount:number; status:'paid'|'pending'|'overdue'; date:string; services:string[] };

const initial: Invoice[] = [
  { id:'INV-1001', patient:'Aarav Sharma', amount:1500, status:'paid', date:'2026-10-30', services:['Consultation','Blood Test'] },
  { id:'INV-1002', patient:'Neha Gupta', amount:2500, status:'pending', date:'2026-10-30', services:['Dermatology Consult','Skin Treatment'] },
  { id:'INV-1003', patient:'Rahul Mehta', amount:800, status:'overdue', date:'2026-10-28', services:['Check-up'] },
];

export default function BillingScreen(){
  const [invoices,setInvoices]=useState(initial);
  const [filter,setFilter]=useState<'all'|'paid'|'pending'|'overdue'>('all');
  const [showPay,setShowPay]=useState<Invoice|null>(null);

  const data = filter==='all'? invoices : invoices.filter(i=>i.status===filter);
  const totalPaid = invoices.filter(i=>i.status==='paid').reduce((s,i)=>s+i.amount,0);

  const handleRazorpay = async (inv:Invoice) => {
    const res = await payWithRazorpay(inv.amount, inv.patient, `Bill ${inv.id}`);
    if(res.success){ setInvoices(prev=>prev.map(x=> x.id===inv.id ? {...x, status:'paid' as const}:x)); Alert.alert('Payment Success', `ID: ${res.paymentId}`); setShowPay(null); }
    else Alert.alert('Payment Failed', res.error);
  };

  const handleUPI = (inv:Invoice) => { payWithUPI(inv.amount); setShowPay(null); };

  return (
    <View style={{flex:1, backgroundColor:colors.background}}>
      <Header title="Billing & Payments" subtitle={`Paid this month: ₹${totalPaid.toLocaleString()} | Pending: ₹${invoices.filter(i=>i.status!=='paid').reduce((s,i)=>s+i.amount,0)}`} />
      <View style={styles.filterRow}>
        {(['all','paid','pending','overdue'] as const).map(f=>(
          <TouchableOpacity key={f} onPress={()=>setFilter(f)} style={[styles.filter, filter===f && styles.filterActive]}>
            <Text style={[styles.filterText, filter===f && styles.filterTextActive]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList data={data} keyExtractor={i=>i.id} contentContainerStyle={{padding:spacing.md}} renderItem={({item})=>(
        <Card style={{marginBottom:12}}>
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <View><Text style={styles.invId}>{item.id}</Text><Text style={styles.patient}>{item.patient}</Text><Text style={styles.services}>{item.services.join(' • ')}</Text></View>
            <View style={{alignItems:'flex-end'}}><Text style={styles.amount}>₹{item.amount}</Text><View style={[styles.badge, {backgroundColor: item.status==='paid'?'#DCFCE7': item.status==='pending'?'#FEF3C7':'#FEE2E2'}]}><Text style={styles.badgeText}>{item.status}</Text></View></View>
          </View>
          {item.status!=='paid' && (
            <TouchableOpacity style={styles.payBtn} onPress={()=>setShowPay(item)}><Text style={styles.payText}>💳 Pay via Razorpay / UPI</Text></TouchableOpacity>
          )}
        </Card>
      )} />

      <Modal visible={!!showPay} transparent animationType="slide">
        <View style={styles.modalBg}>
          <View style={styles.modalCard}>
            <Text style={{fontWeight:'800', fontSize:18, color:colors.text}}>Collect Payment</Text>
            <Text style={{color:colors.textLight, marginTop:4}}>{showPay?.id} • {showPay?.patient} • ₹{showPay?.amount}</Text>
            
            <TouchableOpacity style={[styles.modalBtn,{backgroundColor:colors.primary, marginTop:20}]} onPress={()=> showPay && handleRazorpay(showPay)}>
              <Text style={{color:'#fff', fontWeight:'800'}}>Pay with Razorpay (Card/Netbanking/Wallet)</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.modalBtn,{backgroundColor:'#0F172A'}]} onPress={()=> showPay && handleUPI(showPay)}>
              <Text style={{color:'#fff', fontWeight:'800'}}>Pay via UPI - GPay / PhonePe / Paytm</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.modalBtn,{backgroundColor:colors.card, borderWidth:1, borderColor:colors.border}]} onPress={()=>{ if(showPay) setInvoices(prev=>prev.map(x=> x.id===showPay.id ? {...x, status:'paid'}:x)); setShowPay(null); }}>
              <Text style={{fontWeight:'700'}}>Mark as Cash Paid</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>setShowPay(null)} style={{alignItems:'center', marginTop:16}}><Text style={{color:colors.textLight}}>Cancel</Text></TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  filterRow:{ flexDirection:'row', paddingHorizontal:spacing.md, gap:8, marginBottom:8 },
  filter:{ paddingHorizontal:14, paddingVertical:8, borderRadius:20, backgroundColor:colors.muted },
  filterActive:{ backgroundColor:colors.secondary },
  filterText:{ fontSize:12, textTransform:'capitalize', color:colors.textLight, fontWeight:'600' },
  filterTextActive:{ color:'#fff' },
  invId:{ fontWeight:'800', color:colors.text }, patient:{ color:colors.text, marginTop:2 }, services:{ color:colors.textLight, fontSize:12, marginTop:2 },
  amount:{ fontWeight:'800', fontSize:18, color:colors.text }, badge:{ paddingHorizontal:8, paddingVertical:2, borderRadius:12, marginTop:4 }, badgeText:{ fontSize:10, fontWeight:'700', textTransform:'uppercase' },
  payBtn:{ marginTop:12, backgroundColor:'#EFF6FF', borderRadius:radius.md, padding:10, alignItems:'center' },
  payText:{ fontSize:12, fontWeight:'700', color:colors.primary },
  modalBg:{ flex:1, backgroundColor:'rgba(0,0,0,0.5)', justifyContent:'flex-end' },
  modalCard:{ backgroundColor:colors.card, borderTopLeftRadius:24, borderTopRightRadius:24, padding:spacing.lg },
  modalBtn:{ padding:16, borderRadius:radius.md, alignItems:'center', marginTop:12 }
});
