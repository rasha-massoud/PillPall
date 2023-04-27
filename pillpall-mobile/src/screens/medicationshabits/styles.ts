import { StyleSheet } from 'react-native';
import { ViewStyle, TextStyle, ImageStyle } from 'react-native';
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
        marginTop: '47%',
        width: LOGIN_PAGE_WIDTH,
        marginHorizontal: width * 0.05, 
    },
    image: {
        justifyContent: 'center',
        marginBottom: 20,
        width: '58%',
        height: '30%',
    },
});

export default styles;