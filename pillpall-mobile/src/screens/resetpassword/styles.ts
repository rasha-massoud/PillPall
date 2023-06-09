import { StyleSheet } from 'react-native';
import { ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { colors } from '../../constants/palette'
import { Dimensions } from 'react-native';

interface Styles {
    container: ViewStyle;
    buttonContainer: ViewStyle;
    forgotPassword: TextStyle;
    forgotPasswordText: TextStyle;
    image: ImageStyle;
}

const { width, height } = Dimensions.get('window');
const LOGIN_PAGE_WIDTH = width * 0.9;

const styles = StyleSheet.create<Styles>({
    container: {
        flex: 1,
        marginTop: '23%',
        width: LOGIN_PAGE_WIDTH,
        marginHorizontal: width * 0.05, 
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    forgotPassword: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    forgotPasswordText: {
        color: colors.blue,
        marginBottom: '33%',
    },
    image: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        height: '30%',
        width: '75%',
    }
});

export default styles;