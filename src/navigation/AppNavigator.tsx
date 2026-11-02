
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAuthStore } from '../store/useAuthStore';
import { colors } from '../theme';

import LoginScreen from '../screens/Auth/LoginScreen';
import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import PatientsScreen from '../screens/Patients/PatientsScreen';
import AppointmentsScreen from '../screens/Appointments/UpdatedAppointmentsScreen';
import BookAppointmentScreen from '../screens/Appointments/BookAppointmentScreen';
import DoctorsScreen from '../screens/Doctors/DoctorsScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import BillingScreen from '../screens/Billing/BillingScreen';
import PrescriptionScreen from '../screens/Prescription/PrescriptionScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => (
  <Tab.Navigator screenOptions={{ headerShown:false, tabBarActiveTintColor:colors.primary, tabBarStyle:{height:65, paddingBottom:8} }}>
    <Tab.Screen name="Dashboard" component={DashboardScreen} options={{ tabBarIcon:({color,size})=> <Icon name="grid-outline" color={color} size={size}/> }} />
    <Tab.Screen name="Patients" component={PatientsScreen} options={{ tabBarIcon:({color,size})=> <Icon name="people-outline" color={color} size={size}/> }} />
    <Tab.Screen name="AppointmentsTab" options={{ title:'Appointments', tabBarIcon:({color,size})=> <Icon name="calendar-outline" color={color} size={size}/> }}>
      {()=>(
        <Stack.Navigator screenOptions={{headerShown:false}}>
          <Stack.Screen name="AppointmentsList" component={AppointmentsScreen} />
          <Stack.Screen name="BookAppointment" component={BookAppointmentScreen} />
          <Stack.Screen name="Prescription" component={PrescriptionScreen} />
        </Stack.Navigator>
      )}
    </Tab.Screen>
    <Tab.Screen name="Billing" component={BillingScreen} options={{ tabBarIcon:({color,size})=> <Icon name="receipt-outline" color={color} size={size}/> }} />
    <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarIcon:({color,size})=> <Icon name="person-outline" color={color} size={size}/> }} />
  </Tab.Navigator>
);

export default function AppNavigator(){
  const isLoggedIn = useAuthStore(s=>s.isLoggedIn);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown:false }}>
        {!isLoggedIn ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <Stack.Screen name="Main" component={MainTabs} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
