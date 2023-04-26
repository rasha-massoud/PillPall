import { StyleSheet } from 'react-native';
import appStyles from '../../constants/appStyles';
import { ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { colors } from '../../constants/palette'
import { Dimensions } from 'react-native';

interface Styles {
    container: ViewStyle;
}

const { width, height } = Dimensions.get('window');
const LOGIN_PAGE_WIDTH = width * 0.9;

const styles = StyleSheet.create<Styles>({
    container: {
        flex: 1,
        marginTop: '50%',
        width: LOGIN_PAGE_WIDTH,
        marginHorizontal: width * 0.05, 
    },
});

export default styles;