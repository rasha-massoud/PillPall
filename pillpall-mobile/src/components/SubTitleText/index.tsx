import { Text } from 'react-native';
import React, { FC } from 'react';
import appStyles from '../../constants/appStyles';

interface SubTextTitleProps {
    title: string;
}

const SubTextTitle: FC<SubTextTitleProps> = (props) => {
  return <Text style={appStyles.subTitle2}>{props.title}</Text>
};

export default SubTextTitle;