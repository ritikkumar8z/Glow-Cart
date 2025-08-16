import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import { useAuth } from '../store/AuthContext';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    try {
      setLoading(true);
      await login(email, password); // Firebase Auth se call hoga
      navigation.replace('Main');   // replace use karo taki back se login screen na aaye
    } catch (error) {
      Alert.alert('Login Failed', error.message || 'Please try again');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    Alert.alert('Coming Soon', `${provider} login will be available soon!`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Dismiss Keyboard when tapping outside */}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Welcome Back!</Text>
              <Text style={styles.subtitle}>Sign in to continue</Text>
            </View>

            {/* Form */}
            <View style={styles.form}>
              <CustomInput
                placeholder="Email Address"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                leftIcon="mail-outline"
                returnKeyType="next"
              />

              <CustomInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                leftIcon="lock-closed-outline"
                rightIcon={showPassword ? "eye-off-outline" : "eye-outline"}
                onRightIconPress={() => setShowPassword(!showPassword)}
                returnKeyType="done"
              />

              <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>

              <CustomButton
                title="Login"
                onPress={handleLogin}
                loading={loading}
                style={styles.loginButton}
              />
            </View>

            {/* Social Login */}
            <View style={styles.socialContainer}>
              <Text style={styles.orText}>Or continue with</Text>
              <View style={styles.socialButtons}>
                <TouchableOpacity
                  style={styles.socialButton}
                  onPress={() => handleSocialLogin('Google')}
                >
                  <Ionicons name="logo-google" size={24} color="#DB4437" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.socialButton}
                  onPress={() => handleSocialLogin('Apple')}
                >
                  <Ionicons name="logo-apple" size={24} color="#000000" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.socialButton}
                  onPress={() => handleSocialLogin('Facebook')}
                >
                  <Ionicons name="logo-facebook" size={24} color="#4267B2" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Register Link */}
            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>Don&apos;t have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.registerLink}>Register Now</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: { alignItems: 'center', marginBottom: 40 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#666' },
  form: { marginBottom: 30 },
  forgotPassword: { alignSelf: 'flex-end', marginTop: 12, marginBottom: 30 },
  forgotPasswordText: { color: '#FF69B4', fontSize: 14, fontWeight: '600' },
  loginButton: { backgroundColor: '#FF69B4', marginTop: 10 },
  socialContainer: { alignItems: 'center', marginBottom: 30 },
  orText: { fontSize: 14, color: '#999', marginBottom: 20 },
  socialButtons: { flexDirection: 'row', justifyContent: 'center', gap: 20 },
  socialButton: {
    width: 50, height: 50, borderRadius: 25, backgroundColor: '#F8F8F8',
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: '#E0E0E0',
  },
  registerContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  registerText: { fontSize: 14, color: '#666' },
  registerLink: { fontSize: 14, color: '#FF69B4', fontWeight: '600' },
});

export default LoginScreen;
