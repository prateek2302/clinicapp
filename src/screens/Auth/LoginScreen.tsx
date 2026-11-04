import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { AppIcon } from '../../components/AppIcon';
import { colors, spacing, radius } from '../../theme';
import { useAuthStore } from '../../store/useAuthStore';
import { api } from '../../utils/api';

const DEMO_EMAIL = 'demo@clinicapp.com';
const DEMO_PASSWORD = 'Clinic@123';

export default function LoginScreen({ navigation }: any) {
  const login = useAuthStore(s => s.login);
  const [email, setEmail] = useState(DEMO_EMAIL);
  const [password, setPassword] = useState(DEMO_PASSWORD);
  const [error, setError] = useState('');

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.login(email, password);
      login(response.user.role);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : 'Unable to sign in. Start the ClinicApp API and try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoMark}>
        <AppIcon name="clinic" size={36} color={colors.inkOnPrimary} />
      </View>
      <Text style={styles.logo}>
        Clinic<Text style={styles.logoAccent}>App</Text>
      </Text>
      <Text style={styles.sub}>Clinic Management for Modern Practices</Text>
      <View style={styles.form}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={value => {
            setEmail(value);
            setError('');
          }}
          style={styles.input}
          placeholderTextColor={colors.textLight}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={value => {
            setPassword(value);
            setError('');
          }}
          secureTextEntry
          style={styles.input}
          placeholderTextColor={colors.textLight}
        />
        <TouchableOpacity style={styles.btn} onPress={handleLogin}>
          <Text style={styles.btnText}>{loading ? 'Signing in…' : 'Sign In'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.signUpLink}
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={styles.signUpPrompt}>Don't have an account? </Text>
          <Text style={styles.signUpText}>Create one</Text>
        </TouchableOpacity>
        <View style={styles.demoBox}>
          <Text style={styles.demoLabel}>DEMO ACCESS</Text>
          <Text style={styles.demoText}>{DEMO_EMAIL}</Text>
          <Text style={styles.demoText}>{DEMO_PASSWORD}</Text>
        </View>
        {!!error && <Text style={styles.error}>{error}</Text>}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    padding: spacing.lg,
  },
  logoMark: {
    alignSelf: 'center',
    width: 68,
    height: 68,
    borderRadius: 24,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  logo: {
    fontSize: 32,
    fontWeight: '900',
    color: colors.secondary,
    textAlign: 'center',
  },
  logoAccent: { color: colors.primary },
  sub: {
    textAlign: 'center',
    color: colors.textLight,
    marginTop: 8,
    marginBottom: 32,
  },
  form: {
    backgroundColor: colors.card,
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: 14,
    marginBottom: 12,
    color: colors.text,
  },
  btn: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: radius.md,
    alignItems: 'center',
    marginTop: 8,
  },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  hint: {
    textAlign: 'center',
    color: colors.textLight,
    marginTop: 12,
    fontSize: 12,
  },
  demoBox: {
    marginTop: 16,
    padding: 12,
    borderRadius: radius.md,
    backgroundColor: colors.muted,
  },
  demoLabel: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 5,
  },
  demoText: { color: colors.text, fontSize: 12, marginTop: 2 },
  error: {
    color: colors.danger,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
  },
  signUpLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 18,
  },
  signUpPrompt: { color: colors.textLight, fontSize: 12 },
  signUpText: { color: colors.primary, fontSize: 12, fontWeight: '800' },
});
