import { StyleSheet } from 'react-native';
import { ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { Dimensions } from 'react-native';

interface Styles {
    container: ViewStyle;
    image: ImageStyle;
    top: ViewStyle;
    topLeft: TextStyle;
    topRight: ImageStyle;
}

const { width, height } = Dimensions.get('window');
const LOGIN_PAGE_WIDTH = width * 0.9;

const styles = StyleSheet.create<Styles>({
    container: {
        flex: 1,
        marginTop: '5%',
        width: LOGIN_PAGE_WIDTH,
        marginHorizontal: width * 0.05, 
    },
    top: {
        height: 80,
        flexDirection: 'row',
    },
    topLeft: {
        flex:0.76,
    },
    topRight: {
        marginLeft: 150,
        flex:0.24,
    },
    image: {
        justifyContent: 'center',
        width: '100%',
        height: '50%',
    },
});

export default styles;