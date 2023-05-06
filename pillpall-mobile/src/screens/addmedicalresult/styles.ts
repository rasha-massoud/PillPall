import { StyleSheet } from 'react-native';
import { ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { Dimensions } from 'react-native';
import { colors } from '../../constants/palette';
import appStyles from '../../constants/appStyles';
import { black } from 'react-native-paper/lib/typescript/src/styles/themes/v2/colors';

interface Styles {
    container: ViewStyle;
    selectedFileContainer: ViewStyle;
    selectedFileName: TextStyle;
    statusMessage: TextStyle;
    image: ImageStyle;
    btn: TextStyle;
}

const { width, height } = Dimensions.get('window');
const LOGIN_PAGE_WIDTH = width * 0.9;

const styles = StyleSheet.create<Styles>({
    container: {
        flex: 1,
        width: LOGIN_PAGE_WIDTH,
        marginHorizontal: width * 0.05, 
    },
    selectedFileContainer: {
        marginVertical: 16,
    },
    selectedFileName: {
        fontSize: 16,
        marginBottom: 8,
    },
    statusMessage: {
        fontSize: 16,
        marginTop: 16,
        textAlign: 'center',
    },
    image: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        height: '35%',
        width: '60%',
    },
    btn: {
        alignSelf: 'center', 
        width: '60%', 
        backgroundColor: colors.dark_gray,
        borderRadius: 100,
        shadowColor: colors.darker_gray,
        shadowRadius: 50,
        marginBottom: 30,
    }
});

export default styles;