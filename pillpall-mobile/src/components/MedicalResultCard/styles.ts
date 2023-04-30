import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      borderRadius: 10,
      marginHorizontal: 20,
      marginVertical: 10,
      overflow: 'hidden',
    },
    header: {
      height: 200,
      backgroundColor: '#ccc',
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerImage: {
      height: 150,
      width: '100%',
      resizeMode: 'contain',
    },
    headerText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 10,
    },
    body: {
      padding: 10,
    },
    details: {
      marginBottom: 10,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 5,
    },
    label: {
      fontWeight: 'bold',
      marginRight: 10,
    },
    text: {
      flex: 1,
    },
    result: {
      alignItems: 'center',
      marginTop: 10,
    },
    image: {
      height: 300,
      width: '100%',
      resizeMode: 'contain',
    },
});

export default styles;