import { StyleSheet } from 'react-native';
import { ViewStyle, TextStyle, ImageStyle } from 'react-native';

interface Styles {
    container: ViewStyle;
    images: ViewStyle;
    image: ImageStyle;
}

const styles = StyleSheet.create<Styles>({
    container: {
        height: '50%',
        flex: 0.75,
        flexDirection: 'row',
    },
    images: {
        flex: 0.25,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    image: {
        justifyContent: 'center',
        marginBottom: 20,
        width: '30%',
        height: '30%',
    },
});

export default styles;