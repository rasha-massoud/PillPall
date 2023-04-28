import React, { FC } from 'react';
import { TouchableOpacity, Text, StyleProp, TextStyle } from 'react-native';
import appStyles from '../../constants/appStyles';

interface LogoutButtonProps {
    onPress: () => void;
    style?: StyleProp<TextStyle>;
}

const LogoutButton: FC<LogoutButtonProps> = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Text style={[appStyles.subTitle, props.style]}>Logout</Text>
    </TouchableOpacity>
  );
};

export default LogoutButton;