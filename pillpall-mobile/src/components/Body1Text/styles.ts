import { StyleSheet } from 'react-native';
import appStyles from '../../constants/appStyles';

const styles = StyleSheet.create({
    text: {
        ...appStyles.body1, 
        textAlign: 'justify',
        marginBottom: 8,
    },
});

export default styles;
