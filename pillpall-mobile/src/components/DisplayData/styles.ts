import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { fonts } from '../../constants/font';
import { colors } from '../../constants/palette';

interface Styles {
    column: ViewStyle;
    title: TextStyle;
    value: TextStyle;
}

const styles = StyleSheet.create<Styles>({
    column: {
      flexDirection: 'column',
      marginBottom: 12,
      color: colors.blue,
    },
    title: {
      fontWeight: '600',
      marginRight: 5,
      color: colors.blue,
    },
    value: {
      flex: 1,
    },
});
  
export default styles;