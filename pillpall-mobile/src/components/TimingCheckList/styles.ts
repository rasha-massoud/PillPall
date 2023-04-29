import { StyleSheet } from 'react-native';
import appStyles from "../../constants/appStyles";
import { colors } from '../../constants/palette';

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  timingTitle: {
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
  timingTitleText: {
    color: colors.darker_gray,
    ...appStyles.body2,
  },
  timingList: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.dark_gray,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  timingItem: {
    padding: 10,
  },
  selectedTimingItem: {
    backgroundColor: colors.blue,
  },
  timingText: {
    ...appStyles.body2,
  },
  selectedTimingText: {
    color: colors.white,
  },
});

export default styles;
