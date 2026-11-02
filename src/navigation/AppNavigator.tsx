import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import { useAuthStore } from '../store/useAuthStore';
import { colors } from '../theme';

import LoginScreen from '../screens/Auth/LoginScreen';
import SignUpScreen from '../screens/Auth/SignUpScreen';
import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import PatientsScreen from '../screens/Patients/PatientsScreen';
import PatientDetailsScreen from '../screens/Patients/PatientDetailsScreen';
import AppointmentsScreen from '../screens/Appointments/UpdatedAppointmentsScreen';
import BookAppointmentScreen from '../screens/Appointments/BookAppointmentScreen';
import DoctorsScreen from '../screens/Doctors/DoctorsScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import SettingsScreen from '../screens/Profile/SettingsScreen';
import PrivacyPolicyScreen from '../screens/Profile/PrivacyPolicyScreen';
import BillingScreen from '../screens/Billing/BillingScreen';
import PrescriptionScreen from '../screens/Prescription/PrescriptionScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

type TabIconName =
  | 'dashboard'
  | 'patients'
  | 'appointments'
  | 'billing'
  | 'profile';

const TabIcon = ({
  name,
  color,
  size,
}: {
  name: TabIconName;
  color: string;
  size: number;
}) => {
  const common = {
    fill: 'none' as const,
    stroke: color,
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {name === 'dashboard' && (
        <>
          <Rect {...common} x="4" y="4" width="6" height="6" rx="1" />
          <Rect {...common} x="14" y="4" width="6" height="6" rx="1" />
          <Rect {...common} x="4" y="14" width="6" height="6" rx="1" />
          <Rect {...common} x="14" y="14" width="6" height="6" rx="1" />
        </>
      )}
      {name === 'patients' && (
        <>
          <Circle {...common} cx="9" cy="8" r="3" />
          <Path {...common} d="M3.5 19c.6-3 2.4-4.5 5.5-4.5s4.9 1.5 5.5 4.5" />
          <Path
            {...common}
            d="M16 5.5a3 3 0 0 1 0 5.8M16 14.5c2.5.2 4 1.7 4.5 4.5"
          />
        </>
      )}
      {name === 'appointments' && (
        <>
          <Rect {...common} x="4" y="5.5" width="16" height="15" rx="2" />
          <Path
            {...common}
            d="M8 3.5v4M16 3.5v4M4 10h16M8 14h.01M12 14h.01M16 14h.01M8 17.5h.01M12 17.5h.01"
          />
        </>
      )}
      {name === 'billing' && (
        <>
          <Path
            {...common}
            d="M6 3.5h12a2 2 0 0 1 2 2v15l-3.5-2-3.5 2-3.5-2-3.5 2v-15a2 2 0 0 1 2-2Z"
          />
          <Path {...common} d="M8 8h8M8 12h8M8 16h4" />
        </>
      )}
      {name === 'profile' && (
        <>
          <Circle {...common} cx="12" cy="8" r="3.5" />
          <Path {...common} d="M4.5 20c.8-3.5 3.3-5.5 7.5-5.5s6.7 2 7.5 5.5" />
        </>
      )}
    </Svg>
  );
};

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: '#91A3B2',
      tabBarLabelStyle: { fontSize: 10, fontWeight: '700' },
      tabBarStyle: {
        height: 70,
        paddingTop: 8,
        paddingBottom: 9,
        borderTopColor: colors.border,
        backgroundColor: colors.card,
        elevation: 12,
      },
    }}
  >
    <Tab.Screen
      name="Dashboard"
      component={DashboardScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <TabIcon name="dashboard" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Patients"
      options={{
        tabBarIcon: ({ color, size }) => (
          <TabIcon name="patients" color={color} size={size} />
        ),
      }}
    >
      {() => (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="PatientsList" component={PatientsScreen} />
          <Stack.Screen
            name="PatientDetails"
            component={PatientDetailsScreen}
          />
        </Stack.Navigator>
      )}
    </Tab.Screen>
    <Tab.Screen
      name="AppointmentsTab"
      options={{
        title: 'Appointments',
        tabBarIcon: ({ color, size }) => (
          <TabIcon name="appointments" color={color} size={size} />
        ),
      }}
    >
      {() => (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="AppointmentsList"
            component={AppointmentsScreen}
          />
          <Stack.Screen
            name="BookAppointment"
            component={BookAppointmentScreen}
          />
          <Stack.Screen name="Prescription" component={PrescriptionScreen} />
        </Stack.Navigator>
      )}
    </Tab.Screen>
    <Tab.Screen
      name="Billing"
      component={BillingScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <TabIcon name="billing" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      options={{
        tabBarIcon: ({ color, size }) => (
          <TabIcon name="profile" color={color} size={size} />
        ),
      }}
    >
      {() => (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="ProfileHome" component={ProfileScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="BillingInvoices" component={BillingScreen} />
          <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
        </Stack.Navigator>
      )}
    </Tab.Screen>
  </Tab.Navigator>
);

export default function AppNavigator() {
  const isLoggedIn = useAuthStore(s => s.isLoggedIn);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          <Stack.Group>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </Stack.Group>
        ) : (
          <Stack.Screen name="Main" component={MainTabs} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
