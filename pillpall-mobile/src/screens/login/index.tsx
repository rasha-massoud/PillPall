import React, { FC } from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import CustomButton from '../../components/CustomButton';
import appStyles from '../../constants/appStyles';
import { colors } from '../../constants/palette';
import TextInputwithLabel from '../../components/TextInputwithLabel';
import TextTitle from '../../components/TextTitle';
import SubTitleText from '../../components/SubTitleText';

import styles from './styles'

const Login: FC = () => {

    return (
    
    <SafeAreaView style={styles.container}>
        <Image
            source={require('../../../assets/logo.png')}
            style={styles.image}
        />
        <TextTitle title='Login'></TextTitle>
        <SubTitleText title='Please sign in to continue.'></SubTitleText>

        <TextInputwithLabel label="Email" textinputprops={{ secureTextEntry: false }}/>

        <TextInputwithLabel label="Password" textinputprops={{ secureTextEntry: true }} />

        <CustomButton containerStyle={{ alignSelf: 'center' }} buttonprops={{ title: "Login", onPress: () => console.log('Login') }}  />
        <TouchableOpacity style={styles.forgotPassword}> 
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
        <Text style={[appStyles.body1, styles.account]}>
            Don't have an account?{" "}
            <TouchableOpacity>
                <Text style={[appStyles.body1, styles.signup]}>Sign Up</Text>
            </TouchableOpacity>
        </Text>
    </SafeAreaView>
  );
};

export default Login;