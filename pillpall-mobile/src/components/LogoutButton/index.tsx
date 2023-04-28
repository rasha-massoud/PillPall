import React, { FC } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import appStyles from '../../constants/appStyles';

interface LogoutButtonProps {
    onPress: () => void;
}

const LogoutButton: FC<LogoutButtonProps> = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Text style={appStyles.subTitle}>Logout</Text>
    </TouchableOpacity>
  );
};

export default LogoutButton;