import { Text } from 'react-native';
import React, { FC } from 'react';
import appStyles from '../../constants/appStyles';

interface SubTitleTextProps {
    title: string;
    color?: string;
}

const SubTitleText: FC<SubTitleTextProps> = (props) => {
  return <Text style={[appStyles.subTitle2, {color: props.color|| 'black'}]}>{props.title}</Text>
};

export default SubTitleText;