import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      marginTop: 10,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingVertical: 5,
      backgroundColor: '#F2F2F2',
    },
    headerText: {
      fontWeight: 'bold',
    },
    optionsContainer: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      backgroundColor: '#FFFFFF',
      borderWidth: 1,
      borderColor: '#CCCCCC',
    },
    option: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 5,
    },
    selectedOption: {
      backgroundColor: '#F2F2F2',
    },
});

export default styles;