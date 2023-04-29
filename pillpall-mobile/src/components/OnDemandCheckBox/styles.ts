import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import appStyles from '../../constants/appStyles';
import { colors } from '../../constants/palette';

interface Styles {
    container: ViewStyle;
    title: TextStyle;
    checkboxes: ViewStyle;
    checkboxContainer: ViewStyle;
    circle: ViewStyle;
    checkboxLabel: TextStyle;
    checkedCircle: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    alignItems: 'flex-start',
    marginBottom: 20,
    marginTop: 10,
  },
  title: {
    marginBottom: 10,
  },
  checkboxes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 62,
  },
  checkboxContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  circle: {
    height: 15,
    width: 15,
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
  checkedCircle: {
    backgroundColor: colors.darker_gray,
  },
});
  
export default styles;