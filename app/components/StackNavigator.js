import { createStackNavigator } from '@react-navigation/stack';
import { Colors } from './Colors';
import { useColorMode } from 'native-base';
import ScannerScreen from '../Screens/ScannerScreen';
import { useFonts, Montserrat_600SemiBold } from '@expo-google-fonts/montserrat'
import AppLoading from 'expo-app-loading';


const Stack = createStackNavigator();

function StackNavigator(props) {
    let bgColor = useColorMode()['colorMode'] === 'dark' ? Colors.backgroundColorDark : Colors.backgroundColorLight;
    let textColor = useColorMode()['colorMode'] === 'dark' ? Colors.textColorLight : Colors.textColorDark;
    const weight = 'bold';
    let [fontsLoaded] = useFonts({ Montserrat_600SemiBold });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (
        <Stack.Navigator _light={{ bg: "danger.600" }}
            _dark={{ bg: "danger.500" }}>
            <Stack.Screen name="QR Code Scannen" component={ScannerScreen} options={{ headerShown: false, headerStyle: { backgroundColor: bgColor, }, headerTintColor: textColor, headerTitleStyle: { fontWeight: weight }, cardStyle: { backgroundColor: bgColor } }} />
            <Stack.Screen name="data" component={ScannerScreen} options={{ headerShown: false, headerStyle: { backgroundColor: bgColor, }, headerTintColor: textColor, headerTitleStyle: { fontWeight: weight }, cardStyle: { backgroundColor: bgColor } }} />
        </Stack.Navigator>
    );
}

console.log("field Stack" + Stack);
export default StackNavigator