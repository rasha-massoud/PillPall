import { StyleSheet } from 'react-native';
import { TextStyle } from 'react-native';
import { colors } from '../../constants/palette'

interface Styles {
    account: TextStyle;
    signup: TextStyle;
}

const styles = StyleSheet.create<Styles>({
    account: {
      alignSelf: 'center',
    },
    signup: {
      fontWeight: '800',
      color: colors.blue,
    },
});
  
export default styles;