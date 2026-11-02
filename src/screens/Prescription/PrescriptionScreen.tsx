
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { Card } from '../../components/Card';
import { colors, spacing, radius } from '../../theme';
import { generatePrescriptionPDF, sharePDF } from '../../utils/pdfGenerator';
import { sendPrescriptionOnWhatsApp } from '../../utils/whatsapp';

type Med = { name:string; dosage:string; duration:string; instruction:string };

export default function PrescriptionScreen({ route }:any){
  const patientName = route?.params?.patient || 'Aarav Sharma';
  const patientPhone = route?.params?.phone || '+91 9876543210';
  const [meds,setMeds]=useState<Med[]>([{ name:'Paracetamol 500mg', dosage:'1 tab', duration:'3 days', instruction:'After food' }]);
  const [diagnosis,setDiagnosis]=useState('Viral fever with hypertension');
  const [advice,setAdvice]=useState('Rest, hydrate, low salt diet. Follow up after 3 days.');
  const [phone,setPhone]=useState(patientPhone);
  const [loading,setLoading]=useState(false);

  const addMed = ()=> setMeds([...meds, { name:'', dosage:'', duration:'', instruction:'' }]);
  const updateMed = (i:number, k:keyof Med, v:string)=> { const n=[...meds]; n[i][k]=v; setMeds(n); };

  const handleGeneratePDF = async (action:'preview'|'share'|'whatsapp') => {
    if(!meds[0]?.name) { Alert.alert('Add at least one medicine'); return; }
    setLoading(true);
    try {
      const path = await generatePrescriptionPDF({
        patientName, age:'Age 34 • Male', diagnosis, meds, advice, doctorName:'Dr. Priya Singh'
      });
      setLoading(false);
      if(!path) throw new Error('PDF failed');
      
      if(action==='preview') Alert.alert('PDF Generated', `Saved at: ${path}`);
      if(action==='share') await sharePDF(path);
      if(action==='whatsapp') {
        await sendPrescriptionOnWhatsApp(phone, patientName, path, diagnosis);
        Alert.alert('WhatsApp', `Message opened for ${patientName}. PDF is ready to attach: ${path.split('/').pop()}`);
      }
    } catch(e:any){ setLoading(false); Alert.alert('Error', e.message); }
  };

  return (
    <ScrollView style={{flex:1, backgroundColor:colors.background}} contentContainerStyle={{padding:spacing.md}}>
      <Text style={styles.title}>Prescription + PDF + WhatsApp</Text>
      <Card style={{marginBottom:12, backgroundColor:colors.secondary}}>
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
          <View><Text style={{color:'#fff', fontWeight:'800'}}>{patientName}</Text><Text style={{color:'#94A3B8', marginTop:2}}>01 Nov 2026 • Jaipur Clinic</Text></View>
          <View style={{backgroundColor:'#10B981', paddingHorizontal:10, paddingVertical:4, borderRadius:20, alignSelf:'flex-start'}}><Text style={{color:'#fff', fontSize:10, fontWeight:'700'}}>Verified</Text></View>
        </View>
      </Card>

      <Text style={styles.label}>Patient WhatsApp Number</Text>
      <TextInput value={phone} onChangeText={setPhone} placeholder="+91 98765 43210" style={styles.input} keyboardType="phone-pad" />

      <Text style={styles.label}>Diagnosis</Text>
      <TextInput value={diagnosis} onChangeText={setDiagnosis} style={styles.input} />

      <Text style={styles.label}>Medicines</Text>
      {meds.map((m,i)=>(
        <Card key={i} style={{marginBottom:10}}>
          <TextInput placeholder="Medicine name" value={m.name} onChangeText={v=>updateMed(i,'name',v)} style={styles.medInput} placeholderTextColor="#94A3B8" />
          <View style={{flexDirection:'row', gap:8, marginTop:8}}>
            <TextInput placeholder="Dosage" value={m.dosage} onChangeText={v=>updateMed(i,'dosage',v)} style={[styles.medInput,{flex:1}]} />
            <TextInput placeholder="Duration" value={m.duration} onChangeText={v=>updateMed(i,'duration',v)} style={[styles.medInput,{flex:1}]} />
          </View>
          <TextInput placeholder="After food / Before food" value={m.instruction} onChangeText={v=>updateMed(i,'instruction',v)} style={[styles.medInput,{marginTop:8}]} />
        </Card>
      ))}
      <TouchableOpacity onPress={addMed} style={styles.addBtn}><Text style={{color:colors.primary, fontWeight:'700'}}>+ Add Medicine</Text></TouchableOpacity>

      <Text style={styles.label}>Advice</Text>
      <TextInput value={advice} onChangeText={setAdvice} multiline style={[styles.input,{height:80}]} />

      <View style={{flexDirection:'row', gap:12, marginTop:24}}>
        <TouchableOpacity style={[styles.actionBtn,{backgroundColor:colors.card, borderWidth:1, borderColor:colors.border, flex:1}]} onPress={()=>handleGeneratePDF('preview')} disabled={loading}>
          {loading? <ActivityIndicator/> : <Text style={{fontWeight:'700'}}>📄 Preview</Text>}
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtn,{backgroundColor:colors.primary, flex:1}]} onPress={()=>handleGeneratePDF('share')} disabled={loading}>
          {loading? <ActivityIndicator color="#fff"/> : <Text style={{color:'#fff', fontWeight:'800'}}>Share PDF</Text>}
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={[styles.actionBtn,{backgroundColor:'#25D366', marginTop:12, flexDirection:'row', gap:8}]} onPress={()=>handleGeneratePDF('whatsapp')} disabled={loading}>
        {loading? <ActivityIndicator color="#fff"/> : <><Text style={{color:'#fff', fontWeight:'800', fontSize:16}}>💬</Text><Text style={{color:'#fff', fontWeight:'800'}}>Send on WhatsApp</Text></>}
      </TouchableOpacity>

      <Card style={{marginTop:16, backgroundColor:'#F0FDF4', borderColor:'#BBF7D0'}}>
        <Text style={{fontWeight:'700', color:'#15803D'}}>WhatsApp Auto-Message Preview:</Text>
        <Text style={{color:'#166534', fontSize:12, marginTop:6}}>🏥 ClinicApp - Prescription{"\n"}Hi {patientName}, Your prescription is ready.{"\n"}Diagnosis: {diagnosis}{"\n"}Clinic: Jaipur Clinic{"\n"}PDF will be attached.</Text>
      </Card>

      <View style={{height:40}} />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  title:{ fontSize:20, fontWeight:'800', color:colors.text, marginBottom:12 },
  label:{ fontSize:12, fontWeight:'700', color:colors.text, marginTop:14, marginBottom:6, textTransform:'uppercase' },
  input:{ backgroundColor:colors.card, borderWidth:1, borderColor:colors.border, borderRadius:radius.md, padding:14, color:colors.text },
  medInput:{ backgroundColor:colors.muted, borderRadius:radius.md, padding:10, color:colors.text },
  addBtn:{ borderStyle:'dashed', borderWidth:1, borderColor:colors.primary, borderRadius:radius.md, padding:12, alignItems:'center', marginTop:4 },
  actionBtn:{ padding:16, borderRadius:radius.md, alignItems:'center', justifyContent:'center' }
});
