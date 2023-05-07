import { Text } from 'react-native';
import React, { FC } from 'react';
import appStyles from '../../constants/appStyles';
import { colors } from '../../constants/palette';

interface FormTitleProps {
    title: string;
    color?: string;
}

const FormTitle: FC<FormTitleProps> = (props) => {
  return <Text style={[appStyles.pageTitle, {color: colors.dark_gray, marginTop: 15, marginButton: 10}]}>{props.title}</Text>
};
export default FormTitle;