import { Text } from 'react-native';
import React, { FC } from 'react';
import appStyles from '../../constants/appStyles';

interface TextTitleProps {
    title: string;
}

const TextTitle: FC<TextTitleProps> = (props) => {
  return <Text style={appStyles.mainTitle}>{props.title}</Text>
};

export default TextTitle;