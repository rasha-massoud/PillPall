import { StyleSheet } from 'react-native';
import { ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { Dimensions } from 'react-native';
import appStyles from '../../constants/appStyles';
import { colors } from '../../constants/palette';
import { color } from 'react-native-reanimated';
import { fonts } from '../../constants/font';

interface Styles {
    container: ViewStyle;
    image: ImageStyle;
    card: ViewStyle;
    img: ImageStyle;
    data: TextStyle;
    buttons: ViewStyle;
    btnText: TextStyle;
    details: TextStyle;
}

const { width, height } = Dimensions.get('window');
const LOGIN_PAGE_WIDTH = width * 0.9;

const styles = StyleSheet.create<Styles>({
    container: {
        flex: 1,
        width: LOGIN_PAGE_WIDTH,
        marginHorizontal: width * 0.05, 
    },
    image: {
        marginTop: 5,
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 20,
        width: '100%',
        height: '25%',
        borderRadius: 10,
    },
    card: {
        flexDirection: 'row',
        marginTop: 20,
    },
    img: {
        width: 120,
        height: 120,
        borderRadius: 100,
        marginRight: 12,
    },
    data: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        ...appStyles.body1,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
        gap: 42,
    },
    btnText: {
        color: colors.blue,
        textDecorationLine: 'underline',
        ...appStyles.button,
        fontWeight: '600',
    },
    details: {
        ...appStyles.body2,
        marginBottom: 10,
    }
});

export default styles;