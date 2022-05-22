import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import {Text,View,Button} from 'native-base'
import StackNavigator from '../components/StackNavigator';

export default function ScannerScreen({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState([])
  const [email,setEmail] = useState(null)
  const [firstName,setFirstName] = useState(null)
  const [lastName,setLastName]=useState(null)
  const [organDonorState,setOrganDonorState] = useState(null)
  const [bloodGroup,setBloodGroup] = useState(null)
  const [emergencyEmail,setEmergencyEmail] =useState(null)
  const [emergencyFirstName,setEmergencyFirstName] = useState(null)
  const [emergencyLastName,setEmergencyLastName] = useState(null)
  const [emergencyBirthDate,setEmergencyBirthDate] = useState(null)
  const [emergencyPhone,setEmergencyPhone] = useState(null)



  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    
    const encodedData ={
      'input': data
    }

    decodedData = decodeData(encodedData)
    setData(data)
    setScanned(true);
    //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };
async function decodeData(data){
    const requestOptions =
    {

      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
    console.log(JSON.stringify(data));

   const response= await fetch('http://10.0.2.2:5000/read-qrcode',requestOptions)
   responseData= await response.json()

   let test = responseData.email

   console.log('response '+responseData);
   setEmail(responseData.email)
   console.log(email);
   setFirstName(responseData.firstname)
   setLastName(responseData.lastname)
   setOrganDonorState(responseData.organDonorState)
   setBloodGroup(responseData.bloodGroup)
   setEmergencyEmail(responseData.emergencyEmail)
   setEmergencyFirstName(responseData.emergencyFirstname)
   setEmergencyLastName(responseData.emergencyLastname)
   setEmergencyBirthDate(responseData.emergencyBirthday)
   setEmergencyPhone(responseData.emergencyPhone)
   

  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  if(scanned){
  return(
<View>
  <Text>{email}</Text>
  
</View>
  );  
  }
  return (
    
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {/* {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />} */}
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
    },
  });