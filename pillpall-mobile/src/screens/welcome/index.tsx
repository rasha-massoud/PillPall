import React, { FC } from 'react'
import { SafeAreaView, Image } from 'react-native';
import CustomButton from '../../components/CustomButton';
import TextTitle from '../../components/TextTitle';
import SubTitleText from '../../components/SubTitleText';
import Body1Text from '../../components/Body1Text';
import { colors } from '../../constants/palette'
import { useNavigation } from '@react-navigation/core';
import styles from './styles'

const Welcome: FC = () => {

    const navigation = useNavigation();

    const handleCancelPress = () => {
        navigation.navigate("ContactInfo" as never, {} as never);
    };

    return (
    
    <SafeAreaView style={styles.container}>
        <TextTitle title='Hi PillPaller!' color= {colors.blue} />
        <SubTitleText title='Welcome to PillPall.'></SubTitleText>

        <Image
            source={require('../../../assets/into.gif')}
            style={styles.image}
        />

        <Body1Text context="As a patient, your health information is critical to help us understand your medical needs and provide the best care possible. To ensure we have a comprehensive understanding of your health status, we have a six-step process that will help us gather all the necessary information. Each step is designed to collect different aspects of your health information.
By completing each step, we can provide you with personalized and effective care. Let's walk through each step together."></Body1Text>

        <CustomButton containerStyle={{ alignSelf: 'center', marginTop: 40 }} buttonprops={{ title: "Continue", onPress: handleCancelPress }}  />

    </SafeAreaView>
  );
};

export default Welcome;