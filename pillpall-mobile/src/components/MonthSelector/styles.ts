import { StyleSheet } from 'react-native';
import appStyles from "../../constants/appStyles";
import { colors } from '../../constants/palette';

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  monthTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
    height: 43,
    borderColor: colors.dark_gray,
  },
  monthTitleText: {
    color: colors.darker_gray,
    ...appStyles.body2,
  },
  monthList: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.dark_gray,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  monthItem: {
    padding: 10,
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
