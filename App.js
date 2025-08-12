import { useState } from 'react';
import './global.css';
import RNBootSplash from 'react-native-bootsplash'; 
import SplashScreenAnimated from './src/root/SplashScreenAnimated';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/root/AppNavigator';

function App() {
  const [isReady, setIsReady] = useState(false);

  const onSplashFinish = async () => {
    // Hide the native splash with fade effect
    await RNBootSplash.hide({ fade: true });
    setTimeout(() => setIsReady(true), 4000); // Match animation duration
  };

  return (
    // for fresh starter remove all these and start
    <SafeAreaProvider>
      <NavigationContainer>
        <SafeAreaView className="flex-1">
          {!isReady ? (
            <SplashScreenAnimated onFinish={onSplashFinish} />
          ) : (
            <AppNavigator />
          )}
        </SafeAreaView>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
