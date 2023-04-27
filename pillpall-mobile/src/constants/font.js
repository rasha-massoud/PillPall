import { useFonts, Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';
import * as Font from 'expo-font';

export const fonts = {
  regular: 'Roboto_400Regular',
  medium: {
    fontFamily: 'Roboto_400Regular',
    fontWeight: '600',  
  },
  bold: {
    fontFamily: 'Roboto_400Regular',
    fontWeight: 800,
  },
};

export const loadFonts = async () => {
  await Font.loadAsync({
    Roboto_400Regular,
    Roboto_500Medium,
  });
};

export default {
    fonts,
    loadFonts
}