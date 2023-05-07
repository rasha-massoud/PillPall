import { StyleSheet } from 'react-native';
import appStyles from '../../constants/appStyles';
import { colors } from '../../constants/palette';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.darker_gray,
        marginBottom: 5,
    },
    dosage: {
        flex:0.25,
        ...appStyles.body2,
    },
    timing: {
        flex:0.25,
        ...appStyles.body2,
        color: colors.blue,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    name: {
        flex:0.25,
        ...appStyles.body1,
        fontWeight: 'bold',
    },
    IMG: {
        flex: 0.31,
    }
});

export default styles