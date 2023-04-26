import React, { FC } from 'react';
import { TouchableOpacity, Text, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import appStyles from '../../constants/appStyles';

import styles from './styles'

interface LoginSignupSwitchProps {
    textTitle: string;
    action: string;
    style?: ViewStyle;
    textStyle?: TextStyle;
    onPress: () => void;
}

const LoginSignupSwitch: FC<LoginSignupSwitchProps> = (props) => {
  return (
    <Text style={[appStyles.body1, styles.account, props.style]}>
      props.textTitle{' '}
      <TouchableOpacity onPress={props.onPress}>
        <Text style={[appStyles.body1, styles.signup, props.textStyle]}>props.action</Text>
      </TouchableOpacity>
    </Text>
  );
};

export default LoginSignupSwitch;