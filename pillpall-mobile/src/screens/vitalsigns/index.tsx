import React, { FC, useState } from 'react'
import { SafeAreaView, Alert } from 'react-native';
import CustomButton from '../../components/CustomButton';
import PageTitle from '../../components/PageTitle';
import Body1Text from '../../components/Body1Text';
import { colors } from '../../constants/palette';
import TextInputwithLabel from '../../components/TextInputwithLabel';
import StepText from '../../components/StepText';
import { useNavigation } from '@react-navigation/core';
import { useDispatch, useSelector } from 'react-redux';
import { setBodyTemperature, setPulseRate, setRespirationRate, setSystolicBloodPressure } from '../../store/slices/reportSlice';

import styles from './styles';

const VitalSigns: FC = () => {

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [temperature, setTemperature] = useState<string>("");
  const [pulse, setPulse] = useState<string>("");
  const [respiration, setRespiration] = useState<string>("");
  const [pressure, setPressure] = useState<string>("");
  
  const handleTemperatureChange = async (value: string) => {
    setTemperature(value);
    dispatch(setBodyTemperature(value));
  }

  const handlePulseChange = async (value: string) => {
    setPulse(value);
    dispatch(setPulseRate(value));
  }

  const handleRespirationRateChange = async(value: string) => {
    setRespiration(value);
    dispatch(setRespirationRate(value));
  }

  const handleBloodPressureChange = async (value: string) => {
    setPressure(value);
    dispatch(setSystolicBloodPressure(value));
  }

  const handleContinuePress = () => {
    if(temperature && pulse && respiration && pressure ){
      navigation.navigate("MedicalHistory" as never, {} as never);
    }
    else{
      Alert.alert(
        'Fails',
        'Missing Field. Please may sure to fill all fields.',
        [
          { text: 'OK' }
        ],
        { cancelable: false }
      );
    }
  }

  return (
  
    <SafeAreaView style={styles.container}>
      <PageTitle title='Vital Signs' />
      <StepText title='Step 4' color={colors.blue}></StepText>

      <Body1Text context="Stay in the healthy zone! Share your vital signs' normal ranges. These benchmarks empower us to track your well-being and detect any deviations." />

      <TextInputwithLabel label="Normal Body Temperature (°C)" keyboardType="numeric" placeholder='Enter your Normal Body Temperature' textinputprops={{ secureTextEntry: false }} onChangeText= {handleTemperatureChange} />

      <TextInputwithLabel label="Normal Pulse Rate " keyboardType="numeric" placeholder='Enter your Normal Pulse Rate' textinputprops={{ secureTextEntry: false }} onChangeText= {handlePulseChange} />

      <TextInputwithLabel label="Normal Respiration Rate" keyboardType="numeric" placeholder='Enter your Normal Respiration Rate' textinputprops={{ secureTextEntry: false }} onChangeText= {handleRespirationRateChange} />
      
      <TextInputwithLabel label="Normal Systolic Blood Pressure" keyboardType="numeric" placeholder='Enter your Normal Systolic Blood Pressure' textinputprops={{ secureTextEntry: false }} onChangeText= {handleBloodPressureChange} />

      <CustomButton containerStyle={{ alignSelf: 'center', marginTop: 40, height: 45 }} buttonprops={{ title: "Continue", onPress: handleContinuePress }}  />

    </SafeAreaView>
  );
};

export default VitalSigns;