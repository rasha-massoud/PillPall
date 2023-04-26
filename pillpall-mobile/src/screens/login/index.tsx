import React, { FC } from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import CustomButton from '../../components/CustomButton';
import appStyles from '../../constants/appStyles';
import { colors } from '../../constants/palette';

import styles from './styles'

const Login: FC = () => {

    return (
    
    <SafeAreaView style={styles.container}>
        <Image
            source={require('../../../assets/logo.png')}
            style={styles.image}
        />
        <Text style={appStyles.mainTitle}>Login</Text>
        <Text style={appStyles.subTitle2}>Please sign in to continue.</Text>

        <View style={styles.inputContainer}>
            <Text style={appStyles.body1}>Email</Text>
            <TextInput 
                style={styles.input}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholder="Enter your email"
                placeholderTextColor= {colors.dark_gray}
            />
        </View>
        <View style={styles.inputContainer}>
            <Text style={appStyles.body1}>Password</Text>
            <TextInput 
                style={styles.input}
                secureTextEntry
                autoCapitalize="none"
                placeholder="Enter your password"
                placeholderTextColor={colors.dark_gray}
            />
        </View>
        
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