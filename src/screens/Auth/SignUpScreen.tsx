import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { AppIcon } from '../../components/AppIcon';
import { colors, spacing, radius } from '../../theme';
import { useAuthStore } from '../../store/useAuthStore';

export default function SignUpScreen({ navigation }: any) {
  const login = useAuthStore(s => s.login);
  const [clinicName, setClinicName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = () => {
    if (!clinicName.trim() || !email.trim() || !password || !confirmPassword) {
      setError('Please complete all fields.');
      return;
    }
    if (!email.includes('@')) {
      setError('Enter a valid email address.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    login();
  };

  const clearError = () => setError('');

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <TouchableOpacity
        style={styles.backLink}
        onPress={() => navigation.goBack()}
        accessibilityRole="button"
        accessibilityLabel="Sign In"
      >
        <Text style={styles.backArrow}>‹</Text>
        <Text style={styles.backText}>Sign In</Text>
      </TouchableOpacity>
      <View style={styles.logoMark}>
        <AppIcon name="clinic" size={32} color={colors.inkOnPrimary} />
      </View>
      <Text style={styles.logo}>
        Clinic<Text style={styles.logoAccent}>App</Text>
      </Text>
      <Text style={styles.sub}>Create your clinic administrator account</Text>

      <View style={styles.form}>
        <Text style={styles.title}>Get started</Text>
        <Text style={styles.formSub}>Set up your clinic in a few steps.</Text>
        <TextInput
          placeholder="Clinic name"
          value={clinicName}
          onChangeText={value => {
            setClinicName(value);
            clearError();
          }}
          style={styles.input}
          placeholderTextColor={colors.textLight}
        />
        <TextInput
          placeholder="Email address"
          value={email}
          onChangeText={value => {
            setEmail(value);
            clearError();
          }}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
          placeholderTextColor={colors.textLight}
        />
        <TextInput
          placeholder="Password (8+ characters)"
          value={password}
          onChangeText={value => {
            setPassword(value);
            clearError();
          }}
          secureTextEntry
          style={styles.input}
          placeholderTextColor={colors.textLight}
        />
        <TextInput
          placeholder="Confirm password"
          value={confirmPassword}
          onChangeText={value => {
            setConfirmPassword(value);
            clearError();
          }}
          secureTextEntry
          style={styles.input}
          placeholderTextColor={colors.textLight}
        />
        <TouchableOpacity style={styles.btn} onPress={handleSignUp}>
          <Text style={styles.btnText}>Create account</Text>
        </TouchableOpacity>
        {!!error && <Text style={styles.error}>{error}</Text>}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    backgroundColor: colors.background,
    padding: spacing.lg,
    paddingTop: spacing.xl,
  },
  backLink: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingRight: 12,
    marginBottom: 34,
  },
  backArrow: {
    color: colors.primary,
    fontSize: 30,
    lineHeight: 27,
    marginRight: 5,
  },
  backText: { color: colors.primary, fontSize: 14, fontWeight: '800' },
  logoMark: {
    alignSelf: 'center',
    width: 62,
    height: 62,
    borderRadius: 22,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  logo: {
    color: colors.secondary,
    fontSize: 30,
    fontWeight: '900',
    textAlign: 'center',
  },
  logoAccent: { color: colors.primary },
  sub: {
    color: colors.textLight,
    textAlign: 'center',
    marginTop: 7,
    marginBottom: 24,
  },
  form: {
    backgroundColor: colors.card,
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: { color: colors.text, fontSize: 20, fontWeight: '800' },
  formSub: { color: colors.textLight, fontSize: 12, marginTop: 4, marginBottom: 18 },
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
  error: {
    color: colors.danger,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
  },
});
