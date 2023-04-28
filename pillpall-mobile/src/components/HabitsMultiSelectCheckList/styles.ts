import { StyleSheet } from 'react-native';
import { colors } from '../../constants/palette'

const styles = StyleSheet.create({
    container: {
      marginTop: 10,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingVertical: 5,
      backgroundColor: colors.light_gray,
      borderRadius: 10
    },
    headerText: {
      fontWeight: '600',
    },
    optionsContainer: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      backgroundColor: colors.white,
      borderWidth: 1,
      borderColor: colors.darker_gray,
      borderRadius: 10
    },
    option: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 5,
    },
    selectedOption: {
      backgroundColor: colors.dark_gray,
    },
});

export default styles;