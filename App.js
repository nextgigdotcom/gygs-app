import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import BrowseScreen from './src/screens/BrowseScreen';

export default function App() {
  // Load Airbnb Cereal fonts
  const [fontsLoaded] = useFonts({
    'AirbnbCereal-Bold': require('./assets/fonts/AirbnbCereal-Bold.otf'),
    'AirbnbCereal-Medium': require('./assets/fonts/AirbnbCereal-Medium.otf'),
    'AirbnbCereal-Book': require('./assets/fonts/AirbnbCereal-Book.otf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, backgroundColor: '#080808', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2d5cd4" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, backgroundColor: '#080808' }}>
        <BrowseScreen 
          onBackHome={() => console.log('Back pressed')}
          onNavigateApplied={() => alert('Navigating to Applied Gygs...')}
        />
      </View>
    </SafeAreaProvider>
  );
}
