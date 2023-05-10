import { Text } from 'react-native';
import React, { FC } from 'react';

import styles from './styles';

interface TextTitleProps {
    context: string;
}

const Body1Text: FC<TextTitleProps> = (props) => {
    return <Text style={styles.text}>{props.context}</Text>
};

export default Body1Text;