import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { fonts } from '../../constants/font';

interface Styles {
    column: ViewStyle;
    title: TextStyle;
    value: TextStyle;
}

const styles = StyleSheet.create<Styles>({
    column: {
      flexDirection: 'column',
      marginBottom: 12,
    },
    title: {
      fontWeight: '900',
      marginRight: 5,
      textDecorationLine: 'underline',
    },
    value: {
      flex: 1,
    },
});
  
export default styles;