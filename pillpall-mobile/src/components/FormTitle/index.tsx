import { Text } from 'react-native';
import React, { FC } from 'react';
import appStyles from '../../constants/appStyles';
import { colors } from '../../constants/palette';
import { fonts } from '../../constants/font';

interface FormTitleProps {
    title: string;
    color?: string;
}

const FormTitle: FC<FormTitleProps> = (props) => {
  return <Text style={[appStyles.subTitle, { fontWeight: fonts.italic , color: colors.blue, marginTop: 15}]}>{props.title}</Text>
};
export default FormTitle;