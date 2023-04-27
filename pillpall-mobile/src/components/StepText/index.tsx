import { Text } from 'react-native';
import React, { FC } from 'react';
import appStyles from '../../constants/appStyles';
import { colors } from '../../constants/palette';

interface StepTextProps {
    title: string;
    color?: string;
}

const StepText: FC<StepTextProps> = (props) => {
    return <Text style={[appStyles.subTitle2, {color: colors.blue, marginBottom: 20}]}>{props.title}</Text>
};

export default StepText;