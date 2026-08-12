import React, { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import DashboardScreen from './src/screens/DashboardScreen';
import BrowseScreen from './src/screens/BrowseScreen';
import ProfileScreen from './src/screens/ProfileScreen';

export default function App() {
  // Navigation state: 'DASHBOARD' | 'BROWSE' | 'PROFILE'
  const [currentScreen, setCurrentScreen] = useState('DASHBOARD');

  // Load Airbnb Cereal fonts
  const [fontsLoaded] = useFonts({
    'AirbnbCereal-Bold': require('./assets/fonts/AirbnbCereal-Bold.otf'),
    'AirbnbCereal-Medium': require('./assets/fonts/AirbnbCereal-Medium.otf'),
    'AirbnbCereal-Book': require('./assets/fonts/AirbnbCereal-Book.otf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#1D4ED8" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, backgroundColor: '#000000' }}>
        {currentScreen === 'DASHBOARD' && (
          <DashboardScreen 
            onNavigateBrowse={() => setCurrentScreen('BROWSE')}
            onNavigateProfile={() => setCurrentScreen('PROFILE')}
          />
        )}

        {currentScreen === 'BROWSE' && (
          <BrowseScreen 
            onBackHome={() => setCurrentScreen('DASHBOARD')}
          />
        )}

        {currentScreen === 'PROFILE' && (
          <ProfileScreen 
            onBackHome={() => setCurrentScreen('DASHBOARD')}
          />
        )}
      </View>
    </SafeAreaProvider>
  );
}
