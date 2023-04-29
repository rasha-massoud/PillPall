import React, { FC } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native';
import PageTitle from '../PageTitle';

import styles from './styles';

interface NavBarProps {
    title: string;
}

const NavBar: FC<NavBarProps> = (props) => {

  return (
    <View style={styles.container}>
      <PageTitle title={props.title} />
    </View>
  );
};

export default NavBar;