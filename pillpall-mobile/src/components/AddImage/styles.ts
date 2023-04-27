import { StyleSheet } from 'react-native';
import { colors } from '../../constants/palette';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 130,
        width: 130,
        borderRadius: 75,
        backgroundColor: colors.light_gray,
        overflow: 'hidden',
    },
    image: {
        height: '100%',
        width: '100%',
    },
    editIconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: colors.darker_gray,
        opacity: 0.8,
    },
});

export default styles;