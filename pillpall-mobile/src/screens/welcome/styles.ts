import { StyleSheet } from 'react-native';
import appStyles from '../../constants/appStyles';
import { ViewStyle, ImageStyle } from 'react-native';
import { Dimensions } from 'react-native';

interface Styles {
    container: ViewStyle;
    image: ImageStyle;
}

const { width, height } = Dimensions.get('window');
const LOGIN_PAGE_WIDTH = width * 0.9;

const styles = StyleSheet.create<Styles>({
    container: {
        flex: 1,
        marginTop: '35%',
        width: LOGIN_PAGE_WIDTH,
        marginHorizontal: width * 0.05, 
    },
    image: {
        marginTop:20,
        justifyContent: 'center',
        marginBottom: 22,
        width: '65%',
        height: '35%',
    },
});

export default styles;