
import { StyleSheet } from 'react-native';
import appStyles from '../../constants/appStyles';
import { colors } from '../../constants/palette';

const styles = StyleSheet.create({
  daysTitle: {
    marginTop: 20,
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
  daysTitleText: {
    ...appStyles.body1,
  },
  dayList: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.dark_gray,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  dayItem: {
    padding: 10,
  },
  selectedDayItem: {
    backgroundColor: colors.blue,
  },
  dayText: {
    ...appStyles.body2,
  },
  selectedDayText: {
    color: colors.white,
  },
});

export default styles;
