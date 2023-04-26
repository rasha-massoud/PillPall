import React, { FC } from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import CustomButton from '../../components/CustomButton';
import appStyles from '../../constants/appStyles';
import { colors } from '../../constants/palette';
// import { useNavigation } from '@react-navigation/native';

import styles from './styles'

const Login: FC = () => {

    return (
    
    <SafeAreaView style={styles.container}>
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
        <CustomButton style={styles.button} buttonprops={{ title: "Login", onPress: () => console.log('Login') }} />
        <TouchableOpacity > 
            <Text>Forgot Password?</Text>
        </TouchableOpacity>
        <Text style={appStyles.body1}>
            Don't have an account?{" "}
        <Text style={[appStyles.body1, { fontWeight: "bold" }]}>Sign Up</Text>
        </Text>
    </SafeAreaView>
  );
};

export default Login;