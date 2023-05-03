import * as Font from 'expo-font';

const loadFonts = async () => {
  await Font.loadAsync({
    'open-sans-italic': require('./assets/fonts/OpenSans-Italic.ttf'),
    'open-sans-regular': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    'open-sans-medium': require('./assets/fonts/OpenSans-Medium.ttf'),
  });
};

export const fonts = {
  regular: 'open-sans-regular',
  medium: 'open-sans-medium',
  bold: 'open-sans-bold',
  italic: 'open-sans-italic',
};

export default loadFonts;
