import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Header } from '../../components/Header';
import { Card } from '../../components/Card';
import { colors, spacing } from '../../theme';
import { appointments, patients, doctors } from '../../utils/mockData';

export default function DashboardScreen(){
  return (
    <ScrollView style={{flex:1, backgroundColor:colors.background}}>
      <Header title="Good Morning, Admin" subtitle="Here's what's happening at your clinic today" />
      <View style={styles.statsRow}>
        <Card style={styles.statCard}><Text style={styles.statNum}>{patients.length*12}</Text><Text style={styles.statLabel}>Total Patients</Text></Card>
        <Card style={styles.statCard}><Text style={[styles.statNum,{color:colors.primary}]}>{appointments.length}</Text><Text style={styles.statLabel}>Today's Appointments</Text></Card>
      </View>
      <View style={styles.statsRow}>
        <Card style={styles.statCard}><Text style={[styles.statNum,{color:colors.success}]}>{doctors.filter(d=>d.available).length}</Text><Text style={styles.statLabel}>Doctors Available</Text></Card>
        <Card style={styles.statCard}><Text style={[styles.statNum,{color:colors.warning}]}>₹18,500</Text><Text style={styles.statLabel}>Today's Revenue</Text></Card>
      </View>
      <View style={{padding:spacing.md}}>
        <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
        {appointments.slice(0,3).map(a=>(
          <Card key={a.id} style={{marginBottom:12}}>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
              <View><Text style={styles.bold}>{a.patientName}</Text><Text style={styles.light}>{a.doctorName} • {a.type}</Text></View>
              <View style={{alignItems:'flex-end'}}><Text style={styles.bold}>{a.time}</Text><Text style={[styles.badge, a.status==='upcoming'&&{backgroundColor:'#DBEAFE'}]}>{a.status}</Text></View>
            </View>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  statsRow:{ flexDirection:'row', paddingHorizontal:spacing.md, gap:12, marginBottom:12 },
  statCard:{ flex:1 },
  statNum:{ fontSize:24, fontWeight:'800', color:colors.text },
  statLabel:{ fontSize:12, color:colors.textLight, marginTop:4 },
  sectionTitle:{ fontSize:16, fontWeight:'700', color:colors.text, marginBottom:12 },
  bold:{ fontWeight:'700', color:colors.text },
  light:{ color:colors.textLight, fontSize:12, marginTop:2 },
  badge:{ fontSize:10, marginTop:4, paddingHorizontal:8, paddingVertical:2, borderRadius:20, overflow:'hidden', color:colors.primary }
});
