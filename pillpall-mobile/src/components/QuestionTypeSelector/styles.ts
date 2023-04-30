import { StyleSheet } from 'react-native';
import appStyles from '../../constants/appStyles';
import { colors } from '../../constants/palette';

const styles = StyleSheet.create({
  container: {
    marginTop: 9,
  },
  questionTypesTitle: {
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
  questionTypesTitleText: {
    color: colors.darker_gray,
    ...appStyles.body2,
  },
  questionTypeList: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.dark_gray,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  questionTypeItem: {
    padding: 10,
  },
  selectedQuestionTypeItem: {
    backgroundColor: colors.blue,
  },
  questionTypeText: {
    ...appStyles.body2,
  },
  selectedQuestionTypeText: {
    color: colors.white,
  },
});

export default styles;

