import { Text } from 'react-native';
import React, { FC } from 'react';
import appStyles from '../../constants/appStyles';

interface TextTitleProps {
    context: string;
}

const Body1Text: FC<TextTitleProps> = (props) => {
    return <Text style={{...appStyles.body1, textAlign: 'justify'}}>{props.context}</Text>
};

export default Body1Text;