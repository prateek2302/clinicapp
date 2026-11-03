import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Header } from '../../components/Header';
import { Card } from '../../components/Card';
import { colors, spacing } from '../../theme';
import { doctors } from '../../utils/mockData';

export default function DoctorsScreen(){
  return (
    <View style={{flex:1, backgroundColor:colors.background}}>
      <Header title="Doctors" subtitle="Staff availability" />
      <View style={styles.summary}>
        <View>
          <Text style={styles.summaryLabel}>TEAM STATUS</Text>
          <Text style={styles.summaryTitle}>
            {doctors.filter(doctor => doctor.available).length} of {doctors.length} online
          </Text>
        </View>
        <Text style={styles.summaryValue}>
          {doctors.reduce((total, doctor) => total + doctor.patientsToday, 0)} visits
        </Text>
      </View>
      <FlatList data={doctors} keyExtractor={i=>i.id} contentContainerStyle={{padding:spacing.md}} renderItem={({item})=>(
        <Card style={{marginBottom:12}}>
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <View><Text style={styles.name}>{item.name}</Text><Text style={styles.meta}>{item.specialty}</Text></View>
            <View style={{alignItems:'flex-end'}}><View style={[styles.dot, {backgroundColor:item.available?colors.success:colors.textLight}]} /><Text style={styles.meta}>{item.patientsToday} patients today</Text></View>
          </View>
        </Card>
      )} />
    </View>
  );
}
const styles = StyleSheet.create({
  summary:{ marginHorizontal:spacing.md, marginBottom:4, padding:16, borderRadius:16, backgroundColor:colors.secondary, flexDirection:'row', justifyContent:'space-between', alignItems:'center' },
  summaryLabel:{ color:'#8CCAC5', fontSize:10, fontWeight:'800', letterSpacing:1 },
  summaryTitle:{ color:'#fff', fontSize:17, fontWeight:'800', marginTop:4 },
  summaryValue:{ color:colors.accent, fontSize:14, fontWeight:'800' },
  name:{ fontWeight:'700', color:colors.text, fontSize:16 },
  meta:{ color:colors.textLight, fontSize:12, marginTop:2 },
  dot:{ width:10, height:10, borderRadius:5, marginBottom:4 }
});
