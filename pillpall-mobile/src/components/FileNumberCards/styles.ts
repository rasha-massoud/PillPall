import { StyleSheet } from 'react-native';
import { colors } from '../../constants/palette';
import appStyles from '../../constants/appStyles';

const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.white,
      borderRadius: 16,
      elevation: 3,
      margin: 16,
      marginBottom: 10,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    doctorName: {
      paddingLeft: 5,
      ...appStyles.subTitle,
      fontSize: 18,
      fontWeight: 'bold',
    },
    location: {
      ...appStyles.body1,
      fontSize: 16,
      color: '#666',
    },
    fileNumberContainer: {
      backgroundColor: '#f0f0f0',
      borderRadius: 8,
      padding: 16,
    },
    fileNumber: {
      ...appStyles.subTitle,
      fontSize: 24,
    },
});

export default styles;