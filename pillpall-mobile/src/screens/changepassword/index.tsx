import React, { FC } from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import CustomButton from '../../components/CustomButton';
import TextInputwithLabel from '../../components/TextInputwithLabel';
import TextTitle from '../../components/TextTitle';
import TwoCustomButton from '../../components/TwoCustomButton';

import styles from './styles'

const ChangePassword: FC = () => {

    return (
    
    <SafeAreaView style={styles.container}>
        <Image
            source={require('../../../assets/changepass.png')}
            style={styles.image}
        />

        <TextTitle title='Change Password'></TextTitle>

        <TextInputwithLabel label="Old Password" placeholder='Enter your Old Password' textinputprops={{ secureTextEntry: true }} />
        <TextInputwithLabel label="New Password" placeholder='Enter a New Password' textinputprops={{ secureTextEntry: true }} />
        <TextInputwithLabel label="Confirm New Password" placeholder='Re-enter the New Password' textinputprops={{ secureTextEntry: true }} />
        
        <TwoCustomButton containerStyle={{ alignSelf: 'center'}} buttonprops2={{ title: "Cancel", onPress: () => console.log('Cancel') }} buttonprops1={{ title: "Save", onPress: () => console.log('Save') }}></TwoCustomButton>

    </SafeAreaView>
  );
};

export default ChangePassword;