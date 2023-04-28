import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { fonts } from '../../constants/font';

interface Styles {
    column: ViewStyle;
    title: TextStyle;
    value: TextStyle;
}

const styles = StyleSheet.create<Styles>({
    column: {
      flexDirection: 'row',
      marginBottom: 10,
    },
    title: {
      fontWeight: '600',
      marginRight: 5,
    },
    value: {
      flex: 1,
    },
});
  
export default styles;