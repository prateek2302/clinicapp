import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Header } from '../../components/Header';
import { Card } from '../../components/Card';
import { colors, spacing, radius } from '../../theme';
import { appointments } from '../../utils/mockData';

const tabs = ['all','upcoming','completed','cancelled'] as const;

export default function AppointmentsScreen(){
  const [tab,setTab]=useState<typeof tabs[number]>('all');
  const data = tab==='all'? appointments : appointments.filter(a=>a.status===tab);
  return (
    <View style={{flex:1, backgroundColor:colors.background}}>
      <Header title="Appointments" subtitle="Manage daily schedule" />
      <View style={styles.summaryRow}>
        <View><Text style={styles.summaryValue}>{appointments.length}</Text><Text style={styles.summaryLabel}>Total today</Text></View>
        <View><Text style={[styles.summaryValue, {color:colors.success}]}>{appointments.filter(a=>a.status==='completed').length}</Text><Text style={styles.summaryLabel}>Completed</Text></View>
        <View><Text style={[styles.summaryValue, {color:colors.warning}]}>{appointments.filter(a=>a.status==='upcoming').length}</Text><Text style={styles.summaryLabel}>Upcoming</Text></View>
      </View>
      <View style={styles.tabRow}>
        {tabs.map(t=>(
          <TouchableOpacity key={t} onPress={()=>setTab(t)} style={[styles.tab, tab===t && styles.tabActive]}>
            <Text style={[styles.tabText, tab===t && styles.tabTextActive]}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList data={data} keyExtractor={i=>i.id} contentContainerStyle={{padding:spacing.md}} renderItem={({item})=>(
        <Card style={{marginBottom:12}}>
          <Text style={{fontWeight:'700', color:colors.text}}>{item.patientName} → {item.doctorName}</Text>
          <Text style={{color:colors.textLight, marginTop:4}}>{item.date} at {item.time} • {item.type}</Text>
          <View style={[styles.status, {backgroundColor: item.status==='completed'?'#DCFCE7': item.status==='cancelled'?'#FEE2E2':'#DBEAFE'}]}>
            <Text style={{fontSize:12, fontWeight:'600', color:colors.text}}>{item.status}</Text>
          </View>
        </Card>
      )} />
    </View>
  );
}
const styles = StyleSheet.create({
  summaryRow:{ flexDirection:'row', justifyContent:'space-between', marginHorizontal:spacing.md, marginBottom:12, padding:16, borderRadius:16, backgroundColor:colors.card, borderWidth:1, borderColor:colors.border },
  summaryValue:{ fontSize:20, fontWeight:'800', color:colors.primary },
  summaryLabel:{ fontSize:10, color:colors.textLight, marginTop:2 },
  tabRow:{ flexDirection:'row', paddingHorizontal:spacing.md, gap:8, marginBottom:8 },
  tab:{ paddingHorizontal:14, paddingVertical:8, borderRadius:radius.md, backgroundColor:colors.muted },
  tabActive:{ backgroundColor:colors.primary },
  tabText:{ fontSize:12, textTransform:'capitalize', color:colors.textLight, fontWeight:'600' },
  tabTextActive:{ color:'#fff' },
  status:{ alignSelf:'flex-start', marginTop:8, paddingHorizontal:10, paddingVertical:4, borderRadius:20 }
});
