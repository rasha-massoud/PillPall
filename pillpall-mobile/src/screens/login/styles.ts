import { StyleSheet } from 'react-native';
import appStyles from '../../constants/appStyles';
import { ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { colors } from '../../constants/palette'
import { Dimensions } from 'react-native';

interface Styles {
    container: ViewStyle;
    inputContainer: ViewStyle;
    input: TextStyle;
    buttonContainer: ViewStyle;
    forgotPassword: TextStyle;
    forgotPasswordText: TextStyle;
    account: TextStyle;
    signup: TextStyle;
    image: ImageStyle;
}

const { width, height } = Dimensions.get('window');
const LOGIN_PAGE_WIDTH = width * 0.9;

const styles = StyleSheet.create<Styles>({
    container: {
        flex: 1,
        marginTop: '45%',
        width: LOGIN_PAGE_WIDTH,
        marginHorizontal: width * 0.05, 
    },
    inputContainer: {
        height: 35,
        marginVertical: 12,
        width: '100%',
        marginBottom: 35,
    },
    input: {
        borderWidth: 1,
        borderColor: 'lightgrey',
        padding: 10,
        borderRadius: 5,
        fontFamily: appStyles.body2.fontFamily,
        fontSize: appStyles.body2.fontSize,
        color: colors.darker_gray,
        height: 40,
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
        marginBottom: "35%",
    },
    account: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    signup: {
        fontWeight: "bold",
        color: colors.blue,
    },
    image: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 20,
    }
});

export default styles;