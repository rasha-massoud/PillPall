import { useFonts, Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';

export const fonts = {
  regular: 'Roboto_400Regular',
  medium: 'Roboto_500Medium',
  bold: {
    fontFamily: 'Roboto_500Medium',
    fontWeight: 'bold',
  },
};

export const loadFonts = async () => {
  await useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
  });
};

export default {
    fonts,
    loadFonts
}