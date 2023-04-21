import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import Welcome from './Welcome';
import Register from './Register';
import Sign from './Sign';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from './Dashboard';
import Passwords from './Passwords';

export default function App() {
  const [fontsLoaded] = useFonts({
    'intersemibold':require('./assets/fonts/intersemibold.ttf'),
    'intermedium':require('./assets/fonts/intermedium.ttf'),
    'interregular':require('./assets/fonts/interregular.ttf'),
    'interlight':require('./assets/fonts/interlight.ttf'),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown:false,
      }}>
        <Stack.Screen name='Home' component={Welcome}></Stack.Screen>
        <Stack.Screen name='Register' component={Register}></Stack.Screen>
        <Stack.Screen name='Login' component={Sign}></Stack.Screen>
        <Stack.Screen name='Dashboard' component={Dashboard}></Stack.Screen>
        <Stack.Screen name='Passwords' component={Passwords}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
    
    

  );
}

