import { StyleSheet } from 'react-native';
import appStyles from '../../constants/appStyles';
import { ViewStyle, TextStyle } from 'react-native';

import { Dimensions } from 'react-native';

interface Styles {
    inputContainer: ViewStyle;
    input: TextStyle;
}

const { width, height } = Dimensions.get('window');
const LOGIN_PAGE_HEIGHT = height * 0.8;
const LOGIN_PAGE_WIDTH = width * 0.9;

const styles = StyleSheet.create<Styles>({
    container: {
        flex: 1,
        gap: '8%',
        alignItems: 'flex-start',
        justifyContent: 'center',
        height: LOGIN_PAGE_HEIGHT,
        width: LOGIN_PAGE_WIDTH,
        marginHorizontal: width * 0.05, 
    },
    inputContainer: {
        gap: '2%',
        marginVertical: 10,
        width: '100%',
    },
    input: {
        borderWidth: 1,
        borderColor: 'lightgrey',
        padding: 10,
        borderRadius: 5,
        fontFamily: appStyles.body2.fontFamily,
        fontSize: appStyles.body2.fontSize,
    },
});

export default styles;