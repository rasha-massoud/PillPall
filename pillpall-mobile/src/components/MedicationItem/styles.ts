import { StyleSheet } from 'react-native';
import appStyles from '../../constants/appStyles';
import { colors } from '../../constants/palette';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.darker_gray,
        marginBottom: 5,
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