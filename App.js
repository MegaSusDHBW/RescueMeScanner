import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { RescueMeTheme, ToggleDarkMode } from './app/components/RescueMeTheme'
import {NativeBaseProvider, View, Text} from 'native-base';
import StackNavigator from './app/components/StackNavigator';

export default function App() {
  return (
    <NativeBaseProvider theme={RescueMeTheme}>
    
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
    
    </NativeBaseProvider>
  );
}



