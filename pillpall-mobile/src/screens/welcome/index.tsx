import React, { FC } from 'react';
import { SafeAreaView, Image } from 'react-native';
import CustomButton from '../../components/CustomButton';
import TextTitle from '../../components/TextTitle';
import SubTitleText from '../../components/SubTitleText';
import Body1Text from '../../components/Body1Text';
import { colors } from '../../constants/palette';
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
        <SubTitleText title='Welcome to PillPall.' />

        <Image
            source={require('../../../assets/into.gif')}
            style={styles.image}
        />

        <Body1Text context="To ensure we have a thorough understanding of your medical needs and can provide you with the best care possible, we have developed a six-step process to gather all the necessary health information. Let's walk through each step together." />

        <CustomButton containerStyle={{ alignSelf: 'center', marginTop: 50 }} buttonprops={{ title: "Continue", onPress: handleCancelPress }}  />

    </SafeAreaView>
  );
};

export default Welcome;