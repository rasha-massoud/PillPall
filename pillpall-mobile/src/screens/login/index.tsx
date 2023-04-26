import React, { FC } from 'react'
import { StyleSheet } from 'react-native';
import { SafeAreaView, View, Text, TextInput } from 'react-native';
import CustomButton from '../../components/CustomButton';
import appStyles from '../../constants/appStyles';
import { colors } from '../../constants/palette';

import styles from './styles'

const Login: FC = () => {
    return (
    
    <SafeAreaView style={styles.container}>
      <Text style={appStyles.mainTitle}>Login</Text>
      <Text style={appStyles.subTitle2}>Please sign in to continue.</Text>

      <View style={styles.inputContainer}>
        <Text style={appStyles.subTitle}>Email</Text>
        <TextInput 
          style={appStyles.body1}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="Enter your email"
          placeholderTextColor= {colors.dark_gray}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={appStyles.subTitle}>Password</Text>
        <TextInput 
          style={styles.input}
          secureTextEntry
          autoCapitalize="none"
          placeholder="Enter your password"
          placeholderTextColor={colors.dark_gray}
        />
      </View>
      <CustomButton buttonprops={{ title: "Login", onPress: () => console.log('Login') }} />
    </SafeAreaView>
  );
};

export default Login;