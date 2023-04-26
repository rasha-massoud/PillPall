import { Button, ButtonProps, Text, TouchableOpacity, View, StyleProp, ViewStyle, TextStyle } from 'react-native';
import React, { FC } from 'react';
import styles from './styles';

interface CustomButtonProps {
  buttonprops: ButtonProps;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const CustomButton: FC<CustomButtonProps> = (props) => {
  return (
    <>
      <TouchableOpacity
        onPress={props.buttonprops.onPress}
        style={[styles.buttonContainer, props.containerStyle]}
      >
        <Text style={[styles.buttonText, props.textStyle]}>{props.buttonprops.title}</Text>
      </TouchableOpacity>
    </>
  );
};

export default CustomButton;