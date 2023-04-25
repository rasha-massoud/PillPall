import { StyleSheet } from 'react-native';
import { fonts } from '../../constants/font';
import { colors } from '../../constants/palette';

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
    fontFamily: fonts.bold.fontFamily,
    fontWeight: '500',    
    fontSize: 14,
    textTransform: 'uppercase',
  },
});

export default styles;