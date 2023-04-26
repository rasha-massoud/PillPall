import { StyleSheet } from 'react-native';
import appStyles from '../../constants/appStyles';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 20,
    },
    inputContainer: {
        marginVertical: 10,
        width: '100%',
    },
    input: {
        borderWidth: 1,
        borderColor: 'lightgrey',
        padding: 10,
        borderRadius: 5,
        fontSize: 16,
        //   fontFamily: appStyles.regular,
    },
});

export default styles;