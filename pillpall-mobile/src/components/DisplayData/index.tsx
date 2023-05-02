import React, { FC } from 'react';
import { Text, View } from 'react-native';
import appStyles from '../../constants/appStyles';

import styles from './styles';

interface DisplayDataProps {
    title: string;
    value: string;
}

const DisplayData: FC<DisplayDataProps> = (props) => {
    return (
        <View style={styles.column}>
          <Text style={[styles.title, appStyles.body1]}>{props.title}:</Text>
          <Text style={[styles.value, appStyles.body2]}>{props.value}</Text>
        </View>
    );
}

export default DisplayData;