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
import { setBloodType, setHeight, setWeight } from '../../store/slices/reportSlice';

import styles from './styles';

const AnthropometricMeasurements: FC = () => {

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [h, setH] = useState<string>("");
  const [w, setW] = useState<string>("");
  const [type, setType] = useState<string>("");

  const handleHeightChange = async (value: string) => {
    setH(value);
    dispatch(setHeight(value));
  }

  const handleWeightChange = async (value: string) => {
    setW(value);
    dispatch(setWeight(value));
  }

  const handleBloodTypeChange = async (value: string) => {
    setType(value);
    dispatch(setBloodType(value));
  }

  const handleContinuePress = () => {    
    if (h && w && type){
      navigation.navigate("EmergencyContact" as never, {} as never);
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
      <PageTitle title='Anthropometric Measurements' />
      <StepText title='Step 2' color={colors.blue} />

      <Body1Text context="Measure up for optimal care! Share your vital stats to pave the way for a thorough evaluation of your health and set the foundation for future visits." />

      <TextInputwithLabel label="Blood Type" placeholder='Enter your Blood Type' textinputprops={{ secureTextEntry: false }} onChangeText= {handleBloodTypeChange} />

      <TextInputwithLabel label="Height (cm)" keyboardType="numeric" placeholder='Enter your Height' textinputprops={{ secureTextEntry: false }} onChangeText= {handleHeightChange} />

      <TextInputwithLabel label="Weight (Kg)" keyboardType="numeric" placeholder='Enter your Weight' textinputprops={{ secureTextEntry: false }} onChangeText= {handleWeightChange} />

      <CustomButton containerStyle={{ alignSelf: 'center', marginTop: 44, height: 45 }} buttonprops={{ title: "Continue", onPress: handleContinuePress }} />

    </SafeAreaView>
  );
};

export default AnthropometricMeasurements;