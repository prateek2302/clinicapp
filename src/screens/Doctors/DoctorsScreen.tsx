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
  name:{ fontWeight:'700', color:colors.text, fontSize:16 },
  meta:{ color:colors.textLight, fontSize:12, marginTop:2 },
  dot:{ width:10, height:10, borderRadius:5, marginBottom:4 }
});
