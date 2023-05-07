import { StyleSheet } from 'react-native';
import { ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { Dimensions } from 'react-native';
import { colors } from '../../constants/palette';

const { width, height } = Dimensions.get('window');
const LOGIN_PAGE_WIDTH = width * 0.9;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: '20%',
        width: LOGIN_PAGE_WIDTH,
        marginHorizontal: width * 0.05, 
    },
    container1: {
        marginTop: 7,
        alignItems: 'center',
        justifyContent: 'center',
        height: 120,
        width: '36%',
        marginLeft: '32%',
        borderRadius: 75,
        backgroundColor: colors.light_gray,
        overflow: 'hidden',
    },
    image: {
        height: 120,
        width: 120,
        borderRadius: 60,
        margin: 40,
    },
    addImage: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 80,
        width: '100%',
        opacity: 0.8,
        borderRadius: 75,
    },
    addImageText: {
        color: colors.dark_gray,
        fontSize: 18,
        marginTop: 10,
    },
    changeImage: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: colors.darker_gray,
        opacity: 0.8,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 75,
        borderBottomRightRadius: 75,
    },
    changeImageText: {
        color: '#fff',
        fontSize: 14,
        marginLeft: 5,
    },
});

export default styles;