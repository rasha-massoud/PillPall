import { StyleSheet } from 'react-native';
import { ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { Dimensions } from 'react-native';
import { colors } from '../../constants/palette';

const { width, height } = Dimensions.get('window');
const LOGIN_PAGE_WIDTH = width * 0.9;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: '20%',
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