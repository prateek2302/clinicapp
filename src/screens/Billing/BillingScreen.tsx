
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, Modal } from 'react-native';
import { Header } from '../../components/Header';
import { Card } from '../../components/Card';
import { colors, spacing, radius } from '../../theme';
import {
  payWithRazorpay,
  payWithUPI,
  payWithUPIApp,
} from '../../utils/payment';
import { UPIQRCode } from '../../components/UPIQRCode';
import { sendBillOnWhatsApp } from '../../utils/whatsapp';

type Invoice = { id:string; patient:string; phone:string; amount:number; status:'paid'|'pending'|'overdue'; date:string; services:string[] };

const initial: Invoice[] = [
  { id:'INV-1001', patient:'Aarav Sharma', phone:'+91 9876543210', amount:1500, status:'paid', date:'2026-10-30', services:['Consultation','Blood Test'] },
  { id:'INV-1002', patient:'Neha Gupta', phone:'+91 9876543211', amount:2500, status:'pending', date:'2026-10-30', services:['Dermatology Consult','Skin Treatment'] },
  { id:'INV-1003', patient:'Rahul Mehta', phone:'+91 9876543212', amount:800, status:'overdue', date:'2026-10-28', services:['Check-up'] },
];

export default function BillingScreen(){
  const [invoices,setInvoices]=useState(initial);
  const [filter,setFilter]=useState<'all'|'paid'|'pending'|'overdue'>('all');
  const [showPay,setShowPay]=useState<Invoice|null>(null);
  const [showQR,setShowQR]=useState<Invoice|null>(null);

  const data = filter==='all'? invoices : invoices.filter(i=>i.status===filter);
  const totalPaid = invoices.filter(i=>i.status==='paid').reduce((s,i)=>s+i.amount,0);

  const handleRazorpay = async (inv:Invoice) => {
    const res = await payWithRazorpay(inv.amount, inv.patient, `Bill ${inv.id}`);
    if(res.success){ setInvoices(prev=>prev.map(x=> x.id===inv.id ? {...x, status:'paid' as const}:x)); Alert.alert('Payment Success', `ID: ${res.paymentId}`); setShowPay(null); }
    else Alert.alert('Payment Failed', res.error);
  };

  return (
    <View style={{flex:1, backgroundColor:colors.background}}>
      <Header title="Billing & Payments" subtitle={`Paid: ₹${totalPaid} | Pending: ₹${invoices.filter(i=>i.status!=='paid').reduce((s,i)=>s+i.amount,0)}`} />
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
            <View><Text style={styles.invId}>{item.id}</Text><Text style={styles.patient}>{item.patient} • {item.phone}</Text><Text style={styles.services}>{item.services.join(' • ')}</Text></View>
            <View style={{alignItems:'flex-end'}}><Text style={styles.amount}>₹{item.amount}</Text><View style={[styles.badge, {backgroundColor: item.status==='paid'?'#DCFCE7': item.status==='pending'?'#FEF3C7':'#FEE2E2'}]}><Text style={styles.badgeText}>{item.status}</Text></View></View>
          </View>
          {item.status!=='paid' && (
            <View style={{flexDirection:'row', gap:8, marginTop:12}}>
              <TouchableOpacity style={[styles.actionBtn,{flex:1}]} onPress={()=>setShowPay(item)}><Text style={styles.payText}>💳 Pay</Text></TouchableOpacity>
              <TouchableOpacity style={[styles.actionBtn,{flex:1, backgroundColor:'#F0FDF4'}]} onPress={()=>setShowQR(item)}><Text style={[styles.payText,{color:colors.success}]}>📱 QR Code</Text></TouchableOpacity>
              <TouchableOpacity style={[styles.actionBtn,{flex:1, backgroundColor:'#DCFCE7'}]} onPress={()=>sendBillOnWhatsApp(item.phone, item.id, item.amount)}><Text style={[styles.payText,{color:'#15803D'}]}>WhatsApp</Text></TouchableOpacity>
            </View>
          )}
        </Card>
      )} />

      {/* Payment Modal */}
      <Modal visible={!!showPay} transparent animationType="slide">
        <View style={styles.modalBg}>
          <View style={styles.modalCard}>
            <Text style={{fontWeight:'800', fontSize:18, color:colors.text}}>Collect Payment - {showPay?.id}</Text>
            <Text style={{color:colors.textLight, marginTop:4}}>{showPay?.patient} • ₹{showPay?.amount}</Text>
            <TouchableOpacity style={[styles.modalBtn,{backgroundColor:colors.primary, marginTop:20}]} onPress={()=> showPay && handleRazorpay(showPay)}>
              <Text style={{color:'#fff', fontWeight:'800'}}>Pay with Razorpay</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalBtn,{backgroundColor:'#0F172A'}]} onPress={()=> { if(showPay){ payWithUPI(showPay.amount); setShowPay(null);} }}>
              <Text style={{color:'#fff', fontWeight:'800'}}>Pay via UPI Intent</Text>
            </TouchableOpacity>
            <Text style={styles.upiLabel}>Choose a payment app</Text>
            <View style={styles.upiApps}>
              {([
                ['gpay', 'Google Pay'],
                ['phonepe', 'PhonePe'],
                ['paytm', 'Paytm'],
              ] as const).map(([app, label]) => (
                <TouchableOpacity
                  key={app}
                  style={styles.upiApp}
                  onPress={() => {
                    if (showPay) {
                      payWithUPIApp(app, showPay.amount);
                      setShowPay(null);
                    }
                  }}
                >
                  <Text style={styles.upiAppText}>{label}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={[styles.modalBtn,{backgroundColor:colors.muted}]} onPress={()=>{ if(showPay) setInvoices(prev=>prev.map(x=> x.id===showPay.id ? {...x, status:'paid'}:x)); setShowPay(null); }}>
              <Text style={{fontWeight:'700'}}>Mark as Cash Paid</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>setShowPay(null)} style={{alignItems:'center', marginTop:16}}><Text style={{color:colors.textLight}}>Cancel</Text></TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* QR Modal */}
      <Modal visible={!!showQR} transparent animationType="slide">
        <View style={styles.modalBg}>
          <View style={[styles.modalCard,{alignItems:'center'}]}>
            {showQR && <UPIQRCode amount={showQR.amount} invoiceId={showQR.id} />}
            <TouchableOpacity style={[styles.modalBtn,{backgroundColor:colors.secondary, width:'100%', marginTop:16}]} onPress={()=>setShowQR(null)}>
              <Text style={{color:'#fff', fontWeight:'800'}}>Close - Patient Scanned</Text>
            </TouchableOpacity>
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
  invId:{ fontWeight:'800', color:colors.text }, patient:{ color:colors.text, marginTop:2, fontSize:12 }, services:{ color:colors.textLight, fontSize:11, marginTop:2 },
  amount:{ fontWeight:'800', fontSize:18, color:colors.text }, badge:{ paddingHorizontal:8, paddingVertical:2, borderRadius:12, marginTop:4 }, badgeText:{ fontSize:10, fontWeight:'700', textTransform:'uppercase' },
  actionBtn:{ backgroundColor:'#EFF6FF', borderRadius:radius.md, padding:10, alignItems:'center' },
  payText:{ fontSize:12, fontWeight:'700', color:colors.primary },
  modalBg:{ flex:1, backgroundColor:'rgba(0,0,0,0.5)', justifyContent:'flex-end' },
  modalCard:{ backgroundColor:colors.card, borderTopLeftRadius:24, borderTopRightRadius:24, padding:spacing.lg },
  modalBtn:{ padding:16, borderRadius:radius.md, alignItems:'center', marginTop:12 },
  upiLabel:{ color:colors.textLight, fontSize:12, fontWeight:'700', marginTop:16 },
  upiApps:{ flexDirection:'row', gap:8, marginTop:8 },
  upiApp:{ flex:1, backgroundColor:'#F0FDF4', borderRadius:radius.md, padding:12, alignItems:'center' },
  upiAppText:{ color:'#15803D', fontSize:11, fontWeight:'800' },
});
