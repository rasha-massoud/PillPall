import { StyleSheet } from 'react-native';
import { ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { Dimensions } from 'react-native';
import { colors } from '../../constants/palette'
import appStyles from '../../constants/appStyles';

interface Styles {
    container: ViewStyle;
    image: ImageStyle;
    editText: TextStyle;
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
        marginTop: 15,
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 20,
        width: '100%',
        height: '25%',
        borderRadius: 10,
    },
    editText: {
        alignContent:'center',
        justifyContent: 'center',
        alignSelf: 'center',
        color: colors.blue,
        ...appStyles.body1,
        textDecorationLine: 'underline',
    },
});

export default styles;