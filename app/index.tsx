import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { AuthProvider } from '../src/store/AuthContext';
import { ProductProvider } from '../src/store/ProductContext';

// Import screens
import MainTabNavigator from '../src/navigation/MainTabNavigator'; 
import LoginScreen from '../src/screens/LoginScreen'; 
import OnboardingScreen from '../src/screens/OnboardingScreen';
import RegisterScreen from '../src/screens/RegisterScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <AuthProvider>
        <ProductProvider>
          <Stack.Navigator
            initialRouteName="Onboarding"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Main" component={MainTabNavigator} />
          </Stack.Navigator>
        </ProductProvider>
      </AuthProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
