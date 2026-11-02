import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Header } from '../../components/Header';
import { Card } from '../../components/Card';
import { colors, spacing, radius } from '../../theme';
import { patients } from '../../utils/mockData';

export default function PatientsScreen({ navigation }: any) {
  const [q, setQ] = useState('');
  const filtered = patients.filter(p =>
    p.name.toLowerCase().includes(q.toLowerCase()),
  );
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header title="Patients" subtitle={`${filtered.length} total records`} />
      <View style={{ paddingHorizontal: spacing.md }}>
        <TextInput
          placeholder="Search patients..."
          value={q}
          onChangeText={setQ}
          style={styles.search}
          placeholderTextColor={colors.textLight}
        />
      </View>
      <FlatList
        data={filtered}
        keyExtractor={i => i.id}
        contentContainerStyle={{ padding: spacing.md }}
        renderItem={({ item }) => (
          <Card style={{ marginBottom: 12 }}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.meta}>
                  {item.age}y • {item.gender} • {item.condition}
                </Text>
                <Text style={styles.meta}>{item.phone}</Text>
              </View>
              <TouchableOpacity
                style={styles.viewBtn}
                onPress={() =>
                  navigation.navigate('PatientDetails', { patient: item })
                }
                accessibilityLabel={`View ${item.name}`}
              >
                <Text style={{ color: colors.primary, fontWeight: '700' }}>
                  View
                </Text>
              </TouchableOpacity>
            </View>
          </Card>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  search: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: 14,
    marginBottom: 4,
  },
  name: { fontWeight: '700', color: colors.text, fontSize: 16 },
  meta: { color: colors.textLight, fontSize: 12, marginTop: 2 },
  viewBtn: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
});
