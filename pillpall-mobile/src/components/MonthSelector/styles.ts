import { StyleSheet } from 'react-native';
import appStyles from "../../constants/appStyles";
import { colors } from '../../constants/palette';

const styles = StyleSheet.create({
  monthsTitle: {
    ...appStyles.body1,
    marginTop: 10,
    marginBottom: 20,
  },
  monthItem: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 0.5,
    borderColor: colors.black,
  },
  selectedMonthItem: {
    backgroundColor: colors.blue,
  },
  monthText: {
    ...appStyles.body2,
  },
  selectedMonthText: {
    color: colors.white,
  },
});

export default styles;