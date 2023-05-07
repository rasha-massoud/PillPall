import { StyleSheet } from 'react-native';
import { fonts } from './font';

const appStyles = StyleSheet.create({
  mainTitle: {
    ...fonts.bold,
    fontSize: 34,
    letterSpacing: 0.73, 
  },
  pageTitle: {
    ...fonts.bold,
    fontSize: 28,
    letterSpacing: 0, 
  },
  subTitle: {
    ...fonts.medium,
    fontSize: 20,
    letterSpacing: 0.75, 
  },
  subTitle2: {
    ...fonts.regular,
    fontSize: 16,
    letterSpacing: 0.93, 
  },  
  body1: {
    ...fonts.regular,
    fontSize: 16,
    letterSpacing: 1, 
  },
  body2: {
    ...fonts.regular,
    fontSize: 14,
    letterSpacing: 1.78, 
  },
  button: {
    ...fonts.medium,
    fontSize: 14,
    letterSpacing: 1.5, 
  },

});

export default appStyles;