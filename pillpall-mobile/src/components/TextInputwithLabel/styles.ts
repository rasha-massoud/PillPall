import { StyleSheet } from 'react-native';
import appStyles from '../../constants/appStyles';
import { ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { colors } from '../../constants/palette'

interface Styles {
    inputContainer: ViewStyle;
    input: TextStyle;
    buttonContainer: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
    inputContainer: {
        height: 35,
        marginVertical: 12,
        width: '100%',
        marginBottom: 35,
    },
    input: {
        borderWidth: 1,
        borderColor: 'lightgrey',
        padding: 10,
        borderRadius: 5,
        fontFamily: appStyles.body2.fontFamily,
        fontSize: appStyles.body2.fontSize,
        color: colors.darker_gray,
        height: 40,
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default styles;