import { StyleSheet } from 'react-native';
import appStyles from '../../constants/appStyles';
import { ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { Dimensions } from 'react-native';

interface Styles {
    container: ViewStyle;
    image: ImageStyle;
    logout: TextStyle,
}

const { width, height } = Dimensions.get('window');
const LOGIN_PAGE_WIDTH = width * 0.9;

const styles = StyleSheet.create<Styles>({
    container: {
        flex: 1,
        marginTop: '15%',
        width: LOGIN_PAGE_WIDTH,
        marginHorizontal: width * 0.05, 
    },
    image: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 30,
        height: '30%',
        width: '85%',
    },
    logout: {
        ...appStyles.subTitle,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
        marginBottom: 20,
        textDecorationLine: 'underline',
    }
});

export default styles;