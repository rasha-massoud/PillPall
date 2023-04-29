import { StyleSheet } from 'react-native';
import { ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { colors } from '../../constants/palette';

interface Styles {
    container: ViewStyle;
    imagesContainer: ViewStyle;
    imageContainer: ViewStyle;
    image: ImageStyle;
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 60,
      paddingHorizontal: 20,
    },
    imagesContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: 80,
    },
    imageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 30,
      height: 30,
    },
    image: {
      width: 20,
      height: 20,
    },
});
  
export default styles;