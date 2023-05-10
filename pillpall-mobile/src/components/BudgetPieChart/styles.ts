import { StyleSheet } from 'react-native';
import { colors } from '../../constants/palette';
import appStyles from '../../constants/appStyles';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    textTitle: {
        ...appStyles.body1,
        fontWeight: '600',
    }
});

export default styles;