import { StyleSheet } from 'react-native';
import { fonts } from './constants/font';

const appStyles = StyleSheet.create({
  mainTitle: {
    fontFamily: fonts.medium,
    fontSize: 34,
    letterSpacing: '0.73%', 
  },
  pageTitle: {
    fontFamily: fonts.medium,
    fontSize: 24,
    letterSpacing: '0%', 
  },
  subTitle: {
    fontFamily: fonts.medium,
    fontSize: 20,
    letterSpacing: '0.75%', 
  },
  subTitle2: {
    fontFamily: fonts.regular,
    fontSize: 16,
    letterSpacing: '0.93%', 
  },  
  body1: {
    fontFamily: fonts.regular,
    fontSize: 16,
    letterSpacing: '3.12%', 
  },
  body2: {
    fontFamily: fonts.regular,
    fontSize: 14,
    letterSpacing: '1.78%', 
  },
  button: {
    fontFamily: fonts.medium,
    fontSize: 14,
    letterSpacing: '8.9%', 
  },

});

export default appStyles;