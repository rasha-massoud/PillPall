import { StyleSheet } from 'react-native';
import appStyles from '../../constants/appStyles';
import { colors } from '../../constants/palette';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.dark_gray,
        marginBottom: 5,
    },
    dosage: {
        flex:0.2,
        ...appStyles.body2,
    },
    timing: {
        flex:0.35,
        ...appStyles.body2,
        color: colors.blue,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 10,
    },
    name: {
        flex:0.70,
        ...appStyles.body1,
        fontWeight: 'bold',
    },
    IMG: {
        flex: 0.31,
    }
});

export default styles