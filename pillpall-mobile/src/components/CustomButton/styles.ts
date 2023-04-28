import { StyleSheet } from 'react-native';
import { fonts } from '../../constants/font';
import { colors } from '../../constants/palette';
import appStyles from '../../constants/appStyles';

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    width: '32%',
    height: '6%',
  },
  buttonText: {
    color: colors.white,
    ...appStyles.button,   
    textTransform: 'uppercase',
  },
});

export default styles;