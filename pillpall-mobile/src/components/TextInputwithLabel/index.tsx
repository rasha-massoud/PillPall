import { Text, View, KeyboardTypeOptions, TouchableWithoutFeedback, TextInput, TextInputProps } from 'react-native';
import React, { FC, useRef, useState} from 'react';
import styles from './styles';
import appStyles from '../../constants/appStyles';
import { colors } from '../../constants/palette';
import { Keyboard } from 'react-native';

interface TextInputwithLabelProps {
  textinputprops: TextInputProps;
  label: string;
  placeholder: string;
  keyboardType?: KeyboardTypeOptions | EmailKeyboardType;
  onChangeText?: (value: string) => void;
}

type EmailKeyboardType = 'email-address';

const TextInputwithLabel: FC<TextInputwithLabelProps> = (props) => {
  const inputRef = useRef<TextInput>(null);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <>
        <TouchableWithoutFeedback onPress={dismissKeyboard}>

          <View style={styles.inputContainer}>
            <Text style={appStyles.body1}>{props.label}</Text>
              <TextInput 
                  ref={inputRef}
                  style={styles.input}
                  secureTextEntry
                  autoCapitalize="none"
                  keyboardType={props.keyboardType}
                  {...props.textinputprops}
                  placeholderTextColor={colors.dark_gray}
                  placeholder={props.placeholder}
                  onChangeText={props.onChangeText}
              />
          </View>
        </TouchableWithoutFeedback>

    </>
  );
};

export default TextInputwithLabel;