import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Text, ScrollView, View, Button, HStack, VStack } from 'native-base'

export default function ScannerScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState([])
  const [email, setEmail] = useState(null)
  const [firstName, setFirstName] = useState(null)
  const [lastName, setLastName] = useState(null)
  const [organDonorState, setOrganDonorState] = useState(null)
  const [bloodGroup, setBloodGroup] = useState(null)
  const [emergencyEmail, setEmergencyEmail] = useState(null)
  const [emergencyFirstName, setEmergencyFirstName] = useState(null)
  const [emergencyLastName, setEmergencyLastName] = useState(null)
  const [emergencyBirthDate, setEmergencyBirthDate] = useState(null)
  const [emergencyPhone, setEmergencyPhone] = useState(null)
  const [allergies, setAllergies] = useState([])
  const [allergiesCount, setAllergiesCount] = useState(0)
  const [diseases, setDiseases] = useState([])
  const [diseasesCount, setDiseasesCount] = useState(0)
  const [vaccines, setVaccines] = useState([])
  const [vaccinesCount, setVaccinesCount] = useState(0)
  const [birthDate, setBirthDate] = useState(null)
  const style = require('../components/Styles.js');

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    const encodedData = {
      'input': data
    }

    const decodedData = decodeData(encodedData)
    setData(data)
    setScanned(true);
    //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };
  async function decodeData(data) {
    const requestOptions =
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
    console.log(JSON.stringify(data));

    const response = await fetch('http://10.0.2.2:5000/read-qrcode', requestOptions)
    responseData = await response.json()

    let test = responseData.email

    console.log('response ' + JSON.stringify(responseData));
    setEmail(responseData.email)
    // console.log(email);
    setFirstName(responseData.firstname)
    setLastName(responseData.lastname)
    setOrganDonorState(responseData.organDonorState)
    setBloodGroup(responseData.bloodGroup)
    setEmergencyEmail(responseData.emergencyEmail)
    setEmergencyFirstName(responseData.emergencyFirstname)
    setEmergencyLastName(responseData.emergencyLastname)
    setEmergencyBirthDate(responseData.emergencyBirthday)
    setEmergencyPhone(responseData.emergencyPhone)
    // allergies
    if (responseData.allergies !== undefined && responseData.allergies !== null) {
      setAllergies(responseData.allergies)
      setAllergiesCount(Object.keys(responseData.allergies).length)
      console.log('allergies: ' + Object.keys(responseData.allergies).length);
    } else {
      setAllergies([])
      setAllergiesCount(0)
      console.log('NO ALLERGIES')
    }
    // diseases
    if (responseData.diseases !== undefined && responseData.diseases !== null) {
      setDiseases(responseData.diseases)
      setDiseasesCount(Object.keys(responseData.diseases).length)
      console.log('diseases: ' + Object.keys(responseData.diseases).length);
    } else {
      setDiseases([])
      setDiseasesCount(0)
      console.log('NO DISEASES');
    }
    // vaccines
    if (responseData.vaccines !== undefined) {
      setVaccines(responseData.vaccines)
      setVaccinesCount(Object.keys(responseData.vaccines).length)
      console.log('vaccines: ' + Object.keys(responseData.vaccines).length);
    } else {
      setVaccines([])
      setVaccinesCount(0)
      console.log('NO VACCINES');
    }
    // setBirthDate(responseData.birthDate)
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  if (scanned) {
    return (
      <ScrollView style={[style.wrapper, style.paddingTop]}>
        <VStack style={style.marginBottom}>
          <View style={[style.marginForm, style.center]}>
            <Text variant={'headline'}>Patientenname</Text>
          </View>
          <HStack style={[style.marginForm, style.flexBetween]}>
            <Text>Name:</Text>
            <Text>{firstName} {lastName}</Text>
          </HStack>
          {/* <HStack style={[style.marginForm, style.flexBetween]}>
            <Text>Geburtstag</Text>
            <Text>{birthDate}</Text>
          </HStack> */}
          {/* <VStack>
            <Text>E-Mail:</Text>
            <Text>{email}</Text>
          </VStack> */}
          <HStack style={[style.marginForm, style.flexBetween]}>
            <Text>Blutgruppe</Text>
            <Text>{bloodGroup}</Text>
          </HStack>
          <HStack style={[style.marginForm, style.flexBetween]}>
            <Text>Organspender</Text>
            {organDonorState === '1' && <Text>Ja</Text>}
            {organDonorState !== '1' && <Text>Nein</Text>}
          </HStack>
          <VStack style={[style.marginForm, style.dividerTop]}>
            <Text>Allergien:</Text>
            {allergies.map(allergy => {
              return <Text>{allergy.title}</Text>
            })}
            {allergiesCount === 0 && <Text>Keine Allergien vorhanden</Text>}
          </VStack>
          <VStack style={[style.marginForm, style.dividerTop]}>
            <Text>Vorerkrankungen:</Text>
            {diseases.map(disease => {
              return <Text>{disease.title}</Text>
            })}
            {diseasesCount === 0 && <Text>Keine Vorerkrankungen vorhanden</Text>}
          </VStack>
          <VStack style={[style.marginForm, style.dividerTop]}>
            <Text>Impfungen:</Text>
            {vaccines.map(vaccine => {
              return <Text>{vaccine.title}</Text>
            })}
            {vaccinesCount === 0 && <Text>Keine Impfungen vorhanden</Text>}
          </VStack>
          <View style={[style.marginForm, style.dividerTop, style.center]}>
            <Text variant={'headline'} style={[style.center]}>Notfallkontakt</Text>
          </View>
          <HStack style={[style.marginForm, style.flexBetween]}>
            <Text>Name</Text>
            <Text>{emergencyFirstName} {emergencyLastName}</Text>
          </HStack>
          <HStack style={[style.marginForm, style.flexBetween]}>
            <Text>Geburtstag</Text>
            <Text>{emergencyBirthDate}</Text>
          </HStack>
          <HStack style={[style.marginForm, style.flexBetween]}>
            <Text>Tel-Nr.</Text>
            <Text>{emergencyPhone}</Text>
          </HStack>
          <HStack style={[style.marginForm, style.flexBetween]}>
            <Text>E-Mail</Text>
            <Text>{emergencyEmail}</Text>
          </HStack>
          <View style={[style.marginForm]}>
            <Button onPress={() => setScanned(false)}>
              <Text>Zurück</Text>
            </Button>
          </View>
        </VStack>
      </ScrollView >
    );
  }
  return (
    <View style={style.flexCenter}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
}