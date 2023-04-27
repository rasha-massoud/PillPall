import { Text, View, KeyboardTypeOptions, TextStyle, TextInput, TextInputProps } from 'react-native';
import React, { FC } from 'react';
import styles from './styles';
import appStyles from '../../constants/appStyles';
import { colors } from '../../constants/palette';

interface TextInputwithLabelProps {
    textinputprops: TextInputProps;
    label: string;
    placeholder: string;
    keyboardType?: KeyboardTypeOptions;
  }

const TextInputwithLabel: FC<TextInputwithLabelProps> = (props) => {
  return (
    <>
        <View style={styles.inputContainer}>
            <Text style={appStyles.body1}>{props.label}</Text>
            <TextInput 
                style={styles.input}
                secureTextEntry
                autoCapitalize="none"
                keyboardType={props.keyboardType}
                {...props.textinputprops}
                placeholderTextColor={colors.dark_gray}
                placeholder={props.placeholder}
            />
        </View>
    </>
  );
};

export default TextInputwithLabel;