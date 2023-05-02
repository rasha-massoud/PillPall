import { StyleSheet } from 'react-native';
import appStyles from '../../constants/appStyles';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    medicationName: {
        flex: 1,
        fontWeight: 'bold',
        ...appStyles.body1,
    },
    dosage: {
        fontWeight: 'bold',
        ...appStyles.body2,
    },
    timing: {
        ...appStyles.body2,
    },
});

export default styles