import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

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
      fontWeight: 'bold',
      marginRight: 5,
    },
    value: {
      flex: 1,
    },
});
  
export default styles;