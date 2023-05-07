import { StyleSheet } from 'react-native';
import { ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { Dimensions } from 'react-native';
import appStyles from '../../constants/appStyles';

interface Styles {
    container: ViewStyle;
    image: ImageStyle;
    card: ViewStyle;
    img: ImageStyle;
    data: TextStyle;
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
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        ...appStyles.body1,
    },
});

export default styles;