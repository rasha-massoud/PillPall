import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 150,
        width: 150,
        borderRadius: 75,
        backgroundColor: '#ddd',
        overflow: 'hidden',
    },
    image: {
        height: '100%',
        width: '100%',
    },
    editIconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: '#888',
        opacity: 0.8,
    },
});

export default styles;