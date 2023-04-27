import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import appStyles from '../../constants/appStyles';

interface Styles {
    container: ViewStyle;
    title: TextStyle;
    checkboxes: ViewStyle;
    checkboxContainer: ViewStyle;
    circle: ViewStyle;
    checkboxLabel: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  title: {
    marginBottom: 10,
  },
  checkboxes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 30,
  },
  checkboxContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  circle: {
    height: 30,
    width: 30,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxLabel: {
    ...appStyles.body2,
    marginLeft: 5,
  },
});
  
export default styles;