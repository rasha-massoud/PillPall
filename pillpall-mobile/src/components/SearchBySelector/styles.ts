import { StyleSheet } from 'react-native';
import appStyles from '../../constants/appStyles';
import { colors } from '../../constants/palette';

const styles = StyleSheet.create({
  container: {
    marginTop: 9,
  },
  searchByTitle: {
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
  searchByTitleText: {
    color: colors.darker_gray,
    ...appStyles.body2,
  },
  searchByList: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.dark_gray,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  searchByItem: {
    padding: 10,
  },
  selectedSearchByItem: {
    backgroundColor: colors.blue,
  },
  searchByText: {
    ...appStyles.body2,
  },
  selectedSearchByText: {
    color: colors.white,
  },
});

export default styles;
