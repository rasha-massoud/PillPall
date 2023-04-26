import { Button, ButtonProps, Text, TouchableOpacity, View, StyleProp, ViewStyle, TextStyle } from 'react-native';
import React, { FC } from 'react';
import styles from './styles';

interface TwoCustomButtonProps {
  buttonprops1: ButtonProps;
  buttonprops2: ButtonProps;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const TwoCustomButton: FC<TwoCustomButtonProps> = (props) => {
  return (
    <>
    <View style={styles.container}>
        <TouchableOpacity
            onPress={props.buttonprops2.onPress}
            style={[styles.buttonContainerSecond, props.containerStyle]}
        >
            <Text style={[styles.buttonTextSecond, props.textStyle]}>{props.buttonprops2.title}</Text>
        </TouchableOpacity>

        <TouchableOpacity
            onPress={props.buttonprops1.onPress}
            style={[styles.buttonContainerFirst, props.containerStyle]}
        >
            <Text style={[styles.buttonTextFirst, props.textStyle]}>{props.buttonprops1.title}</Text>
        </TouchableOpacity>
    </View>
    </> 
  );
};

export default TwoCustomButton;