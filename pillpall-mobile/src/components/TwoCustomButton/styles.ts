import { StyleSheet } from 'react-native';
import { fonts } from '../../constants/font';
import { colors } from '../../constants/palette';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 25,

    },
    buttonContainerFirst: {
        backgroundColor: colors.blue,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        width: '37%',
        height: '33%',
    },
    buttonTextFirst: {
        color: colors.white,
        fontFamily: fonts.bold.fontFamily,
        fontWeight: '600',     
        fontSize: 14,
        textTransform: 'uppercase',
    },
    buttonContainerSecond: {
        backgroundColor: colors.black,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        width: '37%',
        height: '33%',
    },
    buttonTextSecond: {
        color: colors.white,
        fontFamily: fonts.bold.fontFamily,
        fontWeight: '600',    
        fontSize: 14,
        textTransform: 'uppercase',
    },
});

export default styles;