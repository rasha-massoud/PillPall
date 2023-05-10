import { StyleSheet } from 'react-native';
import { ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { Dimensions } from 'react-native';
import appStyles from '../../constants/appStyles';

interface Styles {
    container: ViewStyle;
    image: ImageStyle;
    noExpensesText: TextStyle;
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
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 15,
        marginBottom: 20,
        width: '100%',
        height: '30%',
    },
    noExpensesText: {
        ...appStyles.body1,
        

    }
});

export default styles;