import { StyleSheet } from 'react-native';
import { ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { Dimensions } from 'react-native';
import { colors } from '../../constants/palette'
import appStyles from '../../constants/appStyles';

interface Styles {
    container: ViewStyle;
    image: ImageStyle;
    top: ViewStyle;
    topLeft: TextStyle;
    topRight: ImageStyle;
    emptyText: TextStyle;
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
        justifyContent:'center',
        alignItems: 'center',
    },
    topLeft: {
        flex:0.7,
    },
    topRight: {
        marginLeft: 150,
        flex:0.3,
    },
    image: {
        justifyContent: 'center',
        width: '120%',
        height: '70%',
    },
    emptyText: {
        flex: 1,
        alignItems:'center',
        justifyContent: 'center',
    }
});

export default styles;